import React, { useState, useEffect } from 'react';
const axios = require('axios');

const CurrentQuestion = (props) => {
  return (
    <div>
      <div className='questionSection'>
        <p>Q: {props.question.question_body}</p>
        <aside>Helpful? <u>Yes</u> ({`${props.question.question_helpfulness}`}) | <u>Add Answer</u></aside>
      </div>
    </div>
  )
}

export default CurrentQuestion;