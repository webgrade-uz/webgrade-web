import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://api.webgrade.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'particles': ['@tsparticles/react', '@tsparticles/slim'],
          'icons': ['lucide-react'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      }
    }
  },
  plugins: [react(), tailwindcss()],
});
