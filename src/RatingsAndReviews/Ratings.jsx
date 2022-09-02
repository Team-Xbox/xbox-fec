import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import ReviewList from './ReviewList.jsx'
import ProgressBar from './BarGraph.jsx'
import ProductBreakdown from './Factors.jsx'
const axios = require('axios');


var weightedAverage = function (a, b, c, d, e) {
  let ave = ((a * 1 + b * 2 + c * 3 + d * 4 + e * 5) / (Number(a) + Number(b) + Number(c) + Number(d) + Number(e)));
  return ave.toFixed(1);
}



//var starObject = {1:false, 2:false, 3:false, 4:false, 5: false};

const Ratings = ({ characteristics, ratings, recommended, parentCallbackFive, parentCallbackFour, parentCallbackThree, parentCallbackTwo, parentCallbackOne }) => {
  //console.log('ratings from ratings =', ratings['5']);
  //console.log('recommended from ratings =', recommended);

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
  var totalRecommendations = Number(recommended.true) + Number(recommended.false);
  var percentRecommended = Math.round(100 * Number(recommended.true) / totalRecommendations);
  //console.log('total ratings =', totalRatings);
  console.log('characteristics from ratings =', characteristics);

  if(characteristics) {
    if(characteristics.Size) {
    var sizeFactor = Math.round(characteristics.Size.value/5*100);
    console.log(sizeFactor);
    } else {
      var sizeFactor = 50;
    }
    if(characteristics.Comfort)
    var comfortFactor = Math.round(characteristics.Comfort.value/5*100);
    console.log(comfortFactor);
  } else {
    var comfortFactor = 50;
  }

  const [fiveStarButton, setFiveStarButton] = useState(false);
  {
    useEffect(() => {
      parentCallbackFive(fiveStarButton)
    }, [fiveStarButton])
  }

  const [fourStarButton, setFourStarButton] = useState(false);
  {
    useEffect(() => {
      parentCallbackFour(fourStarButton)
    }, [fourStarButton])
  }

  const [threeStarButton, setThreeStarButton] = useState(false);
  {
    useEffect(() => {
      parentCallbackThree(threeStarButton)
    }, [threeStarButton])
  }

  const [twoStarButton, setTwoStarButton] = useState(false);
  {
    useEffect(() => {
      parentCallbackTwo(twoStarButton)
    }, [twoStarButton])
  }

  const [oneStarButton, setOneStarButton] = useState(false);
  {
    useEffect(() => {
      parentCallbackOne(oneStarButton)
    }, [oneStarButton])
  }

  return (
    <div>
      {(!ave) ? <div></div> :
        <div >
          <ul>
            <div className='average-rating banner-rating'>{average}</div>
            <div className='starrating banner-rating'> <StarRating rating={ave} /></div>
          </ul>
          <div className='recommended-rating'>
            {percentRecommended}% of reviews recommend this product.
          </div>
          <table className="table-ratings">
            <tbody>
              <tr>
                <td><button className='button-review' role='button' onClick={(e) => {
                  console.log('clicked 5 star');
                  setFiveStarButton(!fiveStarButton);
                  //console.log(fiveStarButton);
                }}>5 stars</button>
                </td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(fiveStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className='button-review' role='button' onClick={(e) => {
                  console.log('clicked 4 star');
                  setFourStarButton(!fourStarButton);
                  //console.log(fourStarButton);
                }}>4 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(fourStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className='button-review' role='button' onClick={(e) => {
                  console.log('clicked 3 star');
                  setThreeStarButton(!threeStarButton);
                  //console.log(threeStarButton);
                }}
                >3 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(threeStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className='button-review' role='button' onClick={(e) => {
                  console.log('clicked 2 star');
                  setTwoStarButton(!twoStarButton);
                  //console.log(twoStarButton);
                }}
                >2 stars</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(twoStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className='button-review' role='button' onClick={(e) => {
                  console.log('clicked 1 star');
                  setOneStarButton(!oneStarButton);
                  //console.log(oneStarButton);
                }}

                >1 star</button></td>
                <td><ProgressBar bgcolor="#696969" progress={Math.round(oneStar / denominator * 100)} /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <ProductBreakdown average={sizeFactor} characteristic={'Size'} />
          </div>
          <table style={{ width: 300, marginLeft: 10 }}>
            <tbody>
              <tr>
                <td width='100' align='left'>Too Small</td><td width='100' align='center'>Perfect</td><td width='100' align='right'>Too Large</td>
              </tr>
            </tbody>
          </table>
          <div>
            <ProductBreakdown average={comfortFactor} characteristic={'Comfort'} />
          </div>
          <table style={{ width: 300, marginLeft: 10 }}>
            <tbody>
              <tr>
                <td width='100' align='left'>Poor</td><td width='100' align='center'></td><td width='100' align='right'>Perfect</td>
              </tr>
            </tbody>
          </table>
        </div>
      }
    </div >
  )

}

export default Ratings;

