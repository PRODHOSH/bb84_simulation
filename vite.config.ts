import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";


export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/' : '/bb84_simulation/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'three-vendor': ['three', '@react-three/fiber', '@react-three/drei'],
          'ui-components': ['@radix-ui/react-dialog', '@radix-ui/react-toast', '@radix-ui/react-slot'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'three'],
  },
}));



