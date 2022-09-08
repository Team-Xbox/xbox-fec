import React from 'react'
import { useState, useEffect } from 'react'
import '../../public/styles.css';
import {Rate} from 'rsuite';

const StarRating = (props) => {
  return (
    <div data-testid="star">
      <div className="star-rating">
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              className={index <= props.rating ? "on" : "off"}
            >
              <span className="star">&#9733;</span>
            </button>
          );
        })}
      </div>
    </div>
  )
};

  //   return (
  //   <>
  //     <Rate readOnly defaultValue={props.rating} size='sm'/>
  //   </>
  // )};

export default StarRating;