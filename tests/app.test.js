import React from 'react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react';
import CurrentAnswer from '../src/Q&A/CurrentAnswer.jsx';
import CurrentQuestion from '../src/Q&A/CurrentQuestion.jsx';
import QuestionsList from '../src/Q&A/QuestionsList.jsx';
import SearchQuestions from '../src/Q&A/SearchQuestions.jsx';
//import App from '../src/app.jsx';
import ProgressBar from '../src/RatingsAndReviews/BarGraph.jsx';
import Sliders from '../src/RatingsAndReviews/CharacteristicSliders.jsx';
import Reviews from '../src/RatingsAndReviews/Reviews.jsx';
import DropDownMenu from '../src/RatingsAndReviews/DropDownMenu.jsx';
import ProductBreakdown from '../src/RatingsAndReviews/Factors.jsx';
import Ratings from '../src/RatingsAndReviews/Ratings.jsx';
import RatingsAndReviews from '../src/RatingsAndReviews/RatingsAndReviews.jsx';
import Review from '../src/RatingsAndReviews/Review.jsx';
import ReviewList from '../src/RatingsAndReviews/ReviewList.jsx';
import StarRating from '../src/RatingsAndReviews/StarRating.jsx';
import StarRatingAddReview from '../src/RatingsAndReviews/StarRatingAddReview.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

//Yari
describe('', function () {

});

//Selina
describe('Q&A', () => {
  describe('<CurrentAnswer />', () => {
    it('should render CurrentAnswer component', () => {
      render(<CurrentAnswer answer={{ body: "Peanut brittle is yummy" }} />);
      const listElement = screen.getByTestId('answerComp');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<CurrentQuestion />', () => {
    it('should render CurrentQuestion component', () => {
      render(<CurrentQuestion question={{ question_body: "What sizes are available?" }} />);
      const listElement = screen.getByTestId('questionComp');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<QuestionList />', () => {
    it('should render QuestionsList component', () => {
      render(<QuestionsList />);
      const listElement = screen.getByTestId('qaList');
      expect(listElement).toBeInTheDocument();
    })
  })

  describe('<SearchQuestions />', () => {
    it('should render SearchQuestions component', () => {
      render(<SearchQuestions />);
      const listElement = screen.getByTestId('searchComp');
      expect(listElement).toBeInTheDocument();
    })
  })
})

//Adam
describe('Ratings and Reviews', () => {

  describe('<ProgressBar/>', () => {
    it('should render ProgressBar component', () => {
      render(<ProgressBar />);
      const listElement = screen.getByTestId('progBar');
      expect(listElement).toBeInTheDocument();
    })
  })

  // Refactor useCallback
  // describe('<CharacteristicSliders/>', () => {
  //   it ('should render CharacteristicSliders component', () => {
  //     render(<Sliders/>);
  //     const listElement = screen.getByTestId('charSliders');
  //     expect(listElement).toBeInTheDocument();
  //   })
  // })

  describe('<Reviews/>', () => {
    it('should render Reviews component', () => {
      render(<Reviews />);
      const listElement = screen.getByTestId('reviews');
      expect(listElement).toBeInTheDocument();
    })
  })

  //Refactor useCallback
  // describe('<DropDownMenu/>', () => {
  //   it ('should render DropDownMenu component', () => {
  //     render(<DropDownMenu/>);
  //     const listElement = screen.getByTestId('dropDownMeu');
  //     expect(listElement).toBeInTheDocument();
  //   })
  // })

  describe('<ProductBreakdown/>', () => {
    it('should render ProductBreakdown component', () => {
      render(<ProductBreakdown />);
      const listElement = screen.getByTestId('productBreakdown');
      expect(listElement).toBeInTheDocument();
    })
  })

  // Refactor useCallback
  // describe('<Ratings/>', () => {
  //   it('should render Ratings component', () => {
  //     render(<Ratings />);
  //     const listElement = screen.getByTestId('ratings');
  //     expect(listElement).toBeInTheDocument();
  //   })
  // })


    describe('<RatingsAndReviews/>', () => {
    it('should render RatingsAndReviews component', () => {
      render(<RatingsAndReviews />);
      const listElement = screen.getByTestId('ratingsAndReviews');
      expect(listElement).toBeInTheDocument();
    })
  })

  //Create mock data
  // describe('<Review/>', () => {
  //   it('should render Review component', () => {
  //     render(<Review />);
  //     const listElement = screen.getByTestId('review');
  //     expect(listElement).toBeInTheDocument();
  //   })
  // })

  //Create mock data
  // describe('<ReviewList/>', () => {
  //   it('should render ReviewList component', () => {
  //     render(<ReviewList />);
  //     const listElement = screen.getByTestId('reviewList');
  //     expect(listElement).toBeInTheDocument();
  //   })
  // })

  describe('<StarRating/>', () => {
    it('should render StarRating component', () => {
      render(<StarRating />);
      const listElement = screen.getByTestId('star');
      expect(listElement).toBeInTheDocument();
    })
  })


//  //Refactor useCallback
  describe('<StarRatingAddReview/>', () => {
    it('should render StarRatingAddReview component', () => {
      const parentCallbackStar = jest.fn();
      render(<StarRatingAddReview parentCallbackStar={parentCallbackStar}/>);
      const listElement = screen.getByTestId('starReview');
      expect(listElement).toBeInTheDocument();
    })
  })



})





// describe('<App/>', () => {
//   it('should have the title Hello World', () => {
//     render(<App />);
//     expect(screen.getByTestId('hello-world')).toHaveTextContent('Hello World');
//   })
// })

