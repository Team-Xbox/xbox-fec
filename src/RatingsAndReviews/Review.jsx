import React, { useState, useEffect } from 'react'
import FiveStars from './FiveStars.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import moment from 'moment'
const axios = require('axios');
import { Modal, Button, ButtonToolbar, Placeholder, Toggle } from 'rsuite';



const Review = ({ reviewData }) => {
  const [showYes, setShowYes] = useState(true);
  const [showNo, setShowNo] = useState(true);
  const [count, setCount] = useState(reviewData.helpfulness);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //console.log('this is the reviewData =', reviewData);
  var handleClickYes = function () {
    setShowYes(false);
    setShowNo(false);
    let expressUrl = 'http://localhost:1337'

    setCount(count + 1);
    axios.put(expressUrl + `/review/${reviewData.review_id}`)
      .then(response => console.log(response.status))
      .catch(err => console.log(err));
  }

  //console.log('reviewData at review =',reviewData)

  var handleClickNo = function () {
    setShowYes(false);
    setShowNo(false);
  }
  return (
    <div data-testid="review">
      {!reviewData ? <div></div> :
        <div className="main-review">
          <div className='top-review'>
            <FiveStars rating={reviewData.rating} />{reviewData.reviewer_name} {moment(reviewData.date).format('MMM DD, YYYY')}
          </div>
          <div className="summary-review">
            {reviewData.summary}
          </div>
          <div className='body-review'>
            {reviewData.body}
          </div>
          <div className='helpful-review'>
            Helpful?
            {!showYes ? <button>Yes</button> : <button className='button-underline' onClick={handleClickYes}>Yes</button>
            }
            ({count})
            {!showNo ? <button>No</button> : <button className='button-underline' onClick={handleClickNo}>No</button>
            }
            | Report
          </div>
          <div className='thumbnail-review'>
            {reviewData.photos.map((review, i) => (
              <div key={i}>
                <img className='thumbnail-src' onClick={handleOpen}  src={review.url}></img>
                <>
                  <Modal size={'lg'} open={open} onClose={handleClose}>
                    <Modal.Header>
                    </Modal.Header>
                    <Modal.Body>
                      <div>
                        <img src = {reviewData.photos[i].url}></img>
                      </div>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button onClick={handleClose} appearance="primary">
                        Close
                      </Button>
                    </Modal.Footer>
                  </Modal>
                </>
              </div>

            ))}
          </div>
          {reviewData.recommend ? <div className='thumbnail-response'>
            <span className="checkbox">&#10003;</span> I recommend this product!
          </div> : <div></div>
          }

          <div>
          </div>
        </div>
      }
    </div >
  )
}


export default Review;