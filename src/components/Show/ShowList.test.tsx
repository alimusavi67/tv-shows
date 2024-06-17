import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShowList from './ShowList';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';

const mockStore = configureStore([]);

const mockShows = [
  {
    id: 1,
    name: 'Show 1',
    image: { medium: 'image1.jpg', original: 'image1.jpg' },
    genres: ['Drama'],
    premiered: '2023-01-01',
    rating: { average: 8.0 },
  },
  {
    id: 2,
    name: 'Show 2',
    image: { medium: 'image2.jpg', original: 'image2.jpg' },
    genres: ['Comedy'],
    premiered: '2023-02-01',
    rating: { average: 7.5 },
  },
];

describe('ShowList component', () => {
  it('renders correctly with shows', () => {
    const store = mockStore({
      shows: { favourites: [] },
    });

    render(
      <Provider store={store}>
        <Router>
          <ShowList shows={mockShows} />
        </Router>
      </Provider>,
    );

    mockShows.forEach((show) => {
      expect(screen.getByText(show.name)).toBeInTheDocument();
      expect(screen.getByText(show.genres.join(', '))).toBeInTheDocument();
      expect(screen.getByText(show.premiered)).toBeInTheDocument();
      expect(screen.getByText(show.rating.average.toString())).toBeInTheDocument();
    });
  });
});
