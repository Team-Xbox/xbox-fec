import React, { useState, useEffect } from 'react';
const axios = require('axios');
import moment from 'moment'

const CurrentAnswer = (props) => {
  const [answerId, setAnswerId] = useState(props.answer.answer_id)
  const [helpfulness, setHelpfulness] = useState(props.answer.helpfulness)

  let url = 'http://localhost:1337'

  const handleHelpfulAnswers = () => {
    const updatedCount = {helpfulness: props.answer.helpfulness + 1}
    axios.put(url + `/helpfulA/${answerId}`, updatedCount)
      .then(() => {
        setHelpfulness(updatedCount.helpfulness)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <div data-testid="answerComp" className="answerSection">
      <p className="answerBody">{props.answer.body}</p>
      <aside className="answerSideBody">by {props.answer.answerer_name}, {moment(props.answer.date).format('MMM, DD, YYYY')} | Helpful? <u onClick={handleHelpfulAnswers}>Yes</u> ({`${helpfulness}`}) | <u>Report</u></aside>
    </div>
  )
}

export default CurrentAnswer;