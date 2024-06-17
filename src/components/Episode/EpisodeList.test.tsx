import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EpisodeList from './EpisodeList';
import { Episode } from '../../types';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import timeZoneReducer from '../../store/slices/timeZoneSlice';
import showsReducer from '../../store/slices/showsSlice';

const store = configureStore({
  reducer: {
    timeZone: timeZoneReducer,
    shows: showsReducer,
  },
});

jest.mock('../../components/BreadCrumb', () => {
  const BreadCrumb = () => <div>BreadCrumb</div>;
  BreadCrumb.displayName = 'BreadCrumb';
  return BreadCrumb;
});

const mockEpisodes: Episode[] = [
  {
    id: 1,
    name: 'Episode 1',
    image: { medium: 'sample.jpg', original: 'sample.jpg' },
    summary: 'Summary for episode 1',
    airstamp: '2021-01-01T12:00:00+00:00',
  },
  {
    id: 2,
    name: 'Episode 2',
    image: { medium: 'sample.jpg', original: 'sample.jpg' },
    summary: 'Summary for episode 2',
    airstamp: '2021-01-08T12:00:00+00:00',
  },
];

describe('EpisodeList', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <EpisodeList episodes={[]} />
      </Provider>,
    );
  });

  test('renders a list of episodes', () => {
    render(
      <Provider store={store}>
        <EpisodeList episodes={mockEpisodes} />
      </Provider>,
    );
    const episodeItems = screen.getAllByRole('listitem');
    expect(episodeItems).toHaveLength(mockEpisodes.length);
  });

  test('renders episode details correctly', () => {
    render(
      <Provider store={store}>
        <EpisodeList episodes={mockEpisodes} />
      </Provider>,
    );
    mockEpisodes.forEach((episode) => {
      expect(screen.getByText(episode.name)).toBeInTheDocument();
      expect(screen.getByText(episode.summary)).toBeInTheDocument();
    });
  });

  test('renders no episodes message when there are no episodes', () => {
    render(
      <Provider store={store}>
        <EpisodeList episodes={[]} />
      </Provider>,
    );
    expect(screen.queryByRole('listitem')).toBeNull();
  });
});
