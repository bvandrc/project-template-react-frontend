import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { CSP_META, SECURITY_HEADERS } from './security.config'
import { BASE_PATH } from './site.config'

/**
 * GitHub Pages cannot set response headers, so the deployed site carries its
 * Content-Security-Policy in a `<meta http-equiv>` tag instead. Injecting it
 * here keeps it in sync with the header sent by the dev/preview servers.
 */
const cspMetaTag = (): Plugin => ({
  name: 'csp-meta-tag',
  transformIndexHtml: () => [
    {
      tag: 'meta',
      attrs: { 'http-equiv': 'Content-Security-Policy', content: CSP_META },
      // Appended rather than prepended so `<meta charset>` stays first in head.
      injectTo: 'head',
    },
  ],
})

export default defineConfig(() => ({
  base: BASE_PATH,
  plugins: [tailwindcss(), react(), cspMetaTag()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    headers: SECURITY_HEADERS,
  } as const,
  preview: {
    headers: SECURITY_HEADERS,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
}))
