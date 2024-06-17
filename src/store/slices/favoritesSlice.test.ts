import { configureStore } from '@reduxjs/toolkit';
import favouritesReducer, { addFavourite, removeFavourite } from './favoritesSlice';
import { Show } from '../../types';
import { RootState } from '../index';

const mockShow: Show = {
  id: 1,
  name: 'Sample Show',
  image: {
    medium: 'sample.jpg',
    original: 'sample.jpg',
  },
  genres: ['Drama'],
  premiered: '2020-01-01',
  rating: { average: 8 },
};

describe('Favourites Slice', () => {
  let store: ReturnType<typeof configureStore>;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        favourites: favouritesReducer,
      },
    });
  });

  it('should handle adding a favourite', () => {
    store.dispatch(addFavourite(mockShow));
    const state = store.getState() as RootState;
    expect(state.favourites).toEqual([mockShow]);
  });

  it('should handle removing a favourite', () => {
    store.dispatch(addFavourite(mockShow));
    store.dispatch(removeFavourite(mockShow));
    const state = store.getState() as RootState;
    expect(state.favourites).toEqual([]);
  });
});
