import React, {useState, useEffect} from 'react';
const axios = require('axios');

const Slideshow = (props) => {
  const [styleData, setStyleData] = useState({});
  const [productData, setProductData] = useState({});
  const [index, setIndex] = useState(0);
  const [photosIndex, setPhotosIndex] = useState(0);
  const [product_id, setProductId] = useState(66642);

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
          <div id="mini-carousel">
            {styleData[photosIndex].photos.map(photo =>
              <img className="mini-image" data-index={miniCounter++}
                src={photo.url}
                width="60"
                height="60"
                onClick={(e) => { setIndex(e.target.getAttribute('data-index')) }}
              />
            )}
          </div>
          <button className="slideshow-btn-left"
            onClick={() => { if (index > 0) { setIndex(index - 1) } }}> Back
          </button>
          <img
            className="main-image"
            src={styleData[photosIndex].photos[index].url}
            height='550'
          />
          <button className="slideshow-btn-right"
            onClick={() => { if (index < styleData[photosIndex].photos.length - 1) { setIndex(index + 1) } }}> Next
          </button>
        </div>
      }
      {!styleData[0] ? <div> Style Selector </div> :
        <div id="style-div">
          <div id="style-header">
            <h2 className="styles-title">{productData.name}</h2>
          </div>
          <div id="style-selector">
            <h2 className="styles-title"> Style: <em>{styleData[photosIndex].name}</em> </h2>
            {styleData.map(style =>
              <img data-value={styleCounter++} className="style-image"
                src={style.photos[0].thumbnail_url} width="93" height="93"
                onClick={(e) => { setPhotosIndex(e.target.getAttribute('data-value'), setIndex(0)) }}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default Slideshow