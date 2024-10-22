// app.js
const express = require('express');
const path = require('path');
require('dotenv').config(); // Cargar las variables de entorno

const app = express();
const PORT = process.env.PORT ;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Connected: Server is running on http://localhost:${PORT}`);
});
