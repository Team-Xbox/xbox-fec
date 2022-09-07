import React, { useState, useEffect } from 'react';
import '../../public/styles.css';
import { Input, InputGroup } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';

const styles = {
  width: 908
}

const SearchQuestions = (props) => {
  return (
    <div data-testid="searchComp" className="searchInput">
      <InputGroup inside style={styles} value={props.searchTerm} onChange={props.handleSearchChange}>
        <Input type="text" placeholder="HAVE A QUESTION? SEARCH FOR ANSWERS..."/>
        <InputGroup.Addon>
          <SearchIcon />
        </InputGroup.Addon>
      </InputGroup>
    </div>
  )
}

export default SearchQuestions;