import React, {useState, useEffect} from 'react';
import StyleSelector from '../components/Styles.jsx'
import MiniCarousel from '../components/MiniCarousel.jsx'
const axios = require('axios');

const Slideshow = (props) => {
  const [styleData, setStyleData] = useState({});
  const [productData, setProductData] = useState({});
  const [index, setIndex] = useState(0);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [product_id, setProductId] = useState(66642);
  const [minimized, setMinimized] = useState(true);

  let expressUrl = 'http://localhost:1337';
  let styleCounter = 0;
  let miniCounter = 0;

  useEffect(() => {
    axios.post(expressUrl + '/styles', {product: product_id})
    .then(response => {
      return response.data.results;
    })
    .then(data => {
      setStyleData(data);
    })
    .then(() => {
      return axios.post(expressUrl + '/product', {product: product_id})
    })
    .then(product => {
      return product.data;
    })
    .then(data => {
      setProductData(data);
    })
    .then(() => console.log('productdata', productData))
    .then(() => console.log('styledata', styleData))
    .catch(err => console.log(err))

  }, [JSON.stringify(styleData), JSON.stringify(productData)]);

  return (
    <div id="slideshow">
      {!styleData[0] ? <div> This Item Does Not Exist </div> :
        <div id="main-images">
          <MiniCarousel styleData={styleData} photosIndex={photosIndex} setIndex={setIndex}/>
          <button className="minimize" onClick={() => setMinimized(!minimized)}> Expand </button>
          <button className="slideshow-btn-left"
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> Back
          </button>
          <img
            className="main-image"
            src={styleData[photosIndex].photos[index].url}
          />
          <button className="slideshow-btn-right"
            onClick={() => { if (index < styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> Next
          </button>
        </div>
      }
      {!styleData[0] ? <div> Style Selector </div> :
        <StyleSelector styleData={styleData} productData={productData} setPhotosIndex={setPhotosIndex} setIndex={setIndex}
          photosIndex={photosIndex} index={index} minimized={minimized}
        />
      }
    </div>
  )
}

export default Slideshow