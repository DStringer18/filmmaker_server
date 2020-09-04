const express = require('express');
const app = express();
const { filmmakers } = require('./data');
const { getElementById, getIndexById, getRandomElement } = require('./utils');

app.use(express.static('public'));

const PORT = process.env.PORT || 4002;

//get random filmmaker
app.get('/api/filmmakers/random', (req, res) => {
  res.send({
    filmmaker: getRandomElement(filmmakers)
  })
})

//get all filmmakers or a filmmaker's films
app.get('/api/filmmakers', (req, res, next) => {
  console.log('received get request');
  if (req.query.filmmaker !== undefined) {
    const filmmakerFilms = filmmakers.filter(filmmaker => filmmaker.films === req.query.filmmaker);
    res.send({ filmmakers: filmmakerFilms})
  } else {
    res.send({
      filmmakers: filmmakers
    });
  }
});

app.get('/api/filmmakers/:id', (req, res, next) => {
  const foundFilmmaker = getElementById(req.params.id, filmmakers);
  if (foundFilmmaker) {
    res.send(foundFilmmaker);
  } else {
    res.status(404).send();
  }
});

app.put('/api/filmmakers/:id', (req, res, next) => {
  const filmmakerIndex = getIndexById(req.params.id, filmmakers);
  if (filmmakerIndex !== -1) {
    updateElement(req.params.id, req.query, expressions);
    res.send(filmmakers[filmmakerIndex]);
  } else {
    res.status(404).send();
  }
});

app.post('/api/filmmakers', (req, res, next) => {
  const objectToCreate = createElement
  ('filmmakers', req.query);
  if (objectToCreate) {
  res.status(201).send(objectToCreate);
  expressions.push(objectToCreate);
  } else {
    res.status(400).send();
  }
})

app.delete('/api/filmmakers/:id', (req, res, next) => {
  const filmmakerIndex = getIndexById(req.params.id, expressions);
  if (filmmakerIndex !== -1){
    expressions.splice(filmmakerIndex, 1)
    res.status(204).send(expressions[filmmakerIndex]);
  } else {
    res.status(404).send();
  }
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
})