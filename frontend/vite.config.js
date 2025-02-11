import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-redirects',
      closeBundle() {
        // Copy _redirects file to dist folder
        fs.copyFileSync(
          path.resolve(__dirname, 'public/_redirects'),
          path.resolve(__dirname, 'dist/_redirects')
        )
      }
    }
  ],
  base: '/',
  server: {
    port: 3000,
    host: true,
    historyApiFallback: true
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  }
})
