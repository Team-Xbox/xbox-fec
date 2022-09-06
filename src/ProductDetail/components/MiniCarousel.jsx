import React, {useState, useEffect} from 'react';

const MiniCarousel = (props) => {
  let miniCounter = 0;

  return (
    <div id="mini-carousel">
      {props.styleData[props.photosIndex].photos.map((photo,i) =>
        <img className="mini-image" key = {i} data-index={miniCounter++}
          src={photo.url}
          width="60"
          height="60"
          onClick={(e) => { props.setIndex(e.target.getAttribute('data-index')) }}
        />
      )}
      <button className="minimize" onClick={() => props.setMinimized(!props.minimized)}> Expand </button>
    </div>
  )
}

export default MiniCarousel