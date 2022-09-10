import React from 'react';
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import QuestionsList from "./Q&A/QuestionsList.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviews.jsx";
import Header from './Header/Header.jsx'

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <Header />
      <div className="announcement">
        <p> red was seen coming from electrical -- report any sus crewmates -- sale on spacesuits this month only </p>
      </div>
      <ProductDetail />
      <QuestionsList />
      <RatingsAndReviews/>
    </div>
  )
}

export default App