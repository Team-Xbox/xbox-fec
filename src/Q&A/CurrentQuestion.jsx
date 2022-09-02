import React, { useState, useEffect } from 'react';
import CurrentAnswer from './CurrentAnswer.jsx'
import '../../public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
const axios = require('axios');

const CurrentQuestion = (props) => {
  const [questionId, setQuestionId] = useState(props.question.question_id)
  const [page, setPage] = useState(1)
  const [displayedAnswerData, setDisplayedAnswerData] = useState([])
  const [nextAnswers, setNextAnswers] = useState([])
  const [question_helpfulness, setQuestionHelpfulness] = useState(props.question.question_helpfulness)
  const [open, setOpen] = useState(false)

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + `/answers/${questionId}/${page}/4`)
      .then(response => {
        const firstTwo = [];
        const rest = [];
        console.log("show answers data = ", response.data.results)
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

  const handleHelpfulQA = () => {
    const updatedCount = {question_helpfulness: props.question.question_helpfulness + 1}
    axios.put(url + `/helpfulQ/${questionId}`, updatedCount)
      .then(() => {
        setQuestionHelpfulness(updatedCount.question_helpfulness)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div data-testid="questionComp">
        <div className="questionSection">
          <div className="qaContainer">
            <p className="qaLabel">Q:</p>
            <p className="questionBody">{props.question.question_body}</p>
          </div>
          <aside>Helpful? <u onClick={handleHelpfulQA}>Yes</u> ({`${question_helpfulness}`}) | <u onClick={handleOpen}>Add Answer</u></aside>
        </div>
        <div className="qaContainer">
          {displayedAnswerData.length > 0 && <p className="qaLabel">A:</p>}
          <div className="answerWrapper">
            {displayedAnswerData.map((answer) => {
              return <CurrentAnswer key={answer.answer_id} answer={answer}/>
            })}
            {nextAnswers.length > 0 && <button className="moreAnswersButton" onClick={handleMoreAnswers}>LOAD MORE ANSWERS</button>}
          </div>
        </div>
      </div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div>
              <h3>Submit Your Answer</h3>
              <h4>{props.productName}: {props.question.question_body}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <h6>* Your Answer</h6>
              <textarea type="text" maxLength="1000"/>
            </form>
            <form>
              <h6>* Your Nickname</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jack543!"/>
              <p>For privacy reasons, do not use your full name or email address.</p>
            </form>
            <form>
              <h6>* Your Email</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jack@email.com"/>
              <p>For authentication reasons, you will not be emailed.</p>
            </form>
            <Button>Upload your photos</Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Submit Answer
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default CurrentQuestion;