// app.js
import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Servir archivos estáticos desde la carpeta 'src'
app.use(express.static(join(__dirname, 'src'))); // Usa join para construir la ruta

// Ruta para manejar cualquier otra solicitud
app.get('*', (req, res) => {
    res.sendFile(join(__dirname, 'src', 'index.html')); // Usa join para construir la ruta
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Connected: Server is running on http://localhost:${PORT}`);
});
