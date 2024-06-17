import { configureStore } from '@reduxjs/toolkit';
import showsReducer from './slices/showsSlice';
import favouritesReducer from './slices/favoritesSlice';
import timeZoneReducer from './slices/timeZoneSlice';

export const store = configureStore({
  reducer: {
    shows: showsReducer,
    favourites: favouritesReducer,
    timeZone: timeZoneReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
