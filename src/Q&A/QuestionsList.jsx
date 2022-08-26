import React, { useState, useEffect } from 'react';
import CurrentQuestion from './CurrentQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx'
const axios = require('axios');

const QuestionsList = (props) => {
  const [questionData, setQuestionData] = useState([])

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + '/qa/questions')
      .then(response => {
        console.log('show questions please = ', response.data.results)
        setQuestionData(response.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  return (
    <div>
      <h3>Questions &amp; Answers</h3>
      <SearchQuestions />
      {questionData.map((question) => {
        return <CurrentQuestion key={question.question_id} question={question}/>
      })}
      <button className='questionButtons'>MORE ANSWERED QUESTIONS</button>
      <button className='questionButtons'>ADD A QUESTION +</button>
    </div>
  )
}

export default QuestionsList;