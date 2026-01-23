import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// SPA uchun history API fallback middleware
const historyApiFallbackMiddleware = () => {
  return {
    name: 'history-api-fallback',
    apply: 'serve',
    enforce: 'post',
    handle(ctx) {
      if (ctx.method !== 'GET') return;

      const url = ctx.url.split('?')[0];

      // API va static fayllarni o'tkazib yuborish
      if (url.startsWith('/api') || url.includes('.')) return;

      // Boshqa barcha routelar uchun index.html qaytarish
      ctx.type = 'text/html';
      ctx.url = '/index.html';
    }
  };
};

export default defineConfig({
  server: {
    host: true,
    proxy: {
      '/api': {
        target: 'https://api.webgrade.uz',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    },
    middlewareMode: false,
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
  plugins: [react(), tailwindcss(), historyApiFallbackMiddleware()],
});
