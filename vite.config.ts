import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { sites } from '@openai/sites-vite-plugin';

// Build a portable static site for the agreed GitHub Pages destination.
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react(), sites()],
  base: './',
  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    watch: { useFsEvents: false, usePolling: true },
  },
  build: { outDir: 'dist', assetsDir: 'assets', copyPublicDir: !isSsrBuild },
}));
