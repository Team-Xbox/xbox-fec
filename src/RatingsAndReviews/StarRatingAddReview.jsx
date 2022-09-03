import React from 'react'
import { useState, useEffect } from 'react'

const StarRatingAddReview = ({parentCallbackStar}) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
            onClick={() => {
              console.log('onclick index = ', index)
              return (setRating(index))
            }
            }
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
            onDoubleClick={() => {
              setRating(0);
              setHover(0);
            }}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
      {useEffect(() => {
        parentCallbackStar(rating);
      }, [rating])}
    </div>
  );
};

export default StarRatingAddReview;