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
  // get sortOn and count from RatingsAndReviews.jsx

  console.log(req.query);

  api.getReviewData(66642, req.query.sortOn, req.query.count)
  .then(response => { res.send(response.data) })
  .catch(err => console.log(err))
})


app.listen(1337, () => {
  console.log('Listening on port 1337');
})