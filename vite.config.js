import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: 'localhost',
    port: 5173,
    strictPort: true,
    hmr: true,
    watch: {
      usePolling: true,
      interval: 100,
    },
  },
  clearScreen: false,
})
