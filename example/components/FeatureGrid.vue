<template>
  <div class="features-grid">
    <div
      v-for="(f, i) in features"
      :key="f.title"
      class="feature-card reveal"
      :class="'reveal-delay-' + (i % 3)"
      @mousemove="onCardMove"
    >
      <!-- eslint-disable-next-line vue/no-v-html -- icons are static, trusted local strings -->
      <span class="feature-icon" v-html="f.icon" />
      <h3>{{ f.title }}</h3>
      <p>{{ f.desc }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const icons = {
  cube: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/></svg>',
  feather: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><path d="M16 8 2 22M17.5 15H9"/></svg>',
  palette: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>',
  cursor: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m4 4 7.07 17 2.51-7.39L21 11.07z"/></svg>',
  server: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="8" rx="2"/><rect x="2" y="13" width="20" height="8" rx="2"/><path d="M6 7h.01M6 17h.01"/></svg>',
  layers: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="m12 2 9 4.9-9 4.9-9-4.9z"/><path d="m3 11.9 9 4.9 9-4.9M3 16.9l9 4.9 9-4.9"/></svg>'
}

const features = [
  {
    icon: icons.cube,
    title: 'Vue 3 & TypeScript',
    desc: 'Rewritten from the ground up with <script setup> and full type definitions shipped in the box.'
  },
  {
    icon: icons.feather,
    title: 'Impossibly light',
    desc: '~7 kB gzipped, one tiny dependency (dayjs). No moment, no lodash, no runtime bloat.'
  },
  {
    icon: icons.palette,
    title: 'Themeable by design',
    desc: 'Every visual is a CSS custom property. Dark glass and light themes ship built in.'
  },
  {
    icon: icons.cursor,
    title: 'Actually interactive',
    desc: 'Task click events, per-task colors, progress bars, today & weekend highlighting.'
  },
  {
    icon: icons.server,
    title: 'SSR safe',
    desc: 'No window access at import time. Renders identically on server and client.'
  },
  {
    icon: icons.layers,
    title: 'Smart packing',
    desc: 'The horizontal spritesheet algorithm packs tasks into the fewest possible rows.'
  }
]

const onCardMove = (e: MouseEvent) => {
  const el = e.currentTarget as HTMLElement
  const r = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - r.left}px`)
  el.style.setProperty('--my', `${e.clientY - r.top}px`)
}
</script>
