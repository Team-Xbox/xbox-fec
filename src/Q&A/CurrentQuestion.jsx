import React, { useState, useEffect } from 'react';
const axios = require('axios');

const CurrentQuestion = (props) => {
  return (
    <div>
      Q: {props.question.question_body}
      by {props.question.asker_name}
    </div>
  )
}

export default CurrentQuestion;