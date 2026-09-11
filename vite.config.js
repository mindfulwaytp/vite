import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import netlify from '@netlify/vite-plugin'
import svgr from 'vite-plugin-svgr'
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default defineConfig({
  base: '/',
  plugins: [
    react(),
    // Runs netlify/functions/* (with Netlify env vars) inside the Vite dev server.
    // Edge functions are off: the site has none, and they need a Deno runtime.
    netlify({ edgeFunctions: { enabled: false } }),
    svgr(),
    viteStaticCopy({
      targets: [
        {
          src: 'public/_headers',
          dest: '.' // ✅ Places _headers directly in /dist
        }
      ]
    })
  ]
})
