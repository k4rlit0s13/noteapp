import express from 'express';
import noteController from '../controllers/notecontroller.js'; // Ajusta la ruta

const router = express.Router();

// Ruta para crear una nueva nota
router.post('/createnote', (req, res) => noteController.create(req, res));

// Ruta para actualizar una nota y crear un historial
router.put('/updatenote', (req, res) => noteController.update(req, res)); // Cambié a PUT para actualizar

// Ruta para obtener notas del usuario
router.get('/getUserNotes', (req, res) => noteController.getUserNotes(req, res)); // Nueva ruta para obtener notas

// Ruta para obtener una nota por ID
router.get('/note/:id', (req, res) => noteController.getNoteById(req, res)); // Nueva ruta para obtener una nota por ID

export default router;
