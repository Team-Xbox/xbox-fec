import React, {useState, useEffect} from 'react';

const Select = (props) => {
  const [dropValues, setDropValues] = useState([]);
  const [size, setSize] = useState('Select Size');
  const [quantity, setQuantity] = useState(null);
  const [quantityObj, setQuantityObj] = useState({});
  const [currentQ, setCurrentQ] = useState([]);
  const [addCartText, setAddCartText] = useState('Add To Cart');
  const [star, setStar] = useState('☆');

  useEffect(() => {
    let temp = [{size: 'Select Size', quantity: 'Quantity'}];
    let tempObj = {}

    for (let sku in props.skus) {
      temp.push(props.skus[sku]);

      if (props.skus[sku].quantity > 15) {
        tempObj[props.skus[sku].size] = 15;
      } else {
        tempObj[props.skus[sku].size] = props.skus[sku].quantity;
      }
    }

    setDropValues(temp);
    setQuantityObj(tempObj)
  }, [JSON.stringify(props.skus)])

  const getQuantity = (size) => {
    setCurrentQ([...Array(quantityObj[size] + 1).keys()].slice(1));
  }

  return (
    <div id="select">
      <select name="size" id="size-select" onChange={(e) => {
        if (e.target.value === 'Select Size') { setSize(e.target.value), setQuantity(null) }
        if (e.target.value !== 'Select Size') { setSize(e.target.value), setQuantity(1), setAddCartText('Add To Cart') }
        getQuantity(e.target.value)
      }}>
        {dropValues.map((data, i) =>
          <option key = {i}>{data.size}</option>
        )}
      </select>
      {size === 'Select Size' ? <select id="quantity-select"><option> - </option></select> :
      <select name="quantity" id="quantity-select" onChange={(e) => { setQuantity(e.target.value) }}>
        {currentQ.map(num =>
          <option>{num}</option>
        )}
      </select>
      }
      {quantity === null ?
        <button className="add-cart" style={{color: 'gray'}}>Add To Cart</button> :
        <button className="add-cart" onClick={ () => setAddCartText('Added ✓') }>{addCartText}</button>
      }
      <button className="favorite" onClick={() => {if (star === '☆') { setStar('★') } else { setStar('☆') } }}>{star}</button>
    </div>
  )
}

export default Select