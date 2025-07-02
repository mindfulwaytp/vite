import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  base: '/', // ✅ Ensures correct path resolution for static assets
  plugins: [react(), svgr()]
})
