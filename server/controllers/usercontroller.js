import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

// Define el esquema del usuario
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  }, { 
    collection: 'USER',
    versionKey: false
  });
  

// Define el modelo basado en el esquema
const User = mongoose.model('USER', userSchema);

class UserController {
    // Método para crear un usuario y devolver un token JWT
    static async createUser(req, res) {
        try {
          const { username, email, password } = req.body;
      
          // Verificar que los campos no estén vacíos
          if (!username || !email || !password) {
            return res.status(400).json({ error: 'All fields are required' });
          }
      
          // Verificar que todos los campos sean cadenas
          if (typeof username !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ error: 'All fields must be strings' });
          }
      
          // Verificar si el usuario ya existe
          const existingUserByEmail = await User.findOne({ email });
          if (existingUserByEmail) {
            return res.status(409).json({ error: 'Email already exists' });
          }
      
          const existingUserByUsername = await User.findOne({ username });
          if (existingUserByUsername) {
            return res.status(409).json({ error: 'Username already exists' });
          }
      
          // Crear el nuevo usuario
          const newUser = await User.create({ username, email, password });
          
          const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
          });
          
          res.status(201).json({ message: 'User created', token });
        } catch (error) {
          console.error('Error creating user:', error); // Imprime el error en la consola
          res.status(500).json({ error: 'Error creating user' });
        }
      }
      
}

export default UserController;
