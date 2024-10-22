// app.js
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;


// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Connected: Server is running on http://localhost:${PORT}`);
});
