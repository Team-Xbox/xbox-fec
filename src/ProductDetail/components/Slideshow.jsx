import React, {useState, useEffect} from 'react';
import StyleSelector from '../components/Styles.jsx'
import MiniCarousel from '../components/MiniCarousel.jsx'
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.css';
const axios = require('axios');

const Slideshow = (props) => {
  const [index, setIndex] = useState(0);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [minimized, setMinimized] = useState(true);
  const [skuData, setSkuData] = useState([props.styleData[photosIndex].skus]);

  return (
    <div id="slideshow">
      {!props.styleData[0] ? <div> This Item Does Not Exist </div> :
        <div id="main-images">
          {console.log('styledata:', props.styleData)}
          <MiniCarousel styleData={props.styleData} photosIndex={photosIndex} setIndex={setIndex} index={index}
            minimized={minimized} setMinimized={setMinimized}
          />
          <button className="slideshow-btn-left" style={{visibility: index <= 0 ? 'hidden' : ''}}
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> ◀︎
          </button>
          <div style={{display: minimized ? 'none' : ''}}>
            <InnerImageZoom
              imgAttributes={{objectFit: 'cover'}}
              className="zoom-image"
              src={props.styleData[photosIndex].photos[index].url}
              width={500}
              height={550}
              zoomType="click"
              zoomScale={2.5}
              hideHint={true}
              hasSpacer={true}
            />
          </div>
          <img
            className="main-image"
            src={props.styleData[photosIndex].photos[index].url}
            style={{'maxWidth': minimized ? '367px' : 'fit-content', display: minimized ? '' : 'none'}}
            onClick={() => setMinimized(false)}
          />
          <button
            className="slideshow-btn-right"
            style={{visibility: index >= props.styleData[photosIndex].photos.length - 1 ? 'hidden' : ''}}
            onClick={() => { if (index < props.styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> ▶︎
          </button>
        </div>
      }
      {!props.styleData[0] ? <div> Style Selector </div> :
        <StyleSelector styleData={props.styleData} productData={props.productData} setPhotosIndex={setPhotosIndex} setIndex={setIndex}
          photosIndex={photosIndex} index={index} minimized={minimized} skuData={props.styleData[photosIndex].skus}
        />
      }
    </div>
  )
}

export default Slideshow