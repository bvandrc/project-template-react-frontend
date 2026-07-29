import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  base: '/',
  plugins: [tailwindcss(), react()],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
  } as const,
  build: {
    target: 'esnext',
    modulePreload: false,
  },
}))
