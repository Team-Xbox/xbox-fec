import React, {useState, useEffect} from 'react';
const axios = require('axios');

const StyleSelector = (props) => {
  // const [styleData, setStyleData] = useState({});
  // const [productData, setProductData] = useState({});
  // const [index, setIndex] = useState(0);
  // const [photosIndex, setPhotosIndex] = useState(0);
  // const [product_id, setProductId] = useState(66642);

  let styleCounter = 0;
  let miniCounter = 0;

  return (
    <div>
      {!props.styleData[0] ? <div> Style Selector </div> :
        <div id="style-div" style={{visibility: props.minimized ? 'visible' : 'hidden'}}>
          <div id="style-header">
            <h3 className="product-cat">Category: <em>{props.productData.category}</em></h3>
            <h2 className="product-title">{props.productData.name}</h2>
            <span className="product-price">${props.productData.default_price}</span>
          </div>
          <div id="style-selector">
            <h2 className="styles-title"> Style: <em>{props.styleData[props.photosIndex].name}</em> </h2>
            {props.styleData.map(style =>
              <img data-value={styleCounter++} className="style-image"
                src={style.photos[0].thumbnail_url} width="93" height="93"
                onClick={(e) => { props.setPhotosIndex(e.target.getAttribute('data-value'), props.setIndex(0)) }}
              />
            )}
          </div>
        </div>
      }
    </div>
  )
}

export default StyleSelector