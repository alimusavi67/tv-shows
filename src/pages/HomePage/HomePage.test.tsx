import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import HomePage from './HomePage';
import { Show } from '../../types';
import { Provider, useDispatch } from 'react-redux';
import { Dispatch, configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import timeZoneReducer from '../../store/slices/timeZoneSlice';
import showsReducer, { ShowsState } from '../../store/slices/showsSlice';

jest.mock('../../components/Search/SearchBox', () => {
  const SearchBox = () => <div>SearchBox</div>;
  SearchBox.displayName = 'SearchBox';
  return SearchBox;
});
jest.mock('../../components/Show/ShowList', () => {
  const ShowList = ({ shows }: { shows: any[] }) => (
    <div>
      ShowList
      <ul>
        {shows.map((show) => (
          <li key={show.id}>{show.name}</li>
        ))}
      </ul>
    </div>
  );
  ShowList.displayName = 'ShowList';
  return ShowList;
});
jest.mock('../../components/Pagination/Pagination', () => {
  const Pagination = ({ currentPage, setPage }: { currentPage: number; setPage: any }) => (
    <div>
      Pagination - Current Page: {currentPage}
      <button onClick={() => setPage(currentPage + 1)}>Next</button>
    </div>
  );
  Pagination.displayName = 'Pagination';
  return Pagination;
});
jest.mock('../../components/Favorite/FavoriteSection', () => {
  const FavoriteSection = () => <div>FavoriteSection</div>;
  FavoriteSection.displayName = 'FavoriteSection';
  return FavoriteSection;
});
jest.mock('../../components/Basics/Loading/Loading', () => {
  const Loading = () => <div>Loading...</div>;
  Loading.displayName = 'Loading';
  return Loading;
});
jest.mock('../../components/Basics/Error/Error', () => {
  const Error = ({ message }: { message: string }) => <div>Error: {message}</div>;
  Error.displayName = 'Error';
  return Error;
});
jest.mock('../../components/Basics/EmptyList/EmptyList', () => {
  const EmptyList = ({ message }: { message: string }) => <div>EmptyList: {message}</div>;
  EmptyList.displayName = 'EmptyList';
  return EmptyList;
});

jest.mock('react-redux', () => {
  const originalModule = jest.requireActual('react-redux');
  return {
    ...originalModule,
    useDispatch: jest.fn(() => jest.fn()),
  };
});

describe('HomePage component', () => {
  beforeEach(() => {
    const mockDispatch = jest.fn();
    (useDispatch as unknown as jest.Mock<Dispatch<any>>).mockReturnValue(mockDispatch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });
  const mockShow: Show = {
    id: 1,
    name: 'Pilot',
    image: { medium: 'sample.jpg', original: 'sample.jpg' },
    premiered: '2023-06-13T00:00:00Z',
    genres: ['Drama'],
    rating: { average: 9 },
  };

  const renderWithStore = (initialState: ShowsState) => {
    const store = configureStore({
      reducer: {
        timeZone: timeZoneReducer,
        shows: showsReducer,
      },
      preloadedState: {
        shows: initialState,
      },
    });

    return render(
      <Provider store={store}>
        <Router>
          <HomePage />
        </Router>
      </Provider>,
    );
  };

  test('renders home page without error', () => {
    const initialState: ShowsState = {
      shows: [],
      favourites: [],
      status: 'loading',
      error: null,
      currentPage: 1,
    };

    renderWithStore(initialState);

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message when there is an error', async () => {
    const initialState: ShowsState = {
      shows: [],
      favourites: [],
      status: 'failed',
      error: 'An error occurred',
      currentPage: 1,
    };

    renderWithStore(initialState);

    await waitFor(() => {
      expect(screen.getByText('Error: An error occurred')).toBeInTheDocument();
    });
  });

  test('renders empty list message when there are no shows', () => {
    const initialState: ShowsState = {
      shows: [],
      favourites: [],
      status: 'succeeded',
      error: null,
      currentPage: 1,
    };

    renderWithStore(initialState);

    expect(screen.getByText('EmptyList: There is No Show To Show!')).toBeInTheDocument();
  });

  test('renders ShowList and Pagination when shows are available', () => {
    const initialState: ShowsState = {
      shows: [mockShow],
      favourites: [],
      status: 'succeeded',
      error: null,
      currentPage: 1,
    };

    renderWithStore(initialState);

    expect(screen.getByText('ShowList')).toBeInTheDocument();
    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('Pagination - Current Page: 1')).toBeInTheDocument();
  });
});
