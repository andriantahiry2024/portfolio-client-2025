import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { tempo } from "tempo-devtools/dist/vite";
import { splitVendorChunkPlugin } from 'vite';

const conditionalPlugins: [string, Record<string, any>][] = [];

// @ts-ignore
if (process.env.TEMPO === "true") {
  conditionalPlugins.push(["tempo-devtools/swc", {}]);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: '/', // Toujours utiliser la racine comme base
  optimizeDeps: {
    entries: ["src/main.tsx", "src/tempobook/**/*"],
  },
  plugins: [
    react({
      plugins: conditionalPlugins,
    }),
    tempo(),
    splitVendorChunkPlugin(),
  ],
  resolve: {
    preserveSymlinks: true,
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    // @ts-ignore
    allowedHosts: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1000, // Augmenter la limite d'avertissement à 1000 kB
    rollupOptions: {
      output: {
        manualChunks: {
          // Séparer les bibliothèques volumineuses en chunks distincts
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-accordion',
            '@radix-ui/react-alert-dialog',
            '@radix-ui/react-aspect-ratio',
            '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox',
            '@radix-ui/react-collapsible',
            '@radix-ui/react-context-menu',
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-hover-card',
            '@radix-ui/react-icons',
            '@radix-ui/react-label',
            '@radix-ui/react-menubar',
            '@radix-ui/react-navigation-menu'
          ],
          'framer-motion': ['framer-motion'],
          'editor': ['@editorjs/editorjs', '@editorjs/paragraph', '@editorjs/header', '@editorjs/list', '@editorjs/code'],
          'form-utils': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'date-utils': ['date-fns', 'react-day-picker'],
          'markdown': ['react-markdown', 'rehype-highlight', 'rehype-raw', 'remark-gfm'],
          'maps': ['leaflet', 'react-leaflet']
        }
      }
    }
  }
});
