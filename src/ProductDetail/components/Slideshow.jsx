import React, {useState, useEffect} from 'react';
import StyleSelector from '../components/Styles.jsx'
import MiniCarousel from '../components/MiniCarousel.jsx'
const axios = require('axios');

const Slideshow = (props) => {
  const [index, setIndex] = useState(0);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [minimized, setMinimized] = useState(true);

  return (
    <div id="slideshow">
      {!props.styleData[0] ? <div> This Item Does Not Exist </div> :
        <div id="main-images">
          <MiniCarousel styleData={props.styleData} photosIndex={photosIndex} setIndex={setIndex}/>
          <button className="minimize" onClick={() => setMinimized(!minimized)}> Expand </button>
          <button className="slideshow-btn-left"
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> Back
          </button>
          <img
            className="main-image"
            src={props.styleData[photosIndex].photos[index].url}
            style={{'max-width': minimized ? '367px' : 'fit-content'}}
          />
          <button className="slideshow-btn-right"
            onClick={() => { if (index < props.styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> Next
          </button>
        </div>
      }
      {!props.styleData[0] ? <div> Style Selector </div> :
        <StyleSelector styleData={props.styleData} productData={props.productData} setPhotosIndex={setPhotosIndex} setIndex={setIndex}
          photosIndex={photosIndex} index={index} minimized={minimized}
        />
      }
    </div>
  )
}

export default Slideshow