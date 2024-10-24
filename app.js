import express from 'express';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import dotenv from 'dotenv';
import connectDB from './server/db/connectmongo/connect.js'; // Importa la función de conexión

dotenv.config();

const app = express();
const PORT = process.env.BACKEND_PORT; // Cambia el puerto por defecto si no está en .env
const PORT2 = process.env.FRONTEND_PORT; // Cambia el puerto por defecto si no está en .env

// Obtener __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(cors()); // Habilita CORS
app.use(express.json()); // Para parsear el cuerpo de las peticiones como JSON
app.use(express.static(join(__dirname, 'src'))); // Servir archivos estáticos

// Conexión a MongoDB
connectDB(); // Conecta a MongoDB

// Ruta de prueba de API
app.get('/api/test', (req, res) => {
  res.status(200).json({ message: 'Backend is working!' });
});

app.listen(PORT, () => {
  console.log(`Frontend running at http://localhost:${PORT2}`);
  console.log(`Backend ready at http://localhost:${PORT}/api/test`);
});
