import React, { useState, useEffect } from 'react';
import CurrentQuestion from './CurrentQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import '../../public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
const axios = require('axios');

const QuestionsList = (props) => {
  const [id, setId] = useState(66644)
  const [productName, setProductName] = useState()
  const [page, setPage] = useState(1)
  const [displayedQuestionData, setDisplayedQuestionData] = useState([])
  const [nextQuestions, setNextQuestions] = useState([])
  const [databaseQuestions, setDatabaseQuestions] = useState([])
  const [open, setOpen] = useState(false)
  const [question, setQuestion] = useState("")
  const [nickname, setNickname] = useState("")
  const [email, setEmail] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [searchActivated, setSearchActivated] = useState(false)
  const [displayedSearchQuestions, setDisplayedSearchQuestions] = useState([])

  let url = 'http://localhost:1337'

  useEffect(() => {
    axios.get(url + `/productname/${id}`)
      .then(response => {
        console.log('show product id info = ', response.data)
        setProductName(response.data.name)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

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

  useEffect(() => {
    axios.get(url + `/questions/${id}/${page}/500`)
      .then(response => {
        setDatabaseQuestions(response.data.results)
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

  const handleQuestionChange = (event) => {
    setQuestion(event.target.value)
  }

  const handleNicknameChange = (event) => {
    setNickname(event.target.value)
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handleSearchChange = (event) => {
    const term = event.target.value
    setSearchTerm(term)

    if (term.length >= 3) {
      setSearchActivated(true)
      const filteredQuestions = databaseQuestions.filter((question) =>
        question.question_body.toLowerCase().includes(term.toLowerCase())
      )
      setDisplayedSearchQuestions(filteredQuestions)
    } else {
      setSearchActivated(false)
    }
  }

  const questionSubmit = (event) => {
    event.preventDefault();
    const newQuestion = {
      body: question,
      name: nickname,
      email: email,
      product_id: id
    }

    axios.post(url + '/addquestion', newQuestion)
    .then(response => {
      setQuestion("")
      setNickname("")
      setEmail("")
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div data-testid="qaList" className="qaListSection">
        <h3>Questions &amp; Answers</h3>
        <SearchQuestions searchTerm={searchTerm} handleSearchChange={handleSearchChange}/>
        <div className="qHeightContainer">
        { searchActivated ?
          displayedSearchQuestions.map((question) => {
            return <CurrentQuestion key={question.question_id} question={question} productName={productName}/>
          }) : displayedQuestionData.map((question) => {
          return <CurrentQuestion key={question.question_id} question={question} productName={productName}/>
        })}
        </div>
        {(nextQuestions.length > 0 && !searchActivated) && <button className='questionButtons' onClick={handleMoreQuestions}>MORE ANSWERED QUESTIONS</button>}
        <button className='questionButtons' onClick={handleOpen}>ADD A QUESTION +</button>
      </div>
      <Modal size="lg" open={open} onClose={handleClose}>
        <Modal.Header>
          <Modal.Title>
            <div>
              <h3>Ask Your Question</h3>
              <h4>About the {productName}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="question-form" onSubmit={questionSubmit}>
              <h6>* Your Question</h6>
              <textarea className="qaModalTextBox" type="text" maxLength="1000" value={question} onChange={handleQuestionChange}/>
              <h6>* Your Nickname</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jackson11!" value={nickname} onChange={handleNicknameChange}/>
              <p>For privacy reasons, do not use your full name or email address.</p>
              <h6>* Your Email</h6>
              <input size="40" type="text" maxLength="60" placeholder="Example: jackson11@email.com" value={email} onChange={handleEmailChange}/>
              <p>For authentication reasons, you will not be emailed.</p>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="question-form" onClick={handleClose} appearance="primary">
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