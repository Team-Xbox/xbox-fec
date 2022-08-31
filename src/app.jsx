import React from 'react';
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import QuestionsList from "./Q&A/QuestionsList.jsx";
import RelatedProductsList from "./RelatedItems/RelatedProductsList.jsx";
import RatingsAndReviews from "./RatingsAndReviews/RatingsAndReviews.jsx";

const App = () => {
  return (
    <div>
      <h1 data-testid='hello-world'>Hello World</h1>
      <ProductDetail />
      <RelatedProductsList />
      <QuestionsList />
      <RatingsAndReviews/>
    </div>
  )
}
export default App;