const express = require('express');
const app = express();
const path = require('path');
const api = require('./api.js');
const cors = require('cors');

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, '../public/dist')));

app.post('/styles', (req, res) => {
  api.getStyleData(req.body.product)
  .then(response => { res.send(response.data) })
  .catch(err => console.log(err))
})

app.post('/product', (req, res) => {
  api.getProductData('products', req.body.product)
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

app.put('/helpfulQ/:question_id', (req, res) => {
  api.updateHelpQCount(req.params, req.body)
  .then(() => { res.status(204).send() })
  .catch(err => {
    console.error(err);
    res.status(404).send(err);
  })
})

app.put('/helpfulA/:answer_id', (req, res) => {
  api.updateHelpACount(req.params, req.body)
  .then(() => { res.status(204).send() })
  .catch(err => {
    console.error(err);
    res.status(404).send(err);
  })
  console.log("show me server input = ", req.body)
})

app.get('/productname/:id', (req, res) => {
  api.getProductName(req.params)
  .then(response => { res.status(200).send(response.data) })
  .catch(err => console.error(err));
})

app.post('/addquestion', (req, res) => {
  api.addNewQuestion(req.body)
  .then(response => { res.status(201).send(response.data) })
  .catch(err => console.log(err));
})

app.listen(1337, () => {
  console.log('Listening on port 1337');
})