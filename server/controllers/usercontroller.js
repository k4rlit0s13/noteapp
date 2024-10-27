import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt'; // Importar bcrypt

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

            // Encriptar la contraseña
            const hashedPassword = await bcrypt.hash(password, 10); // Encriptar la contraseña

            // Crear el nuevo usuario
            const newUser = await User.create({ username, email, password: hashedPassword }); // Guardar la contraseña encriptada

            const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(201).json({ message: 'User created', token });
        } catch (error) {
            console.error('Error creating user:', error); // Imprime el error en la consola
            res.status(500).json({ error: 'Error creating user' });
        }
    }

    // Método para buscar un usuario específico por username y email y devolver un token JWT si existe
    static async findUser(req, res) {
        try {
            const { username, email } = req.body;

            // Verificar que los campos no estén vacíos
            if (!username || !email) {
                return res.status(400).json({ error: 'Username and email are required' });
            }

            // Verificar que ambos campos sean cadenas
            if (typeof username !== 'string' || typeof email !== 'string') {
                return res.status(400).json({ error: 'Username and email must be strings' });
            }

            // Buscar el usuario por username y email
            const user = await User.findOne({ username, email });
            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Generar un token JWT para el usuario encontrado
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });

            res.status(200).json({ message: 'User found', token });
        } catch (error) {
            console.error('Error finding user:', error); // Imprime el error en la consola
            res.status(500).json({ error: 'Error finding user' });
        }
    }


    static async authenticateUser(req, res) {
        try {
            const { email, password } = req.body;

            // Verificar que los campos no estén vacíos
            if (!email || !password) {
                return res.status(400).json({ error: 'Email and password are required' });
            }

            // Buscar el usuario por email
            const user = await User.findOne({ email });
            if (!user) return res.status(404).json({ error: 'User not found' });

            // Comparar la contraseña ingresada con la contraseña encriptada
            const isPasswordValid = await bcrypt.compare(password, user.password);
            if (!isPasswordValid) return res.status(401).json({ error: 'Invalid password' });

            // Generar un token JWT para el usuario encontrado
            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            
            res.cookie('auth_token', token); // Sin httpOnly y secure para pruebas

            // Mensaje de acceso concedido
            res.status(200).json({ message: 'Access granted' });
        } catch (error) {
            console.error('Error during authentication:', error);
            res.status(500).json({ error: 'Error during authentication' });
        }
    }






}

export default UserController;
