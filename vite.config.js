import { defineConfig } from 'vite';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    minify: 'esbuild',
    target: 'es2020',
    rollupOptions: {
      input: './index.html'
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
