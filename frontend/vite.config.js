import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/', // Adjust this if hosting under a subdirectory
  build: {
    outDir: 'dist', // Default build output directory
  },
  server: {
    port: 5173, // Optional: Set local dev server port
  },
});
