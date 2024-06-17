import { createSlice } from '@reduxjs/toolkit';
import { Show } from '../../types';

export const initialState: Show[] = JSON.parse(localStorage.getItem('favourites') || '[]');

const favouritesSlice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.push(action.payload);
      localStorage.setItem('favourites', JSON.stringify(state));
    },
    removeFavourite: (state, action) => {
      const index = state.findIndex((show) => show.id === action.payload.id);
      if (index !== -1) state.splice(index, 1);
      localStorage.setItem('favourites', JSON.stringify(state));
    },
  },
});

export const { addFavourite, removeFavourite } = favouritesSlice.actions;

export default favouritesSlice.reducer;
