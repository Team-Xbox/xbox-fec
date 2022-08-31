import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import ReviewList from './ReviewList.jsx'
import ProgressBar from './BarGraph.jsx'
const axios = require('axios');


var weightedAverage = function (a, b, c, d, e) {
  let ave = ((a * 1 + b * 2 + c * 3 + d * 4 + e * 5) / (Number(a) + Number(b) + Number(c) + Number(d) + Number(e)));
  return ave.toFixed(1);
}




const Ratings = ({ ratings }) => {
  //console.log('ratings from ratings =', ratings['5']);
  var average = weightedAverage(ratings['1'], ratings['2'], ratings['3'], ratings['4'], ratings['5']);
  //console.log(average);
  var ave = (Math.round(average));
  //console.log(ave);
  var totalRatings = Number(ratings['1']) + Number(ratings['2']) + Number(ratings['3']) + Number(ratings['4']) + Number(ratings['5']);
  var oneStar = Number(ratings['1']);
  var twoStar = Number(ratings['2']);
  var threeStar = Number(ratings['3']);
  var fourStar = Number(ratings['4']);
  var fiveStar = Number(ratings['5']);
  var ratingArray = [oneStar, twoStar, threeStar, fourStar, fiveStar];
  var denominator = Math.max(...ratingArray);
  //console.log(denominator);

  //console.log('total ratings =', totalRatings);
  return (
    <div>
      {(!ave) ? <div></div> :
        <div >
          <ul>
            <div className='average-rating banner-rating'>{average}</div>
            <div className='starrating banner-rating'> <StarRating rating={ave} /></div>
          </ul>
          <div>

          </div>
          <table className="table-ratings">
            <tbody>
              <tr>
                <td><button>5 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(fiveStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button>4 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(fourStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button>3 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(threeStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button>2 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(twoStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button>1 star</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(oneStar / denominator * 100)} /></td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </div>
  )
}

export default Ratings;