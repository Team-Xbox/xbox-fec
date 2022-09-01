import React, {useState, useEffect} from 'react';

const Select = (props) => {
  return (
    <div>
      <select>
        <option>{console.log('skudata:', props.skus)}</option>
      </select>
    </div>
  )
}

export default Select