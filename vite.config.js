import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// Configuration Vite standard pour un projet Vue 3 — aucun outil payant,
// build 100 % local, prêt pour `npm run dev` ou `npm run build`.
export default defineConfig({
  plugins: [vue()],
  server: {
    port: 5173,
    open: true,
  },
})
