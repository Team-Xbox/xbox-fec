import React, { useState, useEffect } from 'react';

const SearchQuestions = (props) => {
  return (
    <div data-testid="searchComp">
      <input className='searchInput' type='text' placeholder='HAVE A QUESTION? SEARCH FOR ANSWERS...'/>
    </div>
  )
}

export default SearchQuestions;