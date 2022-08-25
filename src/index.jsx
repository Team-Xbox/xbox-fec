import React from 'react';
import { createRoot } from "react-dom/client";
import ProductDetail from "./ProductDetail/ProductDetail.jsx";
import QuestionsList from "./Q&A/QuestionsList.jsx";
import RelatedProductsList from "./RelatedItems/RelatedProductsList.jsx";
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <ProductDetail />
      <RelatedProductsList />
      <QuestionsList />
    </div>
  )
}

root.render(<App />);