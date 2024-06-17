import React from 'react';
import { render, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import ShowItem from './ShowItem';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

const mockShow = {
  id: 1,
  name: 'Test Show',
  image: { medium: 'test-image.jpg', original: 'test-image.jpg' },
  genres: ['Action', 'Drama'],
  premiered: '2023-06-01',
  rating: { average: 8.5 },
};

describe('ShowItem component', () => {
  let store: ReturnType<typeof mockStore>;

  beforeEach(() => {
    store = mockStore({
      shows: {
        favourites: [],
      },
    });
  });

  it('renders correctly when loaded', async () => {
    const { getByText } = render(
      <Provider store={store}>
        <Router>
          <ShowItem show={mockShow} />
        </Router>
      </Provider>,
    );

    await waitFor(() => {
      expect(getByText('Test Show')).toBeInTheDocument();
      expect(getByText('Action, Drama')).toBeInTheDocument();
      expect(getByText('2023-06-01')).toBeInTheDocument();
      expect(getByText('8.5')).toBeInTheDocument();
    });
  });
});
