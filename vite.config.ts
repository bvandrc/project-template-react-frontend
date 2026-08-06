import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const securityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'Content-Security-Policy':
    "default-src 'self'; script-src 'self' https://www.googletagmanager.com; style-src 'self'; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com https://www.googletagmanager.com; frame-ancestors 'none'",
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
} as const

export default defineConfig(() => ({
  base: '/',
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    headers: securityHeaders,
  } as const,
  preview: {
    headers: securityHeaders,
  },
  build: {
    target: 'esnext',
    modulePreload: false,
  },
}))
