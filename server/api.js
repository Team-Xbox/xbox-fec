const axios = require('axios');
const tokens = require('../tokens.js');

let options = {
  url: `https://app-hrsei-api.herokuapp.com/api/fec2/:${tokens.CAMPUS}/`,
  headers: {
    'Authorization': tokens.TOKEN,
  }
}

const getAtelierData = () => {
  return axios.get(options.url, options.headers)
  .then(data => {
    return data;
  })
  .catch(err => console.log(err))
}

module.exports.getAtelierData = getAtelierData;