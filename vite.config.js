import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [vue()],
  base: "https://k4rlit0s13.github.io/noteapp/",
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt')),
    },
    port: process.env.FRONTEND_PORT || 3000,
    open: true, 
    watch: {
      usePolling: true,
    },
  },
});
