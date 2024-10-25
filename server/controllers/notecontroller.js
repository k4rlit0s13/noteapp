import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

// Define el esquema de la nota
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: () => {
    const date = new Date();
    // Ajustar la hora a Bogotá (UTC-5)
    return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Restar 5 horas
  }},
  updatedAt: { type: Date, default: () => {
    const date = new Date();
    // Ajustar la hora a Bogotá (UTC-5)
    return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Restar 5 horas
  }},
}, { 
  collection: 'NOTE',
  versionKey: false,
});

// Crear el modelo
const Note = mongoose.model('Note', noteSchema);

class NoteController {
  async create(req, res) {
    try {
      const { userId, title, content } = req.body; // Recibir datos de la solicitud

      // Verificar que se proporcionen los campos requeridos
      if (!userId || !title || !content) {
        return res.status(400).json({ error: 'userId, title and content are required' });
      }

      const newNote = new Note({
        userId: mongoose.Types.ObjectId(userId), // Asegúrate de que userId es un ObjectId
        title,
        content,
      });

      // Inserta la nueva nota en la base de datos
      await newNote.save();

      // Devuelve la nota creada con el formato deseado
      return res.status(201).json({ 
        _id: newNote._id,
        userId: newNote.userId,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt.toISOString(), // Convertir a formato ISO para la respuesta
        updatedAt: newNote.updatedAt.toISOString()  // Convertir a formato ISO para la respuesta
      });
    } catch (error) {
      console.error('Error creating note:', error); // Imprime el error en la consola
      return res.status(500).json({ message: 'Error al crear la nota' });
    }
  }
}

export default new NoteController();
