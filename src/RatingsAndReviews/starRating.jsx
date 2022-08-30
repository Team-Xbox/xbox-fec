import React from 'react'
import { useState, useEffect } from 'react'

const StarRating = (props) => {
  const [rating, setRating] = useState(0);
  useEffect(() => {
    //console.log('StarRating input =',props.rating);
    setRating(props.rating);
  }, [rating]);
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= rating ? "on" : "off"}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;