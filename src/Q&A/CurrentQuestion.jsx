import React, { useState, useEffect } from 'react';
import CurrentAnswer from './CurrentAnswer.jsx'
const axios = require('axios');

const CurrentQuestion = (props) => {
  const [questionId, setQuestionId] = useState(props.question.question_id)
  const [page, setPage] = useState(1)
  const [displayedAnswerData, setDisplayedAnswerData] = useState([])
  const [nextAnswers, setNextAnswers] = useState([])

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + `/answers/${questionId}/${page}/4`)
      .then(response => {
        const firstTwo = [];
        const rest = [];
        response.data.results.forEach((el, index) => {
          if (index < 2) {
            firstTwo.push(el);
          } else {
            rest.push(el);
          }
        })
        setDisplayedAnswerData(firstTwo)
        setNextAnswers(rest)
        setPage(3)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleMoreAnswers = () => {
    setDisplayedAnswerData([... displayedAnswerData, ... nextAnswers])
    axios.get(url + `/answers/${questionId}/${page}/2`)
      .then(response => {
        setNextAnswers(response.data.results)
        setPage(page + 1)
      })
  }

  return (
    <div data-testid="questionComp">
      <div className="questionSection">
        <div className="qaContainer">
          <p className="qaLabel">Q:</p>
          <p className="questionBody">{props.question.question_body}</p>
        </div>
        <aside>Helpful? <u>Yes</u> ({`${props.question.question_helpfulness}`}) | <u>Add Answer</u></aside>
      </div>
      <div className="qaContainer">
        <p className="qaLabel">A:</p>
        <div className="answerWrapper">
          {displayedAnswerData.map((answer) => {
            return <CurrentAnswer key={answer.answer_id} answer={answer}/>
          })}
          {nextAnswers.length > 0 && <button className="moreAnswersButton" onClick={handleMoreAnswers}>LOAD MORE ANSWERS</button>}
        </div>
      </div>
    </div>
  )
}

export default CurrentQuestion;