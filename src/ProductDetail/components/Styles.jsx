import React, {useState, useEffect} from 'react';
import Select from '../components/Select.jsx'

const StyleSelector = (props) => {

  let styleCounter = 0;

  return (
    <div>
      {!props.styleData[0] ? <div> Style Selector </div> :
        <div id="style-div" style={{display: props.minimized ? 'block' : 'none'}}>
          <div id="style-header">
            <h3 className="product-cat">Category: <em>{props.productData.category}</em></h3>
            <h2 className="product-title">{props.productData.name}</h2>
            <div className="product-price">
              <span
                style={{
                  textDecoration: props.styleData[props.photosIndex].sale_price ? 'line-through' : 'none',
                  color: props.styleData[props.photosIndex].sale_price ? 'red' : ''
                }}
                >${props.styleData[props.photosIndex].original_price}
              </span> <span
                style={{
                  display: props.styleData[props.photosIndex].sale_price ? 'inline' : 'none'
                }}
                >{props.styleData[props.photosIndex].sale_price}
              </span>
            </div>
          </div>
          <div id="style-selector">
            <h2 className="styles-title"> Style: <em>{props.styleData[props.photosIndex].name}</em> </h2>

            {props.styleData.map((style, index) =>
            <div class="check-selector">
              <p class="check"> {props.photosIndex === index ? '✓' : null} </p>
              <img data-value={index} className="style-image"

                src={style.photos[0].thumbnail_url} width="93" height="93"
                onClick={(e) => { props.setPhotosIndex(Number(e.target.getAttribute('data-value'))) }}
                style={{border: props.photosIndex === index ? 'white solid 2px' : ''}}
              />
            </div>
            )}
          </div>
          <Select styleData={props.styleData} skus={props.skuData}/>
        </div>
      }
    </div>
  )
}

export default StyleSelector