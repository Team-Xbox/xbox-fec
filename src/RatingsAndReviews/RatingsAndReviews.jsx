import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import Reviews from './Reviews.jsx'
import Ratings from './Ratings.jsx'
const axios = require('axios');

// ===============  Review Function

const RatingsAndReviews = (props) => {

  const [ratings, setRatings] = useState([]);
  let expressUrl = 'http://localhost:1337'

  useEffect(() => {
    //console.log('running in reviews...');
    axios.get(expressUrl + '/ratings', {
      // params: {
      //   sortOn: sortOn,
      //   count: count
      // }
    })
      .then(response => {
        //console.log('response at ratings and reviews =',response);
        //console.log('response.data.ratings on ratingsandreviews =',response.data.ratings);
        return response.data.ratings;
      })
      .then(data => {
        setRatings(data);
      })
      .catch(err => console.log(err))
  }, [JSON.stringify(ratings)])

  return (
    <div>
      <div className='ratings-and-reviews-heading'>
        RATINGS & REVIEWS
      </div>
      <div className='ratings-and-reviews ratings'><Ratings ratings = {ratings}/></div>
      <div className='ratings-and-reviews reviews'><Reviews /></div>
    </div>
  )
}

export default RatingsAndReviews;