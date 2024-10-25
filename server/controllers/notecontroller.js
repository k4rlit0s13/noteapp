import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Define el esquema de la nota
const noteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  createdAt: {
    type: Date, default: () => {
      const date = new Date();
      return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Ajustar a Bogotá (UTC-5)
    }
  },
  updatedAt: {
    type: Date, default: () => {
      const date = new Date();
      return new Date(date.getTime() - (5 * 60 * 60 * 1000)); // Ajustar a Bogotá (UTC-5)
    }
  },
}, {
  collection: 'NOTE',
  versionKey: false,
});

// Crear el modelo
const Note = mongoose.model('Note', noteSchema);

// Define el esquema del historial
const historySchema = new mongoose.Schema({
  noteId: { type: mongoose.Schema.Types.ObjectId, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  previousContent: { type: Array, required: true },
  newContent: { type: String, required: true },
}, {
  collection: 'HISTORY',
  versionKey: false,
});

// Crear el modelo del historial
const History = mongoose.model('History', historySchema);

class NoteController {
  // Método para crear una nota y registrar el historial
  async create(req, res) {
    try {
      const { userId, title, content } = req.body;

      if (!userId || !title || !content) {
        return res.status(400).json({ error: 'User ID, title, and content are required' });
      }

      const userExists = await mongoose.model('USER').findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Crear la nueva nota
      const newNote = new Note({
        userId: mongoose.Types.ObjectId(userId),
        title,
        content,
      });

      await newNote.save();

      // Crear el historial de creación
      const historyData = {
        noteId: newNote._id,
        userId: mongoose.Types.ObjectId(userId),
        action: 'created',
        timestamp: new Date(),
        previousContent: [],
        newContent: content,
      };

      const historyEntry = new History(historyData);
      await historyEntry.save();

      // Generar el token JWT
      const token = jwt.sign({
        _id: newNote._id,
        userId: newNote.userId,
        title: newNote.title,
        content: newNote.content,
        createdAt: newNote.createdAt,
        updatedAt: newNote.updatedAt
      }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(201).json({
        message: 'Note created successfully',
        token
      });
    } catch (error) {
      console.error('Error creating note:', error);
      return res.status(500).json({ message: 'Error al crear la nota' });
    }
  }

  async update(req, res) {
    try {
      const { noteId, userId, title, content } = req.body;
  
      if (!noteId || !userId) {
        return res.status(400).json({ error: 'Note ID and User ID are required' });
      }
  
      // Buscar la nota a actualizar
      const note = await Note.findById(noteId);
      if (!note) {
        return res.status(404).json({ error: 'Note not found' });
      }
  
      // Recoger datos anteriores
      const previousData = {
        title: note.title,
        content: note.content,
        updatedAt: note.updatedAt
      };
  
      // Actualizar solo si hay cambios
      let isUpdated = false;
      if (title !== undefined) {
        note.title = title;
        isUpdated = true; // Marcar como actualizado
      }
      if (content !== undefined) {
        note.content = content;
        isUpdated = true; // Marcar como actualizado
      }
  
      // Actualizar la fecha de modificación solo si hubo cambios
      if (isUpdated) {
        note.updatedAt = new Date();
        await note.save();
  
        // Buscar el historial existente para la nota
        const existingHistory = await History.findOne({ noteId: note._id });
  
        if (existingHistory) {
          // Solo agregar contenido anterior si hay cambios
          existingHistory.previousContent.push(previousData); // Agregar al historial existente
          existingHistory.newContent = content !== undefined ? content : note.content; // Actualizar contenido nuevo
          existingHistory.timestamp = note.updatedAt; // Actualizar la fecha
          await existingHistory.save();
        } else {
          // Si no existe un historial, crear uno nuevo
          const historyData = {
            noteId: note._id,
            userId: mongoose.Types.ObjectId(userId),
            action: 'edited',
            timestamp: note.updatedAt,
            previousContent: [previousData], // Guardar los datos anteriores
            newContent: content !== undefined ? content : note.content, // Usar el nuevo contenido si se cambió
          };
  
          const historyEntry = new History(historyData);
          await historyEntry.save();
        }
      }
  
      // Generar el token JWT
      const token = jwt.sign({
        _id: note._id,
        userId: note.userId,
        title: note.title,
        content: note.content,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt
      }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Retornar el mensaje y el token
      return res.status(200).json({ 
        message: 'Note updated successfully', 
        token: token 
      });
    } catch (error) {
      console.error('Error updating note:', error);
      return res.status(500).json({ message: 'Error updating note' });
    }
  }

  
}

export default new NoteController();
