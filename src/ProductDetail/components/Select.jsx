import React, {useState, useEffect} from 'react';

const Select = (props) => {
  const [dropValues, setDropValues] = useState([]);
  const [size, setSize] = useState('Select Size');
  const [quantity, setQuantity] = useState(null);
  const [quantityObj, setQuantityObj] = useState({});
  const [currentQ, setCurrentQ] = useState([]);
  const [text, setText] = useState('Add To Cart');

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
    <div>
      <select name="size" id="size-select" onChange={(e) => {
        if (e.target.value === 'Select Size') { setSize(e.target.value), setQuantity(null) }
        if (e.target.value !== 'Select Size') { setSize(e.target.value), setQuantity(1), setText('Add To Cart') }
        getQuantity(e.target.value)
      }}>
        {dropValues.map(data =>
          <option>{data.size}</option>
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
        <button className="add-cart" onClick={ () => setText('Added ✓') }>{text}</button>
      }
    </div>
  )
}

export default Select