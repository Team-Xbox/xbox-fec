import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import ReviewList from './ReviewList.jsx'
//import 'rsuite/dist/styles/rsuite-default.css'
import '/Users/adamblomberg/xbox-fec/public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
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
      console.log('trueArray = ', trueArray);
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

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className='count-and-dropdown-list-review'>{reviewData.length} reviews, sorted by </div>
      <div className='count-and-dropdown-list-review'> <DropDownMenu parentCallback={callback} /> </div>
      <div><ReviewList reviewData={reviewData} /></div>
      <div>
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

      <Modal open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>Add a Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>Hello World</div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Send
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