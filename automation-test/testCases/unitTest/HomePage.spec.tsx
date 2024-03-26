import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';

import { Home } from '../../../src/pages/Home/Home';

describe('Home', () => {
  it('renders correctly', () => {
    const { container } = render(
      <Router>
        <Home />
      </Router>
    );
    expect(container).toMatchSnapshot();
  });

  it('check search button disabled when username length is less than or equal to 3', () => {
    const { getByPlaceholderText, getByRole } = render(
      <Router>
        <Home />
      </Router>
    );

    const inputElement = getByPlaceholderText('Type a github username');
    const searchButton = getByRole('button', { name: 'search' });

    // Type a short username into the input field
    fireEvent.change(inputElement, { target: { value: 'abc' } });

    // Assert that the search button is disabled
    expect(searchButton).toBeDisabled();
  });
});
