import express from 'express';
import noteController from '../controllers/notecontroller.js'; // Ajusta la ruta

const router = express.Router();

// Ruta para crear una nueva nota
router.post('/createnote', (req, res) => noteController.create(req, res)); // Usa '/' para manejar /notes

export default router;
