import React, { useState, useEffect } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import moment from 'moment'

const Review = ({reviewData}) => {
  return (
    <div>
      {!reviewData  ? <div></div> :
        <div className="main-review">
          <div className='top-review'>
            <StarRating rating={reviewData.rating} />{reviewData.reviewer_name} {moment(reviewData.date).format('MMM DD, YYYY')}
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
          </div>
        </div>
      }
    </div>
  )
}


export default Review;