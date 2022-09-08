import React, { useState, useEffect } from 'react';
const axios = require('axios');
import moment from 'moment'

const CurrentAnswer = (props) => {
  const [answerId, setAnswerId] = useState(props.answer.answer_id)
  const [helpfulness, setHelpfulness] = useState(props.answer.helpfulness)
  const [answerMarkedHelpful, setAnswerMarkedHelpful] = useState(false)
  const [reported, setReported] = useState(false)

  let url = 'http://localhost:1337'

  const handleHelpfulAnswers = () => {
    const updatedCount = {helpfulness: props.answer.helpfulness + 1}
    axios.put(url + `/helpfulA/${answerId}`, updatedCount)
      .then(() => {
        setHelpfulness(updatedCount.helpfulness)
        setAnswerMarkedHelpful(true)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleAnswerReport = () => {
    const updateQReport = {reported: true}
    axios.put(url + `/reportanswer/${props.questionId}`, updateQReport)
    .then(() => {
      setReported(true)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <div data-testid="answerComp" className="answerSection">
      <p className="answerBody">{props.answer.body}</p>
      <div>
        {props.answer.photos.map((photo, index) => (<img className="answerThumbnail" key={index} src={photo.url}/>))}
      </div>
      <aside className="answerSideBody">by {props.answer.answerer_name === "Seller" ? <b>{props.answer.answerer_name}</b> : props.answer.answerer_name} | {moment(props.answer.date).format('MMM, DD, YYYY')} | Helpful? {answerMarkedHelpful ? <u className="qadisable">Yes</u> : <u className="qalink" onClick={handleHelpfulAnswers}>Yes</u>} ({`${helpfulness}`}) | { reported ? <em className="qadisable">Reported</em> : <u className="qalink" onClick={handleAnswerReport}>Report</u> }</aside>
    </div>
  )
}

export default CurrentAnswer;