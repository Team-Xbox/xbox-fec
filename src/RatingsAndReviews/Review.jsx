import React, { useState, useEffect } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'

// ===================  Helper Function to Convert the Date ==================================
var convertDate = function (isoDate) {
  var mydate = new Date(isoDate);
  var month = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"][mydate.getMonth()];
  var day = mydate.getDate()+1;
  return month + ' ' + day + ', ' + mydate.getFullYear();
}

const Review = ({reviewData}) => {
  //console.log('reviewData =', reviewData)
  //console.log('review rating value =',reviewData.rating)
  return (
    <div>
      {!reviewData  ? <div></div> :
        <div className="main-review">
          <div className='top-review'>
            <StarRating rating={reviewData.rating} />{reviewData.reviewer_name} {convertDate(reviewData.date)}
          </div>
          <div className="summary-review">
            {reviewData.summary}
          </div>
          <div className='body-review'>
            {reviewData.body}
          </div>
          <div className='helpful-review'>
            Helpful? Yes ({reviewData.helpfulness}) | Report
          </div>
          <div className = 'thumbnail-review'>
            {reviewData.photos.map((review, i)=> (<img className = 'thumbnail-src' key = {i} src = {review.url}></img>))}
          </div>
          <div className = 'thumbnail-response'>
            <span className="checkbox">&#10003;</span> I recommend this product!
          </div>
          <div>
          {/* {console.log(reviewData)} */}
          </div>
        </div>
      }
    </div>
  )
}


export default Review;