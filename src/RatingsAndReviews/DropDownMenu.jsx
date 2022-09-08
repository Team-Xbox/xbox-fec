import React from 'react'
import { useState, useEffect, useCallback  } from 'react'


const DropDownMenu = function ({parentCallback}) {
  const [sortOn, setSortOn] = useState('relevant');
  const [reviewData, setReviewData] = useState();

  return (
    <div data-testid="dropDownMenu">
      <select  className = 'select-dropdown'
        onChange={(e) => {
          const selectedMenuOption = e.target.value;
          setSortOn(selectedMenuOption);
        }} data-testid = 'dropdownmenu'>
        <option value='relevant'>Relevance</option>
        <option value='helpful'>Helpful</option>
        <option value='newest'>Newest</option>
      </select>
      {useEffect(()=> {
        parentCallback(sortOn)
      }, [sortOn])}
    </div>
  );
}

export default DropDownMenu;