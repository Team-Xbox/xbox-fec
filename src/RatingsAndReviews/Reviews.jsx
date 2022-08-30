import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import ReviewList from './ReviewList.jsx'
const axios = require('axios');

// ===============  Review Function

const Reviews = (props) => {
  const [sortOn, setSortOn] = useState('relevant');
  const [count, setCount] = useState(2);
  const callback = useCallback((sortOn) => { (setSortOn(sortOn)) }, []);

  const [reviewData, setReviewData] = useState([]);
  let expressUrl = 'http://localhost:1337'

  useEffect(() => {
    //console.log('running in reviews...');
    axios.get(expressUrl + '/reviews', {
      params: {
        sortOn: sortOn,
        count: count
      }
    })
      .then(response => {
        return response.data.results;
      })
      .then(data => {
        setReviewData(data);
        return reviewData;
      })
      .catch(err => console.log(err))
  }, [JSON.stringify(reviewData), sortOn, count])
  // console.log(count);

  return (
    <div>
      <div className='count-and-dropdown-list-review'>{reviewData.length} reviews, sorted by </div>
      <div className='count-and-dropdown-list-review'> <DropDownMenu parentCallback={callback} /> </div>
      <div><ReviewList reviewData={reviewData} /></div>
      <div>
        <button className="button-review" role="button" onClick = {() => {
          console.log(count);
          if (count === 2) {
            setCount(5);
          } else {
            setCount(2);
          }
        }}
        >More Reviews</button>
        <button className="button-review" role="button">Add A Review +</button>
      </div>
    </div>
  )
}

export default Reviews;