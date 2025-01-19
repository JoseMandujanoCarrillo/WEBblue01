const API_URL = 'http://localhost:3000/films';

// Referencias al formulario
const form = document.getElementById('movie-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const movieIdField = document.getElementById('movie-id');

// Leer parámetros de la URL
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

// Si hay un ID en los parámetros, cargar datos de la película para editar
if (movieId) {
  fetch(`${API_URL}/${movieId}`)
    .then(response => response.json())
    .then(movie => {
      formTitle.textContent = 'Editar Película';
      submitBtn.textContent = 'Actualizar';

      movieIdField.value = movie._id;
      document.getElementById('titulo').value = movie.titulo;
      document.getElementById('imagen').value = movie.imagen;
      document.getElementById('director').value = movie.director;
      document.getElementById('genero').value = movie.genero;
      document.getElementById('puntuacion').value = movie.puntuacion;
      document.getElementById('rating').value = movie.rating;
      document.getElementById('anio').value = movie.anio;
    })
    .catch(error => console.error('Error al cargar los datos de la película:', error));
}

// Guardar o actualizar película
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const movie = {
    titulo: document.getElementById('titulo').value,
    imagen: document.getElementById('imagen').value,
    director: document.getElementById('director').value,
    genero: document.getElementById('genero').value,
    puntuacion: parseFloat(document.getElementById('puntuacion').value),
    rating: document.getElementById('rating').value,
    anio: parseInt(document.getElementById('anio').value)
  };

  const method = movieId ? 'PUT' : 'POST';
  const url = movieId ? `${API_URL}/${movieId}` : API_URL;

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  })
    .then(() => {
      window.location.href = 'index.html';
    })
    .catch(error => console.error('Error al guardar/actualizar la película:', error));
});
