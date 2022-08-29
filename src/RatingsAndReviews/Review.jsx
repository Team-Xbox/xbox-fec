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
  return (
    <div>
      {!reviewData ? <div></div> :
        <div className="main-review">
          <div className='top-review'>
            <StarRating reviewData={reviewData} />{reviewData.reviewer_name} {convertDate(reviewData.date)}
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
        </div>
      }
    </div>
  )
}


export default Review;