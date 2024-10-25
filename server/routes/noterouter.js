import express from 'express';
import noteController from '../controllers/notecontroller.js'; // Ajusta la ruta

const router = express.Router();

// Ruta para crear una nueva nota
router.post('/createnote', (req, res) => noteController.create(req, res));

// Ruta para actualizar una nota y crear un historial
router.put('/updatenote', (req, res) => noteController.update(req, res)); // Cambié a PUT para actualizar

export default router;
