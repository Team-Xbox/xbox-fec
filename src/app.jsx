import React from 'react';
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import QuestionsList from "./Q&A/QuestionsList.jsx";
import RelatedProductsList from "./RelatedItems/RelatedProductsList.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviews.jsx";

// Huzzah for jsx!
const App = () => {
  return (
    <div data-testid="hello-world">
      <h1 >Hello World</h1>
      <ProductDetail />
      <RelatedProductsList />
      <QuestionsList />
      <RatingsAndReviews/>
    </div>
  )
}

export default App