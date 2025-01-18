import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    hmr: {
      overlay: false
    },
    watch: {
      // Reduce file system watching overhead
      usePolling: false,
      useFsEvents: true
    }
  },
  build: {
    // Reduce build time
    reportCompressedSize: false,
    chunkSizeWarningLimit: 1000
  }
});
