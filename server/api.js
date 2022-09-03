const axios = require('axios');
const tokens = require('../tokens.js');

let options = {
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/${tokens.CAMPUS}/`,
  headers: {
    'Authorization': tokens.TOKEN,
  }
}

const getProductData = (endpoint, value) => {
  return axios.get(options.url + `${endpoint}/${value}`, {headers: options.headers})
  .then(data => {
    return data;
  })
  .catch(err => console.log('API ERROR', err))
}

const getStyleData = (product_id) => {
  return axios.get(options.url + `products/${product_id}/styles`, {headers: options.headers})
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
}

const getReviewData = (product_id, sortOn='relevant', count=2) => {
  console.log('running getReviewData...')
  return axios.get(options.url + `reviews?product_id=${product_id}&sort=${sortOn}&count=${count}&page=1`, {headers: options.headers})
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
}

const getRatings = (product_id) => {
  console.log('running getRatings...')
  return axios.get(options.url + `reviews/meta?product_id=${product_id}`, {headers: options.headers})
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
}

const getQuestionsList = ({id, page, count}) => {
  return axios.get(options.url + `qa/questions?product_id=${id}&page=${page}&count=${count}`, {headers: options.headers})
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

const getAnswersList = ({question_id, page, count}) => {
  return axios.get(options.url + `qa/questions/${question_id}/answers?page=${page}&count=${count}`, {headers: options.headers})
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

const updateHelpQCount = ({question_id}, body) => {
  return axios.put(options.url + `qa/questions/${question_id}/helpful`, body, {headers: options.headers})
    .then(() => {
      console.log('success!')
    })
    .catch(err => console.log(err))
}

const updateHelpACount = ({answer_id}, body) => {
  return axios.put(options.url + `qa/answers/${answer_id}/helpful`, body, {headers: options.headers})
    .then(() => {
      console.log('success!')
    })
    .catch(err => console.log(err))
}

const getProductName = ({id}) => {
  return axios.get(options.url + `products/${id}`, {headers: options.headers})
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

const addNewQuestion = (body) => {
  return axios.post(options.url + 'qa/questions', body, {headers: options.headers})
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

const addNewAnswer = ({questionId}, body) => {
  return axios.post(options.url + `qa/questions/${questionId}/answers`, body, {headers: options.headers})
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
}

module.exports.getProductData = getProductData;
module.exports.getStyleData = getStyleData;
module.exports.getQuestionsList = getQuestionsList;
module.exports.getAnswersList = getAnswersList;
module.exports.updateHelpQCount = updateHelpQCount;
module.exports.updateHelpACount = updateHelpACount;
module.exports.getProductName = getProductName;
module.exports.addNewQuestion = addNewQuestion;
module.exports.addNewAnswer = addNewAnswer;
module.exports.getReviewData = getReviewData;
module.exports.getRatings = getRatings;

