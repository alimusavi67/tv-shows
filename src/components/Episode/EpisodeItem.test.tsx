import React from 'react';
import { render, screen } from '@testing-library/react';
import EpisodeItem from './EpisodeItem';
import { Episode } from '../../types';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import '@testing-library/jest-dom';
import useImageLoader from '../../hooks/useImageLoader';
import timeZoneReducer from '../../store/slices/timeZoneSlice';
jest.mock('../../hooks/useImageLoader', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('EpisodeItem component', () => {
  const mockEpisode: Episode = {
    id: 1,
    name: 'Pilot',
    image: { medium: 'sample.jpg' },
    airstamp: '2023-06-13T00:00:00Z',
    summary: '<p>This is the pilot episode.</p>',
  };

  beforeEach(() => {
    (useImageLoader as jest.Mock).mockReturnValue(false);
  });

  test('renders episode details without error', () => {
    const mockStore = createStore(
      combineReducers({
        timeZone: timeZoneReducer,
      }),
      {
        timeZone: { timeZone: 'America/New_York' },
      },
    );

    render(
      <Provider store={mockStore}>
        <EpisodeItem episode={mockEpisode} />
      </Provider>,
    );

    expect(screen.getByText('Pilot')).toBeInTheDocument();
    expect(screen.getByText('2023/06/12 20:00')).toBeInTheDocument();
    expect(screen.getByText('This is the pilot episode.')).toBeInTheDocument();
  });

  test('renders skeleton when loading', () => {
    (useImageLoader as jest.Mock).mockReturnValue(true);

    const mockStore = createStore(
      combineReducers({
        timeZone: timeZoneReducer,
      }),
      {
        timeZone: { timeZone: 'America/New_York' },
      },
    );

    render(
      <Provider store={mockStore}>
        <EpisodeItem episode={mockEpisode} />
      </Provider>,
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });

  test('renders fallback UI when image is not available', () => {
    const episodeWithoutImage: Episode = {
      ...mockEpisode,
      image: undefined,
    };

    const mockStore = createStore(
      combineReducers({
        timeZone: timeZoneReducer,
      }),
      {
        timeZone: { timeZone: 'America/New_York' },
      },
    );

    render(
      <Provider store={mockStore}>
        <EpisodeItem episode={episodeWithoutImage} />
      </Provider>,
    );

    expect(screen.getByTestId('skeleton')).toBeInTheDocument();
  });
});
