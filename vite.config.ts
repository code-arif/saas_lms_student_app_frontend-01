import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  css: {
    transformer: 'postcss',
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor';
            }
            if (id.includes('@tanstack/react-query')) {
              return 'query';
            }
            if (
              id.includes('@radix-ui') || 
              id.includes('lucide-react') || 
              id.includes('framer-motion') ||
              id.includes('recharts') ||
              id.includes('hls.js') ||
              id.includes('cmdk')
            ) {
              return 'ui';
            }
            return 'others';
          }
        },
      },
    },
    chunkSizeWarningLimit: 600,
  },
})
