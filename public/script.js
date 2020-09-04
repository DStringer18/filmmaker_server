const fetchAllButton = document.getElementById('fetch-filmmakers');
const fetchRandomButton = document.getElementById('fetch-random');
const fetchByFilmmakerButton = document.getElementById('fetch-by-filmmaker');
const filmmakerContainer = document.getElementById('filmmaker-container');
const filmmaker = document.querySelector('.filmmaker');
const films = document.querySelector('.films');

const resetFilmmakers = () => {
  filmmakerContainer.innerHTML = '';
}

const renderError = response => {
  filmmakerContainer.innerHTML = `<p>Your request returned an error from the server: </p>
<p>Code: ${response.status}</p>
<p>${response.statusText}</p>`;
}

const renderFilmmakers = (filmmakers = []) => {
  resetFilmmakers();
  if (filmmakers.length > 0) {
    filmmakers.forEach(filmmaker => {
      const newFilmmaker = document.createElement('div');
      newFilmmaker.className = 'single-filmmaker';
      newFilmmaker.innerHTML = 
        `<div class="filmmaker-id">ID: ${filmmaker.id}</div>
        <div class="filmmaker-text">${filmmaker.filmmaker}</div>`;
      filmmakerContainer.appendChild(newFilmmaker);
    });
  } else {
    filmmakerContainer.innerHTML = '<p>Your request returned no filmmakers.</p>';
  }
}

fetchAllButton.addEventListener('click', () => {
  fetch('/api/filmmakers')
  .then(response => {
    console.log(response);
    if (response.ok) {
      return response.json()
    } else {
      console.log('error!!!')
      renderError(response);
    }
  })
  .then(response => {
    console.log(response);
    renderFilmmakers(response.filmmakers);
  });
});

fetchRandomButton.addEventListener('click', () => {
  fetch('/api/filmmakers/random')
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderFilmmakers([response.filmmakers]);
  });
});

fetchByFilmmakerButton.addEventListener('click', () => {
  const filmmaker = document.getElementById('author').value;
  fetch(`/api/filmmakers?filmmaker=${filmmaker}`)
  .then(response => {
    if (response.ok) {
      return response.json();
    } else {
      renderError(response);
    }
  })
  .then(response => {
    renderFilmmakers(response.filmmakers);
  });
});
