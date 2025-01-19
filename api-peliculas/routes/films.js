const express = require('express');
const router = express.Router();
const Movie = require('../models/Movie');

// Obtener todas las películas
router.get('/', async (req, res) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener películas' });
  }
});

// Obtener una película específica por ID
router.get('/:id', async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (movie) {
      res.json(movie);
    } else {
      res.status(404).json({ error: 'Película no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener la película' });
  }
});

// Crear una nueva película
router.post('/', async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.status(201).json(savedMovie);
  } catch (err) {
    res.status(400).json({ error: 'Error al crear la película' });
  }
});

// Actualizar una película específica
router.put('/:id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedMovie) {
      res.json(updatedMovie);
    } else {
      res.status(404).json({ error: 'Película no encontrada' });
    }
  } catch (err) {
    res.status(400).json({ error: 'Error al actualizar la película' });
  }
});

// Eliminar una película específica
router.delete('/:id', async (req, res) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(req.params.id);
    if (deletedMovie) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Película no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
});

module.exports = router;
