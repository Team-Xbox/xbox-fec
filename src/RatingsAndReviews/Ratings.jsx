import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import ReviewList from './ReviewList.jsx'
import ProgressBar from './BarGraph.jsx'
import ProductBreakdown from './Factors.jsx'
import FiveStars from './FiveStars.jsx'
const axios = require('axios');


var weightedAverage = function (a, b, c, d, e) {
  let ave = ((a * 1 + b * 2 + c * 3 + d * 4 + e * 5) / (Number(a) + Number(b) + Number(c) + Number(d) + Number(e)));
  return ave.toFixed(1);
}
const Ratings = ({ characteristics, ratings, recommended, parentCallbackFive, parentCallbackFour, parentCallbackThree, parentCallbackTwo, parentCallbackOne }) => {
  var oneStar = Number(ratings['1']) || 0;
  //console.log(oneStar);
  var twoStar = Number(ratings['2']) || 0;
  //console.log(twoStar);
  var threeStar = Number(ratings['3']) || 0;
  var fourStar = Number(ratings['4']) || 0;
  var fiveStar = Number(ratings['5']) || 0;

  var average = weightedAverage(oneStar, twoStar, threeStar, fourStar, fiveStar);
  var ave = (Math.round(average));
  var totalRatings = Number(ratings['1']) + Number(ratings['2']) + Number(ratings['3']) + Number(ratings['4']) + Number(ratings['5']);
  var ratingArray = [oneStar, twoStar, threeStar, fourStar, fiveStar];
  var denominator = Math.max(...ratingArray);
  var totalRecommendations = Number(recommended.true) + Number(recommended.false);
  var percentRecommended = Math.round(100 * Number(recommended.true) / totalRecommendations);

  if (characteristics) {
    if (characteristics.Size) {
      var sizeFactor = Math.round(characteristics.Size.value / 5 * 100);
    } else {
      var sizeFactor = null;
    }
    if (characteristics.Comfort) {
      var comfortFactor = Math.round(characteristics.Comfort.value / 5 * 100);
    } else {
      var comfortFactor = null;
    }
    if (characteristics.Width) {
      var widthFactor = Math.round(characteristics.Width.value / 5 * 100);
    } else {
      var widthFactor = null;
    }
    if (characteristics.Quality) {
      var qualityFactor = Math.round(characteristics.Quality.value / 5 * 100);
    } else {
      var qualityFactor = null;
    }
    if (characteristics.Length) {
      var lengthFactor = Math.round(characteristics.Length.value / 5 * 100);
    } else {
      var lengthFactor = null;
    }
    if (characteristics.Fit) {
      var fitFactor = Math.round(characteristics.Fit.value / 5 * 100);
    } else {
      var fitFactor = null;
    }
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
    <div data-testid="ratings">
      {(!ave) ? <div></div> :
        <div className = 'ratings-total'>
          <ul>
            <div className='average-rating banner-rating'>{average}</div>
            <div className='starrating banner-rating'> <FiveStars rating={average}/> </div>
          </ul>
          <div className='recommended-rating'>
            {percentRecommended}% of reviews recommend this product.
          </div>
          <table className="table-ratings">
            <tbody>
              <tr>
                <td><button className={!fiveStarButton ? 'button-review' : 'button-review-clicked'} role='button' onClick={(e) => {
                  setFiveStarButton(!fiveStarButton);
                }}>5 stars</button>
                </td>
                <td><ProgressBar bgcolor="#49516F" progress={Math.round(fiveStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className={!fourStarButton ? 'button-review' : 'button-review-clicked'} role='button' onClick={(e) => {
                  setFourStarButton(!fourStarButton);
                }}>4 stars</button></td>
                <td><ProgressBar bgcolor="#49516F" progress={Math.round(fourStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className={!threeStarButton ? 'button-review' : 'button-review-clicked'} role='button' onClick={(e) => {
                  setThreeStarButton(!threeStarButton);
                }}
                >3 stars</button></td>
                <td><ProgressBar bgcolor="#49516F" progress={Math.round(threeStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className={!twoStarButton ? 'button-review' : 'button-review-clicked'} role='button' onClick={(e) => {
                  setTwoStarButton(!twoStarButton);
                }}
                >2 stars</button></td>
                <td><ProgressBar bgcolor="#49516F" progress={Math.round(twoStar / denominator * 100)} /></td>
              </tr>
              <tr>
                <td><button className={!oneStarButton ? 'button-review' : 'button-review-clicked'} role='button' onClick={(e) => {
                  setOneStarButton(!oneStarButton);
                }}

                >1 star</button></td>
                <td><ProgressBar bgcolor="#49516F" progress={Math.round(oneStar / denominator * 100)} /></td>
              </tr>
            </tbody>
          </table>
          <div>
            <ProductBreakdown average={sizeFactor} characteristic={'Size'} />
          </div>
          {!sizeFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Too Small</td><td width='100' align='center'>Perfect</td><td width='100' align='right'>Too Large</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          <div>
            <ProductBreakdown average={widthFactor} characteristic={'Width'} />
          </div>
          {!widthFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Narrow</td><td width='100' align='center'>Perfect</td><td width='100' align='right'>Wide</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          <div>
          <div>
            <ProductBreakdown average={comfortFactor} characteristic={'Comfort'} />
          </div>
          {!comfortFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Poor</td><td width='100' align='center'></td><td width='100' align='right'>Perfect</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
            <ProductBreakdown average={qualityFactor} characteristic={'Quality'} />
          </div>
          {!qualityFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Poor</td><td width='100' align='center'></td><td width='100' align='right'>Perfect</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          <div>
            <ProductBreakdown average={lengthFactor} characteristic={'Length'} />
          </div>
          {!lengthFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Short</td><td width='100' align='center'>Perfect</td><td width='100' align='right'>Long</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
           <div>
            <ProductBreakdown average={fitFactor} characteristic={'Fit'} />
          </div>
          {!fitFactor ? <div></div> :
            <div>
              <table style={{ width: 300, marginLeft: 10 }}>
                <tbody>
                  <tr>
                    <td width='100' align='left'>Tight</td><td width='100' align='center'>Perfect</td><td width='100' align='right'>Loose</td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
        </div>

      }
    </div >
  )

}

export default Ratings;

