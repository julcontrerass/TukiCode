import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimizer({
      // Optimize images during build
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 85,
      },
      avif: {
        quality: 75,
      },
    }),
  ],

  // Path aliases (replaces tsconfig paths)
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },

  // Optimization settings (mirrors Next.js config)
  build: {
    // Minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: ['log'],  // Remove console.log in production (keep error/warn)
      },
    },

    // Code splitting
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-animation': ['framer-motion'],
          'vendor-spline': ['@splinetool/react-spline'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },

    // Chunk size warnings
    chunkSizeWarningLimit: 1000,
  },

  // Dev server
  server: {
    port: 3000,
    open: true,
  },

  // Preview server
  preview: {
    port: 3000,
  },
});
