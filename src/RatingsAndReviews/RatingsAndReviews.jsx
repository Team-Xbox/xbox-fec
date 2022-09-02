import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import Reviews from './Reviews.jsx'
import Ratings from './Ratings.jsx'
const axios = require('axios');

// ===============  Review Function

const RatingsAndReviews = (props) => {
  const [fiveStarButton, setFiveStarButton] = useState(false);
  const [fourStarButton, setFourStarButton] = useState(false);
  const [threeStarButton, setThreeStarButton] = useState(false);
  const [twoStarButton, setTwoStarButton] = useState(false);
  const [oneStarButton, setOneStarButton] = useState(false);
  const [ratings, setRatings] = useState([]);
  const [recommended, setRecommended] = useState({ false: null, true: null });
  const [characteristics, setCharacteristics] = useState(null);
  const callbackFive = useCallback((fiveStarButton) => { (setFiveStarButton(fiveStarButton)) }, []);
  const callbackFour = useCallback((fourStarButton) => { (setFourStarButton(fourStarButton)) }, []);
  const callbackThree = useCallback((threeStarButton) => { (setThreeStarButton(threeStarButton)) }, []);
  const callbackTwo = useCallback((twoStarButton) => { (setTwoStarButton(twoStarButton)) }, []);
  const callbackOne = useCallback((oneStarButton) => { (setOneStarButton(oneStarButton)) }, []);
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
        //console.log('response.data.ratings on ratingsandreviews =',response.data.recommended);
        setRecommended(response.data.recommended);
        setRatings(response.data.ratings);
        setCharacteristics(response.data.characteristics);
      })
      .catch(err => console.log(err))
  }, [JSON.stringify(ratings), JSON.stringify(recommended), JSON.stringify(characteristics)])

  return (
    <div>
      <div className='ratings-and-reviews-heading'>
        RATINGS & REVIEWS
      </div>
      <div className='ratings-and-reviews ratings'><Ratings characteristics={characteristics} ratings={ratings} recommended={recommended} parentCallbackFive={callbackFive} parentCallbackFour={callbackFour} parentCallbackThree={callbackThree} parentCallbackTwo={callbackTwo} parentCallbackOne={callbackOne}/></div>
      <div className='ratings-and-reviews reviews'><Reviews fiveStarButton = {fiveStarButton} fourStarButton = {fourStarButton} threeStarButton = {threeStarButton} twoStarButton = {twoStarButton} oneStarButton = {oneStarButton}/></div>
    </div>
  )
  //console.log('fiveStarButton on RatingsAndReviews =', fiveStarButton);
}

export default RatingsAndReviews;