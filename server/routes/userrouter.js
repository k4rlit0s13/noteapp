import express from 'express';
import UserController from '../controllers/usercontroller.js';

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/createuser', UserController.createUser);

// Ruta para autenticar un usuario
router.post('/authenticate', UserController.authenticateUser);

export default router;
