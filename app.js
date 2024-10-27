import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser'; // Asegúrate de importar cookie-parser
import connectDB from './server/db/connectmongo/connect.js'; // Importa la función de conexión
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import apiV1 from './server/versions/version.js';
import https from 'https'; // Importa el módulo https
import fs from 'fs'; // Importa el módulo fs para leer archivos

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT; // Cambia el puerto por defecto si no está en .env
const PORT2 = process.env.FRONTEND_PORT; // Cambia el puerto por defecto si no está en .env

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors({
  origin: `https://localhost:${PORT2}`, // Cambia esto al origen de tu frontend
  credentials: true, // Permitir cookies y credenciales
})); 
app.use(cookieParser()); // Middleware para manejar cookies
app.use(express.json()); // Para parsear el cuerpo de las peticiones como JSON
app.use(express.static(join(__dirname, 'src'))); // Servir archivos estáticos

// Conexión a MongoDB
connectDB(); // Conecta a MongoDB

// Configurar las APIs
app.use('/api/v1', apiV1);

// Ruta de prueba de API
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend is working!' });
});

// Configura las opciones del servidor HTTPS
const options = {
  key: fs.readFileSync(join(__dirname, 'private.key')), // Ruta al archivo de la clave privada
  cert: fs.readFileSync(join(__dirname, 'certificate.crt')), // Ruta al archivo del certificado
};

// Crea un servidor HTTPS
const server = https.createServer(options, app);

// Inicia el servidor
server.listen(PORT, () => {
  console.log(`Frontend running at https://localhost:${PORT2}`);
  console.log(`Backend ready at https://localhost:${PORT}/api/test`);
});
