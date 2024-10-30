import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const isProduction = process.env.NODE_ENV === 'production';

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [vue()],
  base: isProduction ? "https://k4rlit0s13.github.io/noteapp/" : "/", // Cambiar según el entorno
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Esto debería generar la carpeta dist
  },
  server: {
    port: process.env.FRONTEND_PORT || 3000,
    open: true,
    watch: {
      usePolling: true,
    },
  },
});
