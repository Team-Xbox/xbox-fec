import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import StarRatingAddReview from './StarRatingAddReview.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import ReviewList from './ReviewList.jsx'
import Sliders from './CharacteristicSliders.jsx'
//import 'rsuite/dist/styles/rsuite-default.css'
import '/Users/adamblomberg/xbox-fec/public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder, Toggle } from 'rsuite';
const axios = require('axios');


var maxReviewAmount;

const ReviewsMax = () => {
  let expressUrl = 'http://localhost:1337'
  axios.get(expressUrl + '/reviews', {
    params: {
      count: 1000
    }
  })
    .then(response => {
      maxReviewAmount = response.data.results.length;
      return response.data.results;
    })
}
ReviewsMax();
// ===============  Review Function

const Reviews = ({ fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton }) => {
  //console.log('star buttons from reviews = ', fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton);
  const [sortOn, setSortOn] = useState('relevant');
  const [count, setCount] = useState(2);
  const [showButton, setShowButton] = useState(true);
  const callback = useCallback((sortOn) => { (setSortOn(sortOn)) }, []);
  //constant for filter display data
  // array of objects (each review)
  // conditionally making it so that

  const [reviewData, setReviewData] = useState([]);
  let expressUrl = 'http://localhost:1337'

  useEffect(() => {
    //console.log('running in reviews...');

    if (fiveStarButton || fourStarButton || threeStarButton || twoStarButton || oneStarButton) {
      //setReviewData([]);
      var trueArray = [];
      if (fiveStarButton) {
        trueArray.push(5);
      }
      if (fourStarButton) {
        trueArray.push(4);
      }
      if (threeStarButton) {
        trueArray.push(3);
      }
      if (twoStarButton) {
        trueArray.push(2);
      }
      if (oneStarButton) {
        trueArray.push(1);
      }
      //console.log('trueArray = ', trueArray);
      axios.get(expressUrl + '/reviews', {
        params: {
          sortOn: sortOn,
          count: maxReviewAmount
        }
      })
        .then(response => {
          var starArray = [];
          for (var i = 0; i < response.data.results.length; i++) {
            if (trueArray.includes(response.data.results[i].rating)) {
              starArray.push(response.data.results[i]);
            }
          }

          setReviewData(starArray);
        })
    }
    else {
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
          if (data.length === maxReviewAmount) {
            setShowButton(false);
          }
          setReviewData(data);
          return reviewData;
        })
        .catch(err => console.log(err))
    }
  }, [JSON.stringify(reviewData), sortOn, count, fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton])
  // console.log(count);

  //=====================  State for Modal ====================

  const [open, setOpen] = useState(false); //modal opem state
  const handleOpen = () => setOpen(true); //modal open function
  const handleClose = () => setOpen(false); //modal close function
  const [recommend, setRecommend] = useState(true); //modal toggle state
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [charObject, setCharObject] = useState({});
  const [photoUrl, setPhoto] = useState('');
  const callbackSlider = useCallback((charObject) => { (setCharObject(charObject)) }, []);
  const [rating, setRating] = useState(0);
  const callbackStar = useCallback((rating) => { (setRating(rating)) }, []);
  var postData = function () {
    let expressUrl = 'http://localhost:1337'
    console.log('recommend = ', recommend);
    console.log('summary =', summary);
    console.log('body =', body);
    console.log('nickname =', nickname);
    console.log('email =', email);
    console.log('characteristics object =', charObject);
    console.log('data is being posted');

    axios.post(expressUrl + '/reviews',
      {
        "product_id": 66642,
        "rating": rating,
        "summary": summary,
        "body": body,
        "recommend": recommend,
        "name": nickname,
        "email": email,
        "photos": [photoUrl],
        "characteristics": charObject

      })
      .then((response)=>{return console.log(response)})
      .catch((err)=>(console.log(err)))

    handleClose();
  }

  return (
    <div>
      <div className='count-and-dropdown-list-review'>{reviewData.length} reviews, sorted by </div>
      <div className='count-and-dropdown-list-review'> <DropDownMenu parentCallback={callback} /> </div>
      <div><ReviewList reviewData={reviewData} /></div>
      <div className='buttons-reviews'>
        {!showButton ? <div></div> :
          <button className="button-review" role="button" onClick={() => {
            var temp = count;
            setCount(temp + 2);
          }}
          >More Reviews</button>
        }

        <>
          <ButtonToolbar>
            <Button className="button-review" role="button" onClick={handleOpen}>Add A Review +</Button>
          </ButtonToolbar>

          <Modal size={'lg'} open={open} onClose={handleClose}>
            <Modal.Header>
              <Modal.Title>Create Review</Modal.Title>
              <div></div>
            </Modal.Header>
            <Modal.Body>
              <div>
                <div>
                  Overall Rating
                  <StarRatingAddReview parentCallbackStar={callbackStar} />
                </div>
                <div>
                  Do you recommend this product?
                  <Toggle size="md" unCheckedChildren="No" checkedChildren="Yes" onChange={(value) => { setRecommend(value); }} />
                </div>
                <div>Characteristics
                  <Sliders parentCallbackSliders={callbackSlider} />
                </div>
                <div>Review Summary
                  <input type="text" id="summary-modal" placeholder="Enter your review summary here..." size='60' maxLength="60" onChange={(e) => {
                    setSummary(e.target.value);
                  }} />
                </div>
                <div>
                  <label>Review Body</label>
                  <textarea rows="5" cols="60" name="description" minLength='50' maxLength='1000' defaultValue="Enter your review details here..." onChange={(e) => {
                    setBody(e.target.value);
                  }}>
                  </textarea>
                </div>
                <div>Photo URL</div>
                <input type="text" id="photo-modal" placeholder="https://www.myhaikuclass.com/images/kitten.png" size='60' maxLength="200" onChange={(e) => {
                  setPhoto(e.target.value);
                }} />
                <div>What is your nickname?</div>
                <input type="text" id="nickname-modal" placeholder="Example: jackson11!" size='60' maxLength="60" onChange={(e) => {
                  setNickname(e.target.value);
                }} />
                For privacy reasons, do not use your full name or email address.
                <div>Your email</div>
                <input type="text" id="email-modal" placeholder="Example: jackson11@email.com" size='60' maxLength="60" onChange={(e) => {
                  setEmail(e.target.value);
                }} />
                For authentication reasons, you will not be emailed.
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={postData} appearance="primary">
                Submit Review
              </Button>
              <Button onClick={handleClose} appearance="subtle">
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      </div>
    </div>
  )
}

export default Reviews;