import React, {useState, useEffect} from 'react';

const MiniCarousel = (props) => {
  const [miniCounter, setMiniCounter] = useState(0);

  return (
    <div id="mini-carousel">

      {props.styleData[props.photosIndex].photos.map((photo, index) =>
        <img className="mini-image" data-index={index}

          src={photo.url}
          width="60"
          height="60"
          onClick={(e) => { props.setIndex(Number(e.target.getAttribute('data-index'))), setMiniCounter(index) }}
          style={{border: index === props.index ? 'white solid 2px' : ''}}
        />
      )}
      <button
        className="minimize"
        onClick={() => { props.setMinimized(!props.minimized)} }
        style={{color: !props.minimized ? 'white' : '', border: !props.minimized ? 'white solid 2px' : ''}}
        > {!props.minimized ? 'Minimize' : 'Expand'} </button>
    </div>
  )
}

export default MiniCarousel