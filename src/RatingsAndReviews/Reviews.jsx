import React, { useState, useEffect, useCallback } from 'react'
import StarRating from './StarRating.jsx'
import StarRatingAddReview from './StarRatingAddReview.jsx'
import DropDownMenu from './DropDownMenu.jsx'
import ReviewList from './ReviewList.jsx'
import Sliders from './CharacteristicSliders.jsx'
import '../../public/styles.css';
import ImageWidget from './ImageWidget.jsx'
import { Modal, Button, ButtonToolbar, Placeholder, Toggle } from 'rsuite';
const axios = require('axios');

// Determining maximum reviews
var maxReviewAmount;

var currentReviewDataLength=2;

const ReviewsMax = () => {
  let expressUrl = 'http://localhost:1337'
  axios.get(expressUrl + '/reviews', {
    params: {
      count: 100
    }
  })
    .then(response => {
      //console.log('responseData results =', response.data.results);
      maxReviewAmount = response.data.results.length;
      //console.log('maxReviewAmount =', maxReviewAmount);
      return response.data.results;
    })
}
ReviewsMax();

var reviewBoxSortedOn = 'relevant';
// Main Reviews Function
const Reviews = ({ fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton }) => {
  const [sortOn, setSortOn] = useState('relevant');
  const [sorted, setSorted] = useState('false');
  const [count, setCount] = useState(2);
  const [showButton, setShowButton] = useState(true);
  const [page, setPage] = useState(1);
  const [starChange, setStarChange] = useState(false);
  const [reviewData, setReviewData] = useState([]);

  if(reviewBoxSortedOn !== sortOn) {
    setSorted(true);
    reviewBoxSortedOn = sortOn;
  }

useEffect(()=>{
  //console.log('hi from useEffect1');
  if (fiveStarButton || fourStarButton || threeStarButton || twoStarButton || oneStarButton) {
    //console.log('setting star change');
    setStarChange(true);
  }
},[fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton]);

  //console.log('reviewBoxSortedOn =',reviewBoxSortedOn);
  //console.log('starChange =', starChange);
  const callback = useCallback((sort) => {
    (setSortOn(sort));
  }, []);
  let expressUrl = 'http://localhost:1337'
  useEffect(() => {
    //console.log('hi from useEffect2');
    //console.log('sorted from the drop down menu =', sorted);
  //console.log('some stars to no stars aka starChange=', starChange);
  //console.log('is there a star button pressed =', (fiveStarButton || fourStarButton || threeStarButton || twoStarButton || oneStarButton));
    if (fiveStarButton || fourStarButton || threeStarButton || twoStarButton || oneStarButton) {
     //console.log('1A.) sorted', sorted);
      //console.log('sortOn', sortOn);
      //console.log('page', page);
      //console.log('reviewData.length', reviewData.length);
      //console.log('currentReviewDataLength', currentReviewDataLength);
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
      //console.log('sortOn =', sortOn);
      axios.get(expressUrl + '/reviews', {
        params: {
          sortOn: sortOn,
          count: maxReviewAmount
        }
      })
        .then(response => {
          var starArray = [];
          //console.log('axios get maxReviewAmount of the starValue =', response.data.results);
          for (var i = 0; i < response.data.results.length; i++) {
            if (trueArray.includes(response.data.results[i].rating)) {
              starArray.unshift(response.data.results[i]);
            }
          }
         //console.log('starArray =', starArray);
          setReviewData(starArray);

         // console.log('currentReviewDataLength', currentReviewDataLength);
          //console.log('axios get maxReviewAmount of the starValue =', response.data.results);
        })
    }
    else if (sorted || starChange) {

      //console.log('1.) sorted', sorted);
      //console.log('sortOn', sortOn);
      //console.log('page', page);
      //console.log('reviewData.length', reviewData.length);
      //console.log('currentReviewDataLength', currentReviewDataLength);
      axios.get(expressUrl + '/reviews', {
        params: {
          sortOn: sortOn,
          page: 1,
          count: 2*page || 2
        }
      })
        .then(response => {
          //console.log('axios get reviews reviewData.length =', response.data.results);
          var tempArray = response.data.results.reverse();
          setReviewData(tempArray);
          setSorted(false);
          setStarChange(false);
        })
        .catch(err => console.log(err))
    }
    else if ( !(fiveStarButton || fourStarButton || threeStarButton || twoStarButton || oneStarButton)) {
      //currentReviewDataLength = currentReviewDataLength + 2;
      //console.log('2.) sorted', sorted);
      //console.log('sortOn', sortOn);
      //console.log('reviewData.length', reviewData.length);
      //console.log('currentReviewDataLength', currentReviewDataLength);
      //console.log('page', page);

      axios.get(expressUrl + '/reviews', {
        params: {
          sortOn: reviewBoxSortedOn,
          page: page,
          count: 2
        }
      })
        .then(response => {
          //console.log('axios get reviews page sortOn count 2 =', response.data.results);
          return response.data.results;
        })
        .then(data => {
          if (reviewData.length === maxReviewAmount-1 ||reviewData.length === maxReviewAmount-2) {
            setShowButton(false);
          }
          var tempArray = data.concat(reviewData);
          setReviewData(tempArray);
          return reviewData;
        })
        .catch(err => console.log(err))
    }
  }, [sortOn, page, fiveStarButton, fourStarButton, threeStarButton, twoStarButton, oneStarButton])

  //Modal State
  const [open, setOpen] = useState(false);
  const handleOpen = () => { setOpen(true); handleProductName(); };
  const handleClose = () => setOpen(false);
  const [recommend, setRecommend] = useState(true);
  const [summary, setSummary] = useState('');
  const [body, setBody] = useState('');
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [charObject, setCharObject] = useState({});
  const [photoUrl, setPhoto] = useState('');
  const callbackSlider = useCallback((charObject) => { (setCharObject(charObject)) }, []);
  const [rating, setRating] = useState(0);
  const [product, setProduct] = useState('');
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
        "product_id": 66644,
        "rating": rating,
        "summary": summary,
        "body": body,
        "recommend": recommend,
        "name": nickname,
        "email": email,
        "photos": [photoUrl],
        "characteristics": charObject

      })
      .then((response) => { return console.log(response) })
      .catch((err) => (console.log(err)))

    handleClose();
  }

  var handleProductName = function (product_id) {
    let expressUrl = 'http://localhost:1337'
    product_id = 66644;
    axios.get(expressUrl + `/productname/${product_id}`)
      .then(response => {
        setProduct(response.data.name)
      })
      .catch(err => console.log(err));

  }

  var setStateOfPhoto = (newUrl) => {
    setPhoto(newUrl);
    var tempUrl = photoUrl;
    //console.log('setStateOfPhoto new photo url =', tempUrl);
  }


  return (
    <div data-testid="reviews" >
      <div className='reviews-total'>
        <div className='reviews-header'>
          <div className='count-and-dropdown-list-review'>{reviewData.length} reviews, sorted by </div>
          <div className='count-and-dropdown-list-review'> <DropDownMenu parentCallback={callback} /> </div>
        </div>
        <div className='review-list-reviews'><ReviewList sortOn={sortOn} reviewData={reviewData} /></div>
        <div className='buttons-reviews'>
          {!showButton ? <div></div> :
            <button className="button-review" role="button" onClick={() => {
              var temp = page;
              setPage(temp + 1);

            }}
            >More Reviews</button>
          }
          <>

            <button className="button-review" role="button" onClick={handleOpen}>Add A Review +</button>


            <Modal size={'lg'} open={open} onClose={handleClose}>
              <Modal.Header>
                <Modal.Title><h3>Create a Review for {product}</h3> </Modal.Title>
                <div></div>
              </Modal.Header>
              <Modal.Body>
                <div>
                  <table>
                    <tbody>
                      <tr>
                        <td width='150' height='50'>
                          <h5 >* Overall Rating</h5>
                        </td>
                        <td width='150'>
                          <div> (select a star rating)</div>
                        </td>
                        <td>
                          <StarRatingAddReview parentCallbackStar={callbackStar} />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td width='310' height='50'>
                            <h5>* Do you recommend this product?</h5>
                          </td>
                          <td>
                            <Toggle size="md" unCheckedChildren="No" checkedChildren="Yes" onChange={(value) => { setRecommend(value); }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div>
                    <table>
                      <tbody>
                        <tr>
                          <td height='40'>
                            <h5 >* Characteristics</h5>
                          </td>
                          <td>
                            (select the description that describes the characteristic for the {product})
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <Sliders parentCallbackSliders={callbackSlider} />

                  </div>
                  <div style={{ padding: 7 }}>
                    <h5>* Review Summary</h5>
                    <input type="text" id="summary-modal" placeholder="Enter your review summary here..." size='60' maxLength="60" onChange={(e) => {
                      setSummary(e.target.value);
                    }} />
                  </div>
                  <div style={{ padding: 7 }}>
                    <h5>* Review Body</h5>
                    <textarea rows="5" cols="100" name="description" minLength='50' maxLength='1000' placeholder="Enter your review details here..." onChange={(e) => {
                      setBody(e.target.value);
                    }}>
                    </textarea>
                  </div>
                  <div style={{ padding: 7 }}>
                    <h5>* Upload Photos</h5>
                    <table>
                      <tbody>
                        <tr>
                          <td>
                            <div>
                              <button
                                id="upload_widget"
                                className="cloudinary-button"
                                onClick={() => { ImageWidget(setStateOfPhoto = { setStateOfPhoto }) }}
                              >
                                Upload files
                              </button>
                            </div>
                          </td>
                          <td>
                            <div>
                              {photoUrl ? <img className='thumbnail-src' src={photoUrl} /> : <div></div>}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>

                    {/* <input type="text" id="photo-modal" placeholder="https://www.myhaikuclass.com/images/kitten.png" size='60' maxLength="200" onChange={(e) => {
                    setPhoto(e.target.value);
                  }} /> */}

                  </div>
                  <div style={{ padding: 7 }}>
                    <h5>* What is your nickname?</h5>
                    <input type="text" id="nickname-modal" placeholder="Example: jackson11!" size='60' maxLength="60" onChange={(e) => {
                      setNickname(e.target.value);
                    }} />
                    <div>For privacy reasons, do not use your full name or email address.</div>
                  </div>
                  <div style={{ padding: 7 }}>
                    <h5>* Your email</h5>
                    <input type="text" id="email-modal" placeholder="Example: jackson11@email.com" size='60' maxLength="60" onChange={(e) => {
                      setEmail(e.target.value);
                    }} />
                    <div>For authentication reasons, you will not be emailed.</div>
                  </div>
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
    </div>
  )
}

export default Reviews;