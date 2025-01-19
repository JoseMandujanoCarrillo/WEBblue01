const express = require('express');
const cors = require('cors');
const filmsRouter = require('./routes/films'); // Importa el router de películas
require('./db'); // Configuración de la base de datos

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Rutas
app.use('/films', filmsRouter); // Asigna las rutas de películas

// Servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
