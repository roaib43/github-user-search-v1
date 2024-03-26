import React from 'react';
import { render, getByText } from '@testing-library/react'; // Importing getByText function
import { BrowserRouter as Router } from 'react-router-dom';

import { User } from '../../../src/pages/User/User';

jest.mock('../../../src/hooks/useFetch', () => ({
  useFetch: jest.fn(() => ({
    data: null,
    isFetching: false,
    error: new Error('Failed to fetch data'),
  })),
}));

describe('User Page - Error when user not found', () => {
  it('renders error message correctly', () => {
    const { container } = render(
      <Router>
        <User />
      </Router>
    );
    expect(getByText(container, 'Ops, something went wrong 😢')).toBeInTheDocument();
  });
});
