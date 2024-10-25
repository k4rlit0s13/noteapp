import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Define el esquema de la nota
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: { type: Date, default: () => {
    const date = new Date();
    return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Ajustar a Bogotá (UTC-5)
  }},
  updatedAt: { type: Date, default: () => {
    const date = new Date();
    return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Ajustar a Bogotá (UTC-5)
  }},
}, { 
  collection: 'NOTE',
  versionKey: false,
});

// Crear el modelo
const Note = mongoose.model('Note', noteSchema);

class NoteController {
  // Método para crear una nota y devolver un token JWT
  async create(req, res) {
    try {
      // Obtener userId, title y content del cuerpo de la solicitud
      const { userId, title, content } = req.body;

      // Verificar que se proporcionen los campos requeridos
      if (!userId || !title || !content) {
        return res.status(400).json({ error: 'User ID, title, and content are required' });
      }

      // Verificar si el usuario existe en la colección USER
      const userExists = await mongoose.model('USER').findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      const newNote = new Note({
        userId: mongoose.Types.ObjectId(userId), // Asignar el userId proporcionado
        title,
        content,
      });

      // Inserta la nueva nota en la base de datos
      await newNote.save();

      // Crear un token JWT con la información de la nota
      const token = jwt.sign({
        _id: newNote._id,
        userId: newNote.userId,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt
      }, process.env.JWT_SECRET, { expiresIn: '1h' });

      // Devuelve un mensaje de éxito y el token
      return res.status(201).json({ message: 'Note created successfully', token });
    } catch (error) {
      console.error('Error creating note:', error);
      return res.status(500).json({ message: 'Error al crear la nota' });
    }
  }
}

export default new NoteController();
