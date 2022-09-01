import React, {useState, useEffect} from 'react';

const Description = (props) => {

  return (
    <div id="description">
      <h2 className="slogan">{props.productData.slogan}</h2>
      <div id="desc">
        <p>{props.productData.description}</p>
      </div>
      {!props.productData.features ? <div>No Features For This Product</div> :
        <div id="features">
          {props.features.map(feature =>
            <p>{feature.feature}: {feature.value} </p>
          )}
        </div>
      }
    </div>
  )
}

export default Description