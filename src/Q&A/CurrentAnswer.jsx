import React, { useState, useEffect } from 'react';
const axios = require('axios');
import moment from 'moment'

const CurrentAnswer = (props) => {
  return (
    <div data-testid="answerComp" className="answerSection">
      <p className="answerBody">{props.answer.body}</p>
      <aside className="answerSideBody">by {props.answer.answerer_name}, {moment(props.answer.date).format('MMM, DD, YYYY')} | Helpful? <u>Yes</u> ({`${props.answer.helpfulness}`}) | <u>Report</u></aside>
    </div>
  )
}

export default CurrentAnswer;