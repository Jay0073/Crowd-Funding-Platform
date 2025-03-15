import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',  // This is the default, but you can specify it explicitly
    assetsDir: 'assets',
    rollupOptions: {
      input: './index.html', // Ensure the correct entry file
    },
    copyPublicDir: true
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    historyApiFallback: true, // Enables fallback for React Router
  },
})
