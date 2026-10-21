<template>
  <div class="hero-art" aria-hidden="true">
    <svg viewBox="0 0 1440 760" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ha-cyan" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#22d3ee" />
          <stop offset="1" stop-color="#38bdf8" />
        </linearGradient>
        <linearGradient id="ha-indigo" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#818cf8" />
          <stop offset="1" stop-color="#6366f1" />
        </linearGradient>
        <linearGradient id="ha-violet" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#a78bfa" />
          <stop offset="1" stop-color="#8b5cf6" />
        </linearGradient>
        <linearGradient id="ha-pink" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#f472b6" />
          <stop offset="1" stop-color="#ec4899" />
        </linearGradient>
        <linearGradient id="ha-teal" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#2dd4bf" />
          <stop offset="1" stop-color="#14b8a6" />
        </linearGradient>
        <linearGradient id="ha-amber" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fbbf24" />
          <stop offset="1" stop-color="#f59e0b" />
        </linearGradient>
        <linearGradient id="ha-rose" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stop-color="#fb7185" />
          <stop offset="1" stop-color="#f43f5e" />
        </linearGradient>
        <filter id="ha-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="16" />
        </filter>
      </defs>

      <!-- today column band -->
      <rect :x="colX(3)" y="0" :width="colW" height="760" fill="rgba(34, 211, 238, 0.06)" />

      <!-- day column separators -->
      <g stroke="rgba(148, 163, 184, 0.1)" stroke-width="1">
        <line v-for="i in 8" :key="'col-' + i" :x1="colX(i)" y1="30" :x2="colX(i)" y2="730" />
      </g>

      <!-- gantt bars: blurred glow copy + solid copy -->
      <g v-for="(bar, i) in bars" :key="'bar-' + i">
        <rect
          :x="bar.x" :y="bar.y" :width="bar.w" :height="barH" :rx="barH / 2.6"
          :fill="bar.fill" opacity="0.55" filter="url(#ha-glow)"
        />
        <rect
          :x="bar.x" :y="bar.y" :width="bar.w" :height="barH" :rx="barH / 2.6"
          :fill="bar.fill" opacity="0.34"
        />
      </g>
    </svg>
  </div>
</template>

<script setup lang="ts">
const colW = 178
const gridX = 96
const barH = 46
const rowGap = 86
const gridY = 210

const colX = (i: number): number => gridX + i * colW

const bars = [
  { col: 0, len: 2, row: 0, fill: 'url(#ha-cyan)' },
  { col: 2, len: 2, row: 0, fill: 'url(#ha-indigo)' },
  { col: 5, len: 2, row: 0, fill: 'url(#ha-pink)' },
  { col: 0, len: 3, row: 1, fill: 'url(#ha-violet)' },
  { col: 3, len: 2, row: 1, fill: 'url(#ha-cyan)' },
  { col: 6, len: 1, row: 1, fill: 'url(#ha-rose)' },
  { col: 1, len: 2, row: 2, fill: 'url(#ha-teal)' },
  { col: 4, len: 1, row: 2, fill: 'url(#ha-amber)' },
  { col: 5, len: 2, row: 2, fill: 'url(#ha-indigo)' },
  { col: 0, len: 5, row: 3, fill: 'url(#ha-rose)' },
  { col: 6, len: 1, row: 3, fill: 'url(#ha-violet)' },
  { col: 2, len: 3, row: 4, fill: 'url(#ha-pink)' },
  { col: 5, len: 2, row: 4, fill: 'url(#ha-cyan)' }
].map(b => ({
  ...b,
  x: colX(b.col) + 10,
  y: gridY + b.row * rowGap,
  w: b.len * colW - 20
}))
</script>

<style scoped>
.hero-art {
  position: absolute;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0.5;
}

.hero-art svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
