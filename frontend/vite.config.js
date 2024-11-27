import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows the server to be accessible externally
    port: 5173, // Ensure this matches the exposed port
    strictPort: true, // Prevents Vite from switching ports
    watch: {
      usePolling: true, // Ensures live reload works in Docker
    },
  },
});
