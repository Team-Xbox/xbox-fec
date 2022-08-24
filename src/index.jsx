import React from 'react';
import { createRoot } from "react-dom/client";
import ProductOverview from './components/maincomponentpage.jsx'
const root = createRoot(document.getElementById("root"));

// Huzzah for jsx!
const App = () => {
  return (
    <div>
      <h1>Hello World</h1>
      <div>
        <ProductOverview/>
      </div>
    </div>
  )
}

root.render(<App />);
