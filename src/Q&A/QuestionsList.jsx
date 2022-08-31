import React, { useState, useEffect } from 'react';
import CurrentQuestion from './CurrentQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx'
const axios = require('axios');

const QuestionsList = (props) => {
  const [id, setId] = useState(66690)
  const [page, setPage] = useState(1)
  const [displayedQuestionData, setDisplayedQuestionData] = useState([])
  const [nextQuestions, setNextQuestions] = useState([])

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + `/questions/${id}/${page}/6`)
      .then(response => {
        const firstFour = [];
        const rest = [];
        response.data.results.forEach((el, index) => {
          if (index < 4) {
            firstFour.push(el);
          } else {
            rest.push(el);
          }
        })
        setDisplayedQuestionData(firstFour)
        setNextQuestions(rest)
        setPage(4)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleMoreQuestions = () => {
    setDisplayedQuestionData([... displayedQuestionData, ... nextQuestions])
    axios.get(url + `/questions/${id}/${page}/2`)
      .then(response => {
        setNextQuestions(response.data.results)
        setPage(page + 1)
      })
  }

  return (
    <div data-testid="qaList" className="qaListSection">
      <h3>Questions &amp; Answers</h3>
      <SearchQuestions />
      {displayedQuestionData.map((question) => {
        return <CurrentQuestion key={question.question_id} question={question}/>
      })}
      {nextQuestions.length > 0 && <button className='questionButtons' onClick={handleMoreQuestions}>MORE ANSWERED QUESTIONS</button>}
      <button className='questionButtons'>ADD A QUESTION +</button>
    </div>
  )
}

export default QuestionsList;