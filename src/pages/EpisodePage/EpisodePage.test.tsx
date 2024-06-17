import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import EpisodePage from './EpisodePage';
import useFetch from '../../hooks/useFetch';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

jest.mock('../../hooks/useFetch');

jest.mock('../../components/Episode/EpisodeList', () => {
  const EpisodeList = () => <div>EpisodeList</div>;
  EpisodeList.displayName = 'EpisodeList';
  return EpisodeList;
});
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

describe('EpisodePage', () => {
  const mockUseParams = require('react-router-dom').useParams;
  const mockUseFetch = useFetch as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders Loading component when data is loading', () => {
    mockUseParams.mockReturnValue({ seasonId: '1' });
    mockUseFetch.mockReturnValue({ data: null, loading: true, error: null });

    render(
      <BrowserRouter>
        <EpisodePage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders Error component when there is an error', () => {
    mockUseParams.mockReturnValue({ seasonId: '1' });
    mockUseFetch.mockReturnValue({
      data: null,
      loading: false,
      error: { message: 'Something went wrong' },
    });

    render(
      <BrowserRouter>
        <EpisodePage />
      </BrowserRouter>,
    );

    expect(screen.getByText('Error: Something went wrong')).toBeInTheDocument();
  });

  test('renders EmptyList component when there are no episodes', () => {
    mockUseParams.mockReturnValue({ seasonId: '1' });
    mockUseFetch.mockReturnValue({ data: [], loading: false, error: null });

    render(
      <BrowserRouter>
        <EpisodePage />
      </BrowserRouter>,
    );

    expect(screen.getByText('There is no episodes to show')).toBeInTheDocument();
  });

  test('renders EpisodeList component when there are episodes', () => {
    const mockEpisodes = [
      { id: 1, name: 'Episode 1' },
      { id: 2, name: 'Episode 2' },
    ];
    mockUseParams.mockReturnValue({ seasonId: '1' });
    mockUseFetch.mockReturnValue({
      data: mockEpisodes,
      loading: false,
      error: null,
    });

    render(
      <BrowserRouter>
        <EpisodePage />
      </BrowserRouter>,
    );

    expect(screen.getByText('EpisodeList')).toBeInTheDocument();
  });
});
