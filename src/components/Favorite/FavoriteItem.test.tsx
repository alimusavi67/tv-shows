import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import FavoriteItem from './FavoriteItem';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

describe('FavoriteItem Component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      shows: [],
      favourites: [],
      timeZone: { timeZone: 'UTC' },
    });
  });

  const mockShow = {
    id: 1,
    name: 'Test Show',
    image: { medium: 'test.jpg', original: 'test.jpg' },
    genres: ['drama'],
    rating: { average: 9 },
    premiered: '12/2/2024',
  };

  it('renders show name and buttons correctly', () => {
    const { getByText, getByAltText, getByTestId } = render(
      <Router>
        <Provider store={store}>
          <FavoriteItem show={mockShow} />
        </Provider>
      </Router>,
    );

    const showName = getByText('Test Show');
    expect(showName).toBeInTheDocument();

    const showImage = getByAltText('Test Show');
    expect(showImage).toBeInTheDocument();

    const deleteButton = getByTestId('delete-button');
    expect(deleteButton).toBeInTheDocument();

    const viewButton = getByTestId('preview-button');
    expect(viewButton).toBeInTheDocument();
  });

  it('calls handleFavourite on delete button click', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <FavoriteItem show={mockShow} />
        </Provider>
      </Router>,
    );

    const deleteButton = getByTestId('delete-button');
    fireEvent.click(deleteButton);
  });

  it('navigates to show details page on view button click', () => {
    const { getByTestId } = render(
      <Router>
        <Provider store={store}>
          <FavoriteItem show={mockShow} />
        </Provider>
      </Router>,
    );

    const viewButton = getByTestId('preview-button');
    expect(viewButton.closest('a')).toHaveAttribute('href', '/shows/1');
  });
});
