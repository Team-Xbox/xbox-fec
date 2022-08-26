import React, {useState, useEffect} from 'react';
const axios = require('axios');

const Slideshow = (props) => {
  const [styleData, setStyleData] = useState([]);

  let expressUrl = 'http://localhost:1337'

  useEffect(() => {
    console.log('running in slideshow...');
    axios.get(expressUrl + '/styles')
    .then(response => {
      console.log(response.data);
    })
    .catch(err => console.log(err))
  })

  return (
    <div>
      Slideshow Goes Here
    </div>
  )
}

export default Slideshow