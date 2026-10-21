<template>
  <footer class="footer">
    <div class="wrap footer-inner">
      <div class="footer-brand">
        <img :src="logoUrl" alt="vue-easy-gantt">
        <span>vue-easy-gantt</span>
      </div>
      <ul class="footer-links">
        <li><a href="https://github.com/aispin/vue-easy-gantt" target="_blank" rel="noopener">GitHub</a></li>
        <li><a href="https://www.npmjs.com/package/vue-easy-gantt" target="_blank" rel="noopener">npm</a></li>
        <li><a href="https://github.com/aispin/vue-easy-gantt/issues" target="_blank" rel="noopener">Issues</a></li>
      </ul>
      <p class="footer-meta">MIT License · Vue 3 + TypeScript</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
// static footer
const logoUrl = import.meta.env.BASE_URL + 'logo.svg'
</script>
