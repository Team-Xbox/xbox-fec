import React from 'react';
import { createRoot } from "react-dom/client";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import QuestionsList from "./Q&A/QuestionsList.jsx";
import RelatedProductsList from "./RelatedItems/RelatedProductsList.jsx";
import Reviews from "./RatingsAndReviews/RatingsAndReviews.jsx";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <ProductDetail />
      <RelatedProductsList />
      <QuestionsList />
      <Reviews/>
    </div>
  )
}

root.render(<App />);