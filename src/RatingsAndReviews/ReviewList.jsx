import React, { useState, useEffect } from 'react'
import Review from './Review.jsx'

const ReviewList = ({reviewData}) => {


  return (
    <div>


      {reviewData.map((review, i)=> (<Review key = {i} reviewData = {review}/>))}

    </div>
  )
}


export default ReviewList;