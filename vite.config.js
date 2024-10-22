import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [vue()],
  root: 'src',
  server: {
    port: (process.env.PORT), // Asegurarse de que sea un número
  },
});
