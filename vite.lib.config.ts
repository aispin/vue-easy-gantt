import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// library build: dist/vue-easy-gantt.js (umd) + dist/vue-easy-gantt.mjs (es) + dist/style.css
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    target: 'es2020',
    lib: {
      entry: fileURLToPath(new URL('./src/index.ts', import.meta.url)),
      name: 'VueEasyGantt',
      formats: ['es', 'umd'],
      fileName: (format) => (format === 'es' ? 'vue-easy-gantt.mjs' : 'vue-easy-gantt.js')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
