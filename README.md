<p align="center">
  <img width="120" src="https://raw.githubusercontent.com/aispin/vue-easy-gantt/main/example/public/logo.svg"/>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/vue-easy-gantt"><img src="https://img.shields.io/npm/v/vue-easy-gantt.svg"></a>
  <a href="https://www.npmjs.com/package/vue-easy-gantt"><img src="https://img.shields.io/npm/dt/vue-easy-gantt.svg"></a>
  <a href="https://www.npmjs.com/package/vue-easy-gantt"><img src="https://img.shields.io/npm/l/vue-easy-gantt.svg"></a>
  <a href="https://github.com/aispin/vue-easy-gantt"><img src="https://img.shields.io/badge/vue-3.x-42b883.svg"></a>
  <a href="https://github.com/aispin/vue-easy-gantt"><img src="https://img.shields.io/badge/types-included-blue.svg"></a>
</p>

## Intro

A modern Vue 3 gantt chart component for presenting weekly tasks.
Written in TypeScript, built with Vite, themed with CSS custom properties.

### Features
- Vue 3 (`<script setup>`) with full TypeScript definitions
- Elegant weekly gantt rendering via the `Horizontal Spritesheet Algorithm`
- Dark glass & light themes, every visual is a CSS custom property
- Task click events, per-task colors, progress bars
- Today & weekend highlighting, sticky header & first column
- SSR safe — no window access at import time
- ~7 kB gzipped, single tiny dependency (dayjs)

## Usage & Guide

Live examples and docs: **[vue-easy-gantt Demo Pages](https://aispin.github.io/vue-easy-gantt/)**

### Install

```bash
npm install vue-easy-gantt dayjs
```

### Quick start

```vue
<template>
  <easy-gantt :sdate="sdate" :utasks="utasks" theme="dark" @task-click="onTaskClick" />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import EasyGantt from 'vue-easy-gantt'
import 'vue-easy-gantt/style.css'

const sdate = ref('2026-10-19') // a Monday
const utasks = ref([
  {
    name: 'Ava',
    avatar: '/ava.png',
    tasks: [
      { title: 'Design audit', sdate: '2026-10-19', duration: 2, color: '#22d3ee', progress: 60 }
    ]
  }
])

function onTaskClick({ task, user }) {
  console.log(task, user)
}
</script>
```

Or register globally as a plugin:

```ts
import EasyGantt from 'vue-easy-gantt'
app.use(EasyGantt) // registers <easy-gantt>
```

### Props

| Prop | Type | Default | Description |
| --- | --- | --- | --- |
| `utasks` | `EgtUserTask[]` | `[]` | Users with their weekly tasks. |
| `sdate` | `string` | `''` | Week start date (Monday), `YYYY-MM-DD`. |
| `theme` | `'dark' \| 'light'` | `'dark'` | Built-in theme. Override any token via CSS variables. |
| `loading` | `boolean` | `false` | Shows the spinner mask overlay. |
| `spinner` | `'ring' \| 'dots'` | `'ring'` | Built-in spinner style (or use the slot). |
| `showWeekday` | `boolean` | `true` | Show weekday names in the header. |
| `highlightWeekend` | `boolean` | `true` | Dim Sat / Sun columns. |
| `highlightToday` | `boolean` | `true` | Glow today's column with a TODAY chip. |

### Events & Slots

| Name | Payload | Description |
| --- | --- | --- |
| `@task-click` | `{ task, user }` | Task bar clicked (mouse or keyboard). |
| `#spinner` | — | Replace the built-in loading spinner. |

### Task fields (`EgtTask`)

| Field | Type | Description |
| --- | --- | --- |
| `title` | `string` | Task label on the bar. |
| `sdate` | `string` | Start date, `YYYY-MM-DD`. |
| `duration` | `number` | Length in days (auto-clamped to the week). |
| `color` | `string?` | Custom bar color, e.g. `#f43f5e`. |
| `progress` | `number?` | 0–100, renders a progress strip. |

### Theming

Every visual is a CSS custom property on `.at-eg`:

```css
.at-eg {
  --eg-accent: #22d3ee;
  --eg-task-grad: linear-gradient(135deg, #22d3ee, #a78bfa);
  --eg-task-h: 40px;
  --eg-col0-w: 190px;
  /* ...see src/styles/style.css for the full token list */
}
```

## Changelog

Details for each release are documented in the [release notes](https://github.com/aispin/vue-easy-gantt/releases).

## Development Setup

```bash
# install dependencies
npm install

# run the landing page + demo dev server (http://localhost:8080)
npm run dev

# lint / typecheck / test / build library
npm run lint
npm run typecheck
npm test
npm run build

# build & deploy the landing page to gh-pages
npm run pages
```

## Licence

The MIT License (MIT)

Copyright (c) 2016-2026 ZEO

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
