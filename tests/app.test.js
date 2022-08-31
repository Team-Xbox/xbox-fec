import React from 'react';
import '@testing-library/react/dont-cleanup-after-each';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import {render, screen, waitFor} from '@testing-library/react';
import App from '../src/app.jsx';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';

describe('app.jsx', function() {
  const user = userEvent.setup();

  render(<App />)

  it('should have the title Hello World', () => {
         expect(screen.getByTestId('hello-world')).toHaveTextContent('Hello World');})
  });