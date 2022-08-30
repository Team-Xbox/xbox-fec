const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/dist')));


app.get('/styles', (req, res) => {
  api.getStyleData(66642)
  .then(response => { res.send(response.data) })
  .catch(err => console.log(err))
})

app.get('/reviews', (req, res) => {
  api.getReviewData(66642, req.query.sortOn, req.query.count)
  .then(response => { res.send(response.data) })
  .catch(err => console.log(err))
})

app.get('/ratings', (req, res) => {
  api.getRatings(66642)
  .then(response => { res.send(response.data) })
  .catch(err => console.log(err))
})

app.get('/questions/:id/:page/:count', (req, res) => {
  api.getQuestionsList(req.params)
  .then(response => { res.status(200).send(response.data) })
  .catch(err => console.error(err));
})

app.get('/answers/:question_id/:page/:count', (req, res) => {
  api.getAnswersList(req.params)
  .then(response => { res.status(200).send(response.data) })
  .catch(err => console.error(err));
})

app.listen(1337, () => {
  console.log('Listening on port 1337');
})