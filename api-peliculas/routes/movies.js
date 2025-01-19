const express = require('express');
const router = express.Router();
const movies = require('../data/movies');

// Ruta para obtener todas las películas
router.get('/', (req, res) => {
  res.json(movies);
});

// Ruta para obtener una película específica por ID
router.get('/:id', (req, res) => {
  const movieId = parseInt(req.params.id, 10);
  const movie = movies.find((m) => m.id === movieId);
  if (movie) {
    res.json(movie);
  } else {
    res.status(404).json({ error: 'Película no encontrada' });
  }
});

module.exports = router;
