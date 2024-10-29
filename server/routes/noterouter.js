import express from 'express';
import noteController from '../controllers/notecontroller.js'; // Ajusta la ruta

const router = express.Router();

// Ruta para crear una nueva nota
router.post('/createnote', (req, res) => noteController.create(req, res));

// Ruta para actualizar una nota y crear un historial
router.put('/updatenote', (req, res) => noteController.update(req, res));

// Ruta para obtener notas del usuario
router.get('/getUserNotes', (req, res) => noteController.getUserNotes(req, res));

// Ruta para obtener una nota por ID
router.get('/note/:id', (req, res) => noteController.getNoteById(req, res));

// Ruta para alternar el campo visualization de una nota por ID
router.put('/:noteId/visualization', (req, res) => noteController.toggleVisualization(req, res));

export default router;
