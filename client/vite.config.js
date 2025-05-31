import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path';
import fs from "fs";

import { writeFileSync } from 'fs';
writeFileSync('dist/.nojekyll', '');

// Plugin to copy index.html to 404.html
function copy404Plugin() {
  return {
    name: "copy-index-to-404",
    closeBundle: () => {
      fs.copyFileSync("dist/index.html", "dist/404.html");
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  base: '/CrowdFund/',
  plugins: [react(), tailwindcss(), copy404Plugin()],
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
