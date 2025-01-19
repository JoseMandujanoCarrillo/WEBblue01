const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  director: { type: String, required: true },
  genero: { type: String, required: true },
  puntuacion: { type: Number, required: true },
  rating: { type: String, required: true },
  anio: { type: Number, required: true },
  imagen: { type: String, required: true },
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
