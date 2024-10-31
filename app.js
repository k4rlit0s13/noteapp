import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import connectDB from './server/db/connectmongo/connect.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import apiV1 from './server/versions/version.js';

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT || 5000; // Asegúrate de tener un puerto por defecto
const PORT2 = process.env.FRONTEND_PORT || 3000; // Asegúrate de tener un puerto por defecto

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: `http://localhost:${PORT2}`, // Cambia esto al origen de tu frontend
  credentials: true, // Permitir cookies y credenciales
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(join(__dirname, 'src'))); // Servir archivos estáticos desde la carpeta 'src'

// Conexión a MongoDB
connectDB(); // Conecta a MongoDB

// Configurar las APIs
app.use('/api/v1', apiV1);

// Ruta de prueba de API
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend is working!' });
});

// Inicia el servidor HTTP
app.listen(PORT, () => {
  console.log(`Backend ready at http://localhost:${PORT}/api/test`); // Mensaje de estado del backend
  console.log(`Frontend running at http://localhost:${PORT2}`); // Mensaje de estado del frontend (puedes quitar esta línea si solo estás sirviendo la API)
});
