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
    // Everything else is off: edge functions need a Deno runtime the site doesn't use,
    // and static-file/redirect emulation shadows Vite's own serving — it served stale
    // pre-rendered pages out of dist/ when they existed, and raw .jsx when they didn't.
    netlify({
      edgeFunctions: { enabled: false },
      staticFiles: { enabled: false },
      redirects: { enabled: false },
    }),
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
