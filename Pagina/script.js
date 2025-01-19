const API_URL = 'http://localhost:3000/films';

// Referencias al formulario
const form = document.getElementById('movie-form');
const formTitle = document.getElementById('form-title');
const submitBtn = document.getElementById('submit-btn');
const cancelBtn = document.getElementById('cancel-btn');
const movieIdField = document.getElementById('movie-id');

// Cargar películas
function loadMovies() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('movies-container');
      container.innerHTML = data.map(movie => `
        <div class="movie-card">
          <img src="${movie.imagen}" alt="${movie.titulo}">
          <h2>${movie.titulo}</h2>
          <button onclick="editMovie('${movie._id}')">Editar</button>
          <button onclick="deleteMovie('${movie._id}')">Eliminar</button>
        </div>
      `).join('');
    })
    .catch(error => console.error('Error al cargar las películas:', error));
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

  const movieId = movieIdField.value;

  const method = movieId ? 'PUT' : 'POST';
  const url = movieId ? `${API_URL}/${movieId}` : API_URL;

  fetch(url, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(movie)
  })
    .then(() => {
      resetForm();
      loadMovies();
    })
    .catch(error => console.error('Error al guardar/actualizar la película:', error));
});

// Editar película
function editMovie(id) {
  fetch(`${API_URL}/${id}`)
    .then(response => response.json())
    .then(movie => {
      formTitle.textContent = 'Editar Película';
      submitBtn.textContent = 'Actualizar';
      cancelBtn.style.display = 'inline-block';

      movieIdField.value = movie._id;
      document.getElementById('titulo').value = movie.titulo;
      document.getElementById('imagen').value = movie.imagen;
      document.getElementById('director').value = movie.director;
      document.getElementById('genero').value = movie.genero;
      document.getElementById('puntuacion').value = movie.puntuacion;
      document.getElementById('rating').value = movie.rating;
      document.getElementById('anio').value = movie.anio;
    });
}

// Eliminar película
function deleteMovie(id) {
  if (confirm('¿Estás seguro de eliminar esta película?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => loadMovies())
      .catch(error => console.error('Error al eliminar la película:', error));
  }
}

// Restablecer formulario
function resetForm() {
  formTitle.textContent = 'Agregar Película';
  submitBtn.textContent = 'Guardar';
  cancelBtn.style.display = 'none';
  movieIdField.value = '';
  form.reset();
}

// Cancelar edición
cancelBtn.addEventListener('click', resetForm);

// Cargar las películas al iniciar
loadMovies();
