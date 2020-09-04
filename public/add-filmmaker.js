const submitButton = document.getElementById('submit-filmmaker');
const newFilmmakerContainer = document.getElementById('new-filmmaker');

submitButton.addEventListener('click', () => {
  const filmmaker = document.getElementById('filmmaker').value;
  const person = document.getElementById('person').value;

  fetch(`/api/filmmakers?filmmaker=${filmmaker}&person=${person}`, {
    method: 'POST',
  })
  .then(response => response.json())
  .then(({filmmaker}) => {
    const newFilmmaker = document.createElement('div');
    newFilmmaker.innerHTML = `
    <h3>Congrats, your filmmaker was added!</h3>
    <div class="filmmaker-text">${filmmaker.filmmaker}</div>
    <div class="attribution">${filmmaker.films}</div>
    <p>Go to the <a href="index.html">home page</a> to request and view all filmmakers.</p>
    `
    newFilmmakerContainer.appendChild(newFilmmaker);
  });
});
