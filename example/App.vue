<template>
  <nav class="nav" :class="{ 'nav--scrolled': scrolled }">
    <div class="nav-inner">
      <a class="nav-brand" href="#top">
        <img :src="logoUrl" alt="vue-easy-gantt logo">
        vue-easy-gantt
      </a>
      <ul class="nav-links">
        <li><a href="#features">Features</a></li>
        <li><a href="#demo">Live Demo</a></li>
        <li><a href="#api">API</a></li>
        <li class="nav-cta-item">
          <a class="nav-cta" href="https://github.com/aispin/vue-easy-gantt" target="_blank" rel="noopener">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.32-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.09 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.13-.29-.52-1.46.1-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5z"/></svg>
            GitHub
          </a>
        </li>
      </ul>
    </div>
  </nav>

  <!-- ============ hero ============ -->
  <header id="top" class="hero">
    <hero-scene />
    <hero-art />
    <div class="wrap hero-content">
      <div class="hero-badge">
        <span class="dot" />
        v2.0.0 · Vue 3 + TypeScript + Vite
      </div>
      <h1 class="hero-title">
        Your whole week,<br>
        <span class="gradient-text">at a glance.</span>
      </h1>
      <p class="hero-sub">
        A modern <strong>Vue 3 gantt chart component</strong> for weekly tasks.
        TypeScript-native, themeable with CSS variables, SSR-safe — and impossibly light.
      </p>
      <div class="hero-actions">
        <a class="btn btn--primary" href="#demo">
          Live demo
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <a class="btn btn--ghost" href="https://github.com/aispin/vue-easy-gantt" target="_blank" rel="noopener">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5A11.5 11.5 0 0 0 .5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.55v-2.1c-3.2.7-3.88-1.4-3.88-1.4-.53-1.32-1.28-1.68-1.28-1.68-1.05-.71.08-.7.08-.7 1.16.09 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.2-3.1-.13-.29-.52-1.46.1-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.75.81 1.2 1.84 1.2 3.1 0 4.43-2.69 5.4-5.25 5.69.41.36.78 1.05.78 2.12v3.14c0 .3.2.66.8.55A11.5 11.5 0 0 0 23.5 12A11.5 11.5 0 0 0 12 .5z"/></svg>
          View on GitHub
        </a>
      </div>
      <div class="hero-install">
        <span class="prompt">$</span>
        <code>npm install vue-easy-gantt</code>
        <button class="copy-btn" title="Copy install command" @click="copyInstall">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
    </div>
    <div class="hero-scroll">
      <span>scroll</span>
      <span class="line" />
    </div>
  </header>

  <main>
    <!-- ============ features ============ -->
    <section id="features">
      <div class="wrap">
        <span class="section-tag reveal">Why vue-easy-gantt</span>
        <h2 class="section-title reveal">Everything you need.<br><span class="gradient-text">Nothing you don't.</span></h2>
        <p class="section-desc reveal">
          A complete rewrite for the modern Vue ecosystem — smaller, faster, typed, and built to be themed.
        </p>
        <feature-grid />
      </div>
    </section>

    <!-- ============ live demo ============ -->
    <section id="demo">
      <div class="wrap">
        <span class="section-tag reveal">Live demo</span>
        <h2 class="section-title reveal">Play with the real thing</h2>
        <p class="section-desc reveal">
          This is the actual component running on this page — toggle themes, simulate loading, shuffle colors, click tasks.
        </p>
        <live-demo />
      </div>
    </section>

    <!-- ============ api ============ -->
    <section id="api">
      <div class="wrap">
        <span class="section-tag reveal">API</span>
        <h2 class="section-title reveal">Small surface, full control</h2>
        <p class="section-desc reveal">
          Eight props, one event, one slot — plus TypeScript types for everything.
        </p>
        <api-docs />
        <div style="height: 20px" />
        <usage-section />
      </div>
    </section>
  </main>

  <site-footer />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import HeroScene from './components/HeroScene.vue'
import HeroArt from './components/HeroArt.vue'
import FeatureGrid from './components/FeatureGrid.vue'
import LiveDemo from './components/LiveDemo.vue'
import ApiDocs from './components/ApiDocs.vue'
import UsageSection from './components/UsageSection.vue'
import SiteFooter from './components/SiteFooter.vue'

const scrolled = ref(false)

const logoUrl = import.meta.env.BASE_URL + 'logo.svg'

const onScroll = () => {
  scrolled.value = window.scrollY > 24
}

let io: IntersectionObserver | null = null

onMounted(() => {
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()

  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          io?.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  )
  document.querySelectorAll('.reveal').forEach((el) => io!.observe(el))
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  io?.disconnect()
})

const copyInstall = async () => {
  try {
    await navigator.clipboard.writeText('npm install vue-easy-gantt')
  } catch {
    // clipboard unavailable — ignore
  }
}
</script>
