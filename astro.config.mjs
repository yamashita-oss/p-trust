import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  site: 'https://ptrust-web.com',
  compressHTML: true,
  vite: {
    build: {
      cssMinify: true,
      rollupOptions: {
        output: {
          // vendor JS を分割してキャッシュ効率を上げる
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  },
});
