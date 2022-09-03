import React, {useState, useEffect} from 'react';

const MiniCarousel = (props) => {
  let miniCounter = 0;

  return (
    <div id="mini-carousel">
      {props.styleData[props.photosIndex].photos.map(photo =>
        <img className="mini-image" data-index={miniCounter++}
          src={photo.url}
          width="60"
          height="60"
          onClick={(e) => { props.setIndex(e.target.getAttribute('data-index')) }}
        />
      )}
    </div>
  )
}

export default MiniCarousel