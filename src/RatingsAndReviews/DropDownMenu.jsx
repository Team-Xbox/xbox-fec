import React from 'react'
import { useState } from 'react'

const DropDownMenu = function () {
  const [sortOn, setSortOn] = useState();
  return (
    <div>
      <select
        onChange={(e) => {
      const selectedMenuOption = e.target.value;
          setSortOn(selectedMenuOption);
        }}>
          <option value = 'relevance'>Relevance</option>
          <option value = 'helpful'>Helpful</option>
          <option value = 'newest'>Newest</option>
      </select>
      {console.log(sortOn)}
    </div>
  );
}

export default DropDownMenu;