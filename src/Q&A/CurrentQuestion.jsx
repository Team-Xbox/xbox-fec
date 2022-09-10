import React, { useState, useEffect } from 'react';
import CurrentAnswer from './CurrentAnswer.jsx';
import AnswerImageWidget from './AnswerImageWidget.jsx';
import '../../public/styles.css';
import { Modal, Button, ButtonToolbar, Placeholder, Uploader} from 'rsuite';
import moment from 'moment'
const axios = require('axios');

const CurrentQuestion = (props) => {
  const [questionId, setQuestionId] = useState(props.question.question_id)
  const [page, setPage] = useState(1)
  const [displayedAnswerData, setDisplayedAnswerData] = useState([])
  const [nextAnswers, setNextAnswers] = useState([])
  const [question_helpfulness, setQuestionHelpfulness] = useState(props.question.question_helpfulness)
  const [questionMarkedHelpful, setQuestionMarkedHelpful] = useState(false)
  const [open, setOpen] = useState(false)
  const [answerResponse, setAnswerResponse] = useState("")
  const [nicknameResponse, setNicknameResponse] = useState("")
  const [emailResponse, setEmailResponse] = useState("")
  var [answerPhotosUrl, setAnswerPhotosUrl] = useState("")

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

  const handleHelpfulQA = () => {
    const updatedCount = {question_helpfulness: props.question.question_helpfulness + 1}
    axios.put(url + `/helpfulQ/${questionId}`, updatedCount)
      .then(() => {
        setQuestionHelpfulness(updatedCount.question_helpfulness)
        setQuestionMarkedHelpful(true)
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

  const handleAnswerChange = (event) => {
    setAnswerResponse(event.target.value)
  }

  const handleNicknameResponseChange = (event) => {
    setNicknameResponse(event.target.value)
  }

  const handleEmailResponseChange = (event) => {
    setEmailResponse(event.target.value)
  }

  const answerSubmit = (event) => {
    event.preventDefault();
    const newAnswer = {
      body: answerResponse,
      name: nicknameResponse,
      email: emailResponse,
      photos: [answerPhotosUrl]
    }

    axios.post(url + `/addanswer/${questionId}`, newAnswer)
    .then(response => {
      const newestAnswer = {
        answerer_name: nicknameResponse,
        body: answerResponse,
        date: moment().format(),
        helpfulness: 0,
        photos: answerPhotosUrl ? [{url: answerPhotosUrl}] : []
      }

      setAnswerResponse("")
      setNicknameResponse("")
      setEmailResponse("")
      setAnswerPhotosUrl("")
      setOpen(false)
      setDisplayedAnswerData([... displayedAnswerData, newestAnswer])
    })
    .catch(err => {
      console.log(err)
    })
  }

  return (
    <>
      <div data-testid="questionComp">
        <div className="questionSection">
          <div className="qaContainer">
            <p className="qaLabel">Q:</p>
            <p className="questionBody">{props.question.question_body}</p>
          </div>
          <p className="qHelpfulContainer">Helpful? {questionMarkedHelpful ? <u className="qadisable">Yes</u> : <u className="qalink" onClick={handleHelpfulQA}>Yes</u>} ({`${question_helpfulness}`}) | <u className="qalink" onClick={handleOpen}>Add Answer</u></p>
        </div>
        <div className="answerContainer">
          {displayedAnswerData.length > 0 && <p className="qaLabel">A:</p>}
          <div className="answerWrapper">
            {displayedAnswerData.map((answer) => {
              return <CurrentAnswer key={answer.answer_id} answer={answer} questionId={questionId}/>
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
              <h4 className="qaModalTitle">{props.productName}: {props.question.question_body}</h4>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form id="answer-form" onSubmit={answerSubmit}>
              <h6><b className="qaAsterik">*</b> Your Answer</h6>
              <textarea required className="qaModalInput" type="text" rows="5" cols="50" maxLength="1000" value={answerResponse} onChange={handleAnswerChange}/>
              <h6><b className="qaAsterik">*</b> Your Nickname</h6>
              <input required className="qaModalInput" size="40" type="text" maxLength="60" placeholder="Example: jack543!" value={nicknameResponse} onChange={handleNicknameResponseChange}/>
              <p className="qaModalStatements">For privacy reasons, do not use your full name or email address.</p>
              <h6><b className="qaAsterik">*</b> Your Email</h6>
              <input required className="qaModalInput" size="40" type="text" maxLength="60" placeholder="Example: jack@email.com" value={emailResponse} onChange={handleEmailResponseChange}/>
              <p className="qaModalStatements">For authentication reasons, you will not be emailed.</p>
            </form>
            <button id="upload_widget" className="cloudinary-button" onClick={() => { AnswerImageWidget(setAnswerPhotosUrl = {setAnswerPhotosUrl}) }}>Upload Photo</button>
            <div>
              {answerPhotosUrl ? <img className="thumbnail-src" src={answerPhotosUrl}/> : <div></div>}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit" form="answer-form" appearance="primary">
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