import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ShowPage from './ShowPage';
import useFetch from '../../hooks/useFetch';
import useFavourite from '../../hooks/useFavourite';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/useFetch');

jest.mock('../../hooks/useFavourite');

jest.mock('../../components/Basics/Loading/Loading', () => {
  const Loading = () => <div>Loading...</div>;
  Loading.displayName = 'Loading';
  return Loading;
});
jest.mock('../../components/Basics/Error/Error', () => {
  const Error = () => <div>Error: Something went wrong</div>;
  Error.displayName = 'Error';
  return Error;
});
jest.mock('../../components/Basics/EmptyList/EmptyList', () => {
  const EmptyList = () => <div>There is no episodes to show</div>;
  EmptyList.displayName = 'EmptyList';
  return EmptyList;
});

describe('ShowPage', () => {
  const mockUseParams = require('react-router-dom').useParams;
  const mockUseFetch = useFetch as jest.Mock;
  const mockUseFavourite = useFavourite as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Loading component when data is loading', () => {
    mockUseParams.mockReturnValue({ showId: '1' });
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });
    mockUseFavourite.mockReturnValue({
      favourites: [],
      handleFavourite: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ShowPage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders Error component when there is an error', async () => {
    mockUseParams.mockReturnValue({ showId: '1' });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: new Error('Fetch error'),
    });
    mockUseFavourite.mockReturnValue({
      favourites: [],
      handleFavourite: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ShowPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
    });
  });

  test('renders EmptyList component when there are no episodes', async () => {
    mockUseParams.mockReturnValue({ showId: '1' });
    mockUseFetch.mockReturnValue({ data: [], loading: false, error: null });
    mockUseFavourite.mockReturnValue({
      favourites: [],
      handleFavourite: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ShowPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('There is no episodes to show')).toBeInTheDocument();
    });
  });

  test('renders SeasonList component when data is loaded', async () => {
    const mockSeasons = [
      { id: 1, name: 'Season 1', number: 1, genres: ['drama'] },
      { id: 2, name: 'Season 2', number: 2, genres: ['sport'] },
    ];
    mockUseParams.mockReturnValue({ showId: '1' });
    mockUseFetch.mockReturnValue({
      data: {
        _embedded: {
          seasons: mockSeasons,
        },
      },
      loading: false,
      error: null,
    });
    mockUseFavourite.mockReturnValue({
      favourites: [],
      handleFavourite: jest.fn(),
    });

    render(
      <BrowserRouter>
        <ShowPage />
      </BrowserRouter>,
    );

    await waitFor(() => {
      expect(screen.getByText('Season 1')).toBeInTheDocument();
      expect(screen.getByText('Season 2')).toBeInTheDocument();
    });
  });
});
