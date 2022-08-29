import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
//import DropDownMenu from './DropDownMenu.jsx'
import ReviewList from './ReviewList.jsx'
const axios = require('axios');

const DropDownMenu = function ({parentCallback}) {
  const [sortOn, setSortOn] = useState('relevant');
  return (
    <div>
      <select
        onChange={(e) => {
          const selectedMenuOption = e.target.value;
          setSortOn(selectedMenuOption);
        }}>
        <option value='relevant'>Relevance</option>
        <option value='helpful'>Helpful</option>
        <option value='newest'>Newest</option>
      </select>
      {useEffect(()=> {
        parentCallback(sortOn)
      }, [sortOn])}
    </div>
  );
}

const Reviews = (props) => {
  const [sortOn, setSortOn] = useState('relevant');
  const callback = useCallback((sortOn)=> {(setSortOn(sortOn))},[]);

  const [reviewData, setReviewData] = useState([]);
  let expressUrl = 'http://localhost:1337'

  useEffect(() => {
    console.log('running in reviews...');
    axios.get(expressUrl + '/reviews', {
      params: {
        sortOn: sortOn,
        count: 5
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
  }, [JSON.stringify(reviewData), sortOn])

  return (
    <div>
      <div> {console.log('sortOn from Reviews', sortOn)}{reviewData.length} reviews, sorted by<DropDownMenu parentCallback = {callback} /></div>
      <div><ReviewList reviewData={reviewData} /></div>
    </div>
  )
}

export default Reviews;