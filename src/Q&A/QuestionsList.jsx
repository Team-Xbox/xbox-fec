import React, { useState, useEffect } from 'react';
import CurrentQuestion from './CurrentQuestion.jsx';
import SearchQuestions from './SearchQuestions.jsx';
import '../../public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder } from 'rsuite';
const axios = require('axios');

const QuestionsList = (props) => {
  const [nameId, setNameId] = useState(66644)
  const [id, setId] = useState(66690)
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
    axios.get(`/productname/${nameId}`)
      .then(response => {
        setProductName(response.data.name)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  useEffect(() => {
    axios.get(`/questions/${id}/${page}/6`)
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

  useEffect(() => {
    axios.get(`/questions/${id}/${page}/500`)
      .then(response => {
        setDatabaseQuestions(response.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleMoreQuestions = () => {
    setDisplayedQuestionData([... displayedQuestionData, ... nextQuestions])
    axios.get(`/questions/${id}/${page}/2`)
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

    axios.post('/addquestion', newQuestion)
    .then(response => {
      setQuestion("")
      setNickname("")
      setEmail("")
      setOpen(false)
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div data-testid="qaList" className="qaListSection">
        <h3 className="qaTitle">Questions &amp; Answers</h3>
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
              <h4 className="qaModalTitle">About the {productName}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="question-form" onSubmit={questionSubmit}>
              <h6><b className="qaAsterik">*</b> Your Question</h6>
              <textarea required className="qaModalInput" type="text" rows="5" cols="50" maxLength="1000" value={question} onChange={handleQuestionChange}/>
              <h6><b className="qaAsterik">*</b> Your Nickname</h6>
              <input required className="qaModalInput" size="40" type="text" maxLength="60" placeholder="Example: jackson11!" value={nickname} onChange={handleNicknameChange}/>
              <p className="qaModalStatements">For privacy reasons, do not use your full name or email address.</p>
              <h6><b className="qaAsterik">*</b> Your Email</h6>
              <input required className="qaModalInput" size="40" type="text" maxLength="60" placeholder="Example: jackson11@email.com" value={email} onChange={handleEmailChange}/>
              <p className="qaModalStatements">For authentication reasons, you will not be emailed.</p>
            </form>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="question-form" appearance="primary">
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