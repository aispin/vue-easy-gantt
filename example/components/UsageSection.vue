<template>
  <div class="usage-grid">
    <div class="code-block reveal">
      <div class="code-block-header">
        <span>install</span>
        <button class="copy-btn" title="Copy" @click="copy('npm install vue-easy-gantt dayjs')">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
      <pre><code><span class="tok-com"># npm</span>
npm install vue-easy-gantt dayjs

<span class="tok-com"># pnpm / yarn / bun all welcome</span></code></pre>
    </div>

    <div class="code-block reveal reveal-delay-1">
      <div class="code-block-header">
        <span>MyWeek.vue</span>
        <button class="copy-btn" title="Copy" @click="copy(usageCode)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
        </button>
      </div>
      <pre><code>{{ usageCode }}</code></pre>
    </div>
  </div>
</template>

<script setup lang="ts">
const usageCode = `<span class="tok-tag">&lt;template&gt;</span>
  <span class="tok-tag">&lt;easy-gantt</span>
    <span class="tok-attr">:sdate</span>=<span class="tok-str">"sdate"</span>
    <span class="tok-attr">:utasks</span>=<span class="tok-str">"utasks"</span>
    <span class="tok-attr">theme</span>=<span class="tok-str">"dark"</span>
    <span class="tok-attr">@task-click</span>=<span class="tok-str">"onTaskClick"</span>
  <span class="tok-tag">/&gt;</span>
<span class="tok-tag">&lt;/template&gt;</span>

<span class="tok-tag">&lt;script setup lang="ts"&gt;</span>
<span class="tok-key">import</span> { ref } <span class="tok-key">from</span> <span class="tok-str">'vue'</span>
<span class="tok-key">import</span> EasyGantt <span class="tok-key">from</span> <span class="tok-str">'vue-easy-gantt'</span>
<span class="tok-key">import</span> <span class="tok-str">'vue-easy-gantt/style.css'</span>

<span class="tok-key">const</span> sdate = ref(<span class="tok-str">'2026-10-19'</span>)
<span class="tok-key">const</span> utasks = ref([
  {
    name: <span class="tok-str">'Ava'</span>,
    avatar: <span class="tok-str">'/ava.png'</span>,
    tasks: [
      { title: <span class="tok-str">'Design audit'</span>, sdate: <span class="tok-str">'2026-10-19'</span>,
        duration: 2, color: <span class="tok-str">'#22d3ee'</span>, progress: 60 }
    ]
  }
])

<span class="tok-key">function</span> <span class="tok-fn">onTaskClick</span>({ task, user }) {
  console.log(task, user)
}
<span class="tok-tag">&lt;/script&gt;</span>`

const copy = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    // clipboard unavailable — ignore
  }
}
</script>
