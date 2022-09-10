import React, { useState, useEffect } from 'react'
import RenderStars from '../components/RenderStars.jsx';
const axios = require('axios');

var weightedAverage = function (a, b, c, d, e) {
  let ave = ((a * 1 + b * 2 + c * 3 + d * 4 + e * 5) / (Number(a) + Number(b) + Number(c) + Number(d) + Number(e)));
  return ave.toFixed(1);
}
const ProductRating = (props) => {
  const [ratings, setRatings] = useState([]);
  var oneStar = Number(ratings['1']) || 0;
  var twoStar = Number(ratings['2']) || 0;
  var threeStar = Number(ratings['3']) || 0;
  var fourStar = Number(ratings['4']) || 0;
  var fiveStar = Number(ratings['5']) || 0;

  var average = weightedAverage(oneStar, twoStar, threeStar, fourStar, fiveStar);

  useEffect(() => {
    axios.get('/ratings')
      .then(response => {
        setRatings(response.data.ratings);
      })
      .catch(err => console.log(err))
  }, [JSON.stringify(ratings)])

  return (
    <div data-testid="ratings">
      {(!average) ? <div></div> :
        <div className="stars-div">
          <div className='prod-stars'> <RenderStars rating={average}/> </div>
        </div>
      }
    </div >
  )
}

export default ProductRating;