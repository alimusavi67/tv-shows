import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Show } from '../../types';
import { fetchAllShows, searchInShows } from '../../api/apiService';

export interface ShowsState {
  shows: Show[];
  favourites: Show[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null | undefined;
  currentPage: number;
}

export const initialState: ShowsState = {
  shows: [],
  favourites: JSON.parse(localStorage.getItem('favourites') || '[]'),
  status: 'idle',
  error: null,
  currentPage: Number(localStorage.getItem('currentPage')) || 1,
};

export const fetchShows = createAsyncThunk('shows/fetchShows', async (page: number) => {
  const response = await fetchAllShows(Number(page));
  return { shows: response.data };
});

export const searchShows = createAsyncThunk('shows/searchShows', async (query: string) => {
  const response = await searchInShows(query);
  return response.data.map((result: { show: Show; score: number }) => result.show);
});

const showsSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    addFavourite: (state, action) => {
      state.favourites.push(action.payload);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    removeFavourite: (state, action) => {
      state.favourites = state.favourites.filter((show) => show.id !== action.payload.id);
      localStorage.setItem('favourites', JSON.stringify(state.favourites));
    },
    setPage: (state, action) => {
      state.currentPage = action.payload;
      localStorage.setItem('currentPage', state.currentPage.toString());
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shows = action.payload.shows;
      })
      .addCase(fetchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(searchShows.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(searchShows.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.shows = action.payload;
      })
      .addCase(searchShows.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { addFavourite, removeFavourite, setPage } = showsSlice.actions;

export default showsSlice.reducer;
