import { store, RootState } from './index';
import { initialState as showsInitialState } from './slices/showsSlice';
import { initialState as favouritesInitialState } from './slices/favoritesSlice';
import { initialState as timeZoneInitialState } from './slices/timeZoneSlice';

describe('Redux Store', () => {
  it('should initialize with the correct state', () => {
    const state: RootState = store.getState();

    expect(state.shows).toEqual(showsInitialState);
    expect(state.favourites).toEqual(favouritesInitialState);
    expect(state.timeZone).toEqual(timeZoneInitialState);
  });
});
