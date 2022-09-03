import React, { useState, useEffect } from 'react'
import Review from './Review.jsx'

const ReviewList = ({ sortOn, reviewData }) => {
  var arrayReviews = [];
  for (var i = reviewData.length-1; i >= 0; i--) {
    arrayReviews.push( <Review key = {i} reviewData = {reviewData[i]} />);
  }
  return (
    <div>
      {/* <div>
        {reviewData.map((review, i) => (<Review key={i} reviewData={review} />))}
      </div> */}
      <div>
        {arrayReviews}
      </div>
    </div>


  )
}


export default ReviewList;