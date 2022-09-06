import React, {useState, useEffect} from 'react';
const axios = require('axios');
import Slideshow from '../ProductDetail/components/Slideshow.jsx'
import Description from '../ProductDetail/components/Description.jsx'

const ProductDetail = (props) => {
  const [styleData, setStyleData] = useState({});
  const [productData, setProductData] = useState({});
  const [product_id, setProductId] = useState(66642);

  let expressUrl = 'http://localhost:1337';

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
    // .then(() => console.log('productdata', productData))
    // .then(() => console.log('styledata', styleData))
    .catch(err => console.log(err))

  }, [JSON.stringify(styleData), JSON.stringify(productData)]);

  return (
    <div>
      {!styleData[0] ? <div> This Item Does Not Exist </div> :
        <div id="product-detail">
          <Slideshow styleData={styleData} productData={productData}/>
          <Description styleData={styleData} productData={productData} features={productData.features}/>
        </div>
      }
    </div>
  )
}

export default ProductDetail;