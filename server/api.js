const axios = require('axios');
const tokens = require('../tokens.js');

let options = {
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/${tokens.CAMPUS}/`,
  headers: {
    'Authorization': tokens.TOKEN,
  }
}

const getProductData = (endpoint, parameter, value, optionalVal, optionalParam) => {
  if (optionalVal || optionalParam) {
    return axios.get(options.url + `${endpoint}?${parameter}=${value}&${optionalParam}=${optionalVal}`, options.headers)
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
  } else {
    return axios.get(options.url + `${endpoint}?${parameter}=${value}`, options.headers)
    .then(data => {
      return data;
    })
    .catch(err => console.log(err))
  }
}

const getStyleData = (product_id) => {
  console.log('running...')
  return axios.get(options.url + `products/${product_id}/styles`, {headers: options.headers})
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
}

module.exports.getProductData = getProductData;
module.exports.getStyleData = getStyleData;