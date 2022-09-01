import React, { useState, useEffect } from 'react';
import CurrentQuestion from './CurrentQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import '../../public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
const axios = require('axios');

const QuestionsList = (props) => {
  const [id, setId] = useState(66690)
  const [page, setPage] = useState(1)
  const [displayedQuestionData, setDisplayedQuestionData] = useState([])
  const [nextQuestions, setNextQuestions] = useState([])
  const [open, setOpen] = useState(false)

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + `/questions/${id}/${page}/6`)
      .then(response => {
        console.log('show question data = ', response.data.results)
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

  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <>
      <div data-testid="qaList" className="qaListSection">
        <h3>Questions &amp; Answers</h3>
        <SearchQuestions />
        {displayedQuestionData.map((question) => {
          return <CurrentQuestion key={question.question_id} question={question}/>
        })}
        {nextQuestions.length > 0 && <button className='questionButtons' onClick={handleMoreQuestions}>MORE ANSWERED QUESTIONS</button>}
        <button className='questionButtons' onClick={handleOpen}>ADD A QUESTION +</button>
      </div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div>
              <h3>Ask Your Question</h3>
              <h4>About the Product</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form>
              <h6>* Your Question</h6>
              <textarea type="text" maxLength="1000"/>
            </form>
            <form>
              <h6>* Your Nickname</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jackson11!"/>
              <p>For privacy reasons, do not use your full name or email address.</p>
            </form>
            <form>
              <h6>* Your Email</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jackson11@email.com"/>
              <p>For authentication reasons, you will not be emailed.</p>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose} appearance="primary">
            Submit Question
          </Button>
          <Button onClick={handleClose} appearance="subtle">
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default QuestionsList;