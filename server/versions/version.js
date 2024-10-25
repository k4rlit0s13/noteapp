import express from 'express';
import userRouter from '../routes/userrouter.js';
import noteRouter from '../routes/noterouter.js'; // Importa el enrutador de notas

const apiV1 = express.Router();

// Rutas para usuarios
apiV1.use('/users', userRouter);

// Rutas para notas
apiV1.use('/notes', noteRouter); // Añade esta línea

export default apiV1;
