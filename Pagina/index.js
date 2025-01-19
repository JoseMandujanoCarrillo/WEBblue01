const API_URL = 'http://localhost:3000/films';

// Cargar películas en la página principal
function loadMovies() {
  fetch(API_URL)
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById('movies-container');
      container.innerHTML = data.map(movie => `
        <div class="movie-card">
          <img src="${movie.imagen}" alt="${movie.titulo}">
          <h2>${movie.titulo}</h2>
          <button onclick="updateMovie('${movie._id}')">Editar</button>
          <button onclick="deleteMovie('${movie._id}')">Eliminar</button>
        </div>
      `).join('');
    })
    .catch(error => console.error('Error al cargar las películas:', error));
}

// Redirigir al formulario con datos para editar
function updateMovie(id) {
  window.location.href = `form.html?id=${id}`;
}

// Eliminar película
function deleteMovie(id) {
  if (confirm('¿Estás seguro de eliminar esta película?')) {
    fetch(`${API_URL}/${id}`, { method: 'DELETE' })
      .then(() => loadMovies())
      .catch(error => console.error('Error al eliminar la película:', error));
  }
}

// Cargar las películas al iniciar
loadMovies();
