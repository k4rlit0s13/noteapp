import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  root: path.resolve(__dirname, 'src'),
  plugins: [vue()],
  base: "https://k4rlit0s13.github.io/noteapp/",
  build: {
    outDir: path.resolve(__dirname, 'dist'), // Esto debería generar la carpeta dist
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'src/index.html'), // Entrada principal
        signup: path.resolve(__dirname, 'src/views/signup.html'), // Entrada para la página de registro
        infonote: path.resolve(__dirname, 'src/views/infonote.html'), // Entrada para la página de información de notas
        createnote: path.resolve(__dirname, 'src/views/createnote.html'), // Entrada para la página de creación de notas
      }
    }
  },
  server: {
    /*
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'private.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'certificate.crt')),
    },
    */
    port: process.env.FRONTEND_PORT || 3000, // Puerto por defecto
    open: true, // Abre el navegador automáticamente
    watch: {
      usePolling: true, // Usa polling para observar cambios
    },
  },
});
