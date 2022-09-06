import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import CurrentAnswer from '../src/Q&A/CurrentAnswer.jsx';
import CurrentQuestion from '../src/Q&A/CurrentQuestion.jsx';
import QuestionsList from '../src/Q&A/QuestionsList.jsx';
import SearchQuestions from '../src/Q&A/SearchQuestions.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//Yari
describe('', function() {

});

//Selina
describe('Q&A', () => {
  describe('<CurrentAnswer />', () => {
    it('should render CurrentAnswer component', () => {
      render(<CurrentAnswer answer={{body: "Peanut brittle is yummy"}}/>);
      const listElement = screen.getByTestId('answerComp');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<CurrentQuestion />', () => {
    it('should render CurrentQuestion component', () => {
      render(<CurrentQuestion question={{question_body: "What sizes are available?"}}/>);
      const listElement = screen.getByTestId('questionComp');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<QuestionList />', () => {
    it('should render QuestionsList component', () => {
      render(<QuestionsList/>);
      const listElement = screen.getByTestId('qaList');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<SearchQuestions />', () => {
    it('should render SearchQuestions component', () => {
      render(<SearchQuestions/>);
      const listElement = screen.getByTestId('searchComp');
      expect(listElement).toBeInTheDocument();
    })
  })
})

  render(<App />)

  it('should have the title Hello World', () => {
    expect(screen.getByTestId('hello-world')).toHaveTextContent('Hello World');
  })
