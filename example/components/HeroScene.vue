<template>
  <div ref="containerRef" class="hero-canvas" aria-hidden="true">
    <div v-if="failed" class="hero-fallback" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as THREE from 'three'

const containerRef = ref<HTMLDivElement>()
const failed = ref(false)

/* ---------------- aurora background shader (GLSL) ---------------- */

const AURORA_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const AURORA_FRAG = /* glsl */ `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float fbm(vec2 p) {
    float v = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p *= 2.03;
      a *= 0.5;
    }
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / max(uResolution.y, 1.0);
    vec2 p = uv * vec2(aspect, 1.0) * 1.7;
    float t = uTime * 0.05;

    // domain-warped fbm -> flowing aurora ribbons
    vec2 q = vec2(fbm(p + t), fbm(p + vec2(5.2, 1.3) - t));
    vec2 r = vec2(
      fbm(p + 3.5 * q + vec2(1.7, 9.2) + 0.14 * t),
      fbm(p + 3.5 * q + vec2(8.3, 2.8) - 0.11 * t)
    );
    float f = fbm(p + 3.5 * r);

    // soft glow that follows the pointer
    float m = length((uv - uMouse) * vec2(aspect, 1.0));
    f += 0.10 * exp(-m * 2.6) * (0.5 + 0.5 * sin(uTime * 0.6));

    vec3 base = mix(vec3(0.016, 0.027, 0.063), vec3(0.047, 0.067, 0.15), f);
    vec3 cyan = vec3(0.13, 0.83, 0.93);
    vec3 violet = vec3(0.65, 0.55, 0.98);
    vec3 col = base;
    col = mix(col, cyan, smoothstep(0.32, 0.72, f) * 0.5);
    col = mix(col, violet, smoothstep(0.42, 0.95, length(r)) * 0.42);

    // vignette
    col *= 1.0 - 0.5 * length(uv - 0.5);
    gl_FragColor = vec4(col, 1.0);
  }
`

let renderer: THREE.WebGLRenderer | null = null
let frame = 0
let running = false
let visible = true

onMounted(() => {
  const container = containerRef.value
  if (!container) return

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance' })
  } catch {
    failed.value = true
    return
  }

  const w = container.clientWidth || window.innerWidth
  const h = container.clientHeight || window.innerHeight
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(w, h)
  renderer.setClearColor(0x050816, 1)
  container.appendChild(renderer.domElement)

  const scene = new THREE.Scene()
  const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(w, h) },
    uMouse: { value: new THREE.Vector2(0.5, 0.5) }
  }
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(2, 2),
    new THREE.ShaderMaterial({
      vertexShader: AURORA_VERT,
      fragmentShader: AURORA_FRAG,
      uniforms,
      depthTest: false,
      depthWrite: false
    })
  )
  mesh.frustumCulled = false
  scene.add(mesh)

  const onPointerMove = (e: PointerEvent) => {
    uniforms.uMouse.value.set(
      e.clientX / window.innerWidth,
      1 - e.clientY / window.innerHeight
    )
  }
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  const clock = new THREE.Clock()

  const renderFrame = (t: number) => {
    uniforms.uTime.value = t
    renderer!.render(scene, camera)
  }

  const loop = () => {
    if (!running) return
    frame = requestAnimationFrame(loop)
    renderFrame(clock.getElapsedTime())
  }

  const start = () => {
    if (running || reduceMotion) return
    running = true
    frame = requestAnimationFrame(loop)
  }
  const stop = () => {
    running = false
    cancelAnimationFrame(frame)
  }

  if (reduceMotion) {
    renderFrame(2.4) // single static frame
  } else {
    start()
  }

  /* ---- lifecycle: pause when hidden / off-screen, handle resize ---- */
  const onVisibility = () => (document.hidden ? stop() : (visible && start()))
  document.addEventListener('visibilitychange', onVisibility)

  const io = new IntersectionObserver(
    ([entry]) => {
      visible = entry.isIntersecting
      if (visible) {
        start()
      } else {
        stop()
      }
    },
    { threshold: 0.02 }
  )
  io.observe(container)

  const ro = new ResizeObserver(() => {
    if (!renderer) return
    const cw = container.clientWidth
    const ch = container.clientHeight
    if (!cw || !ch) return
    renderer.setSize(cw, ch)
    uniforms.uResolution.value.set(cw, ch)
    if (reduceMotion) renderFrame(2.4)
  })
  ro.observe(container)

  onBeforeUnmount(() => {
    stop()
    document.removeEventListener('visibilitychange', onVisibility)
    window.removeEventListener('pointermove', onPointerMove)
    io.disconnect()
    ro.disconnect()
    mesh.geometry.dispose()
    ;(mesh.material as THREE.ShaderMaterial).dispose()
    renderer?.dispose()
    if (renderer?.domElement.parentNode === container) {
      container.removeChild(renderer.domElement)
    }
    renderer = null
  })
})
</script>
