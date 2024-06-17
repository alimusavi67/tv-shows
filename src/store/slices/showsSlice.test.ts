import showsReducer, { initialState, fetchShows, addFavourite, removeFavourite, setPage } from './showsSlice';
import axios from 'axios';
import { AnyAction } from '@reduxjs/toolkit';

jest.mock('axios');

describe('showsSlice', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('fetchShows async thunk', () => {
    it('fetchShows should dispatch pending and fulfilled actions', async () => {
      const mockPage = 1;
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn();
      const mockResponse = { data: [{ id: 1, name: 'Show 1' }] };
      (axios.get as jest.Mock).mockResolvedValueOnce(mockResponse);

      await fetchShows(mockPage)(dispatchMock, getStateMock, undefined);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: fetchShows.pending.type,
        meta: {
          arg: mockPage,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatchMock).toHaveBeenCalledWith({
        type: fetchShows.fulfilled.type,
        payload: { shows: mockResponse.data },
        meta: {
          arg: mockPage,
          requestId: expect.any(String),
          requestStatus: 'fulfilled',
        },
      });
    });

    it('fetchShows should dispatch pending and rejected actions on error', async () => {
      const mockPage = 1;
      const dispatchMock = jest.fn();
      const getStateMock = jest.fn();
      const errorMessage = 'Not Found';

      (axios.get as jest.Mock).mockRejectedValueOnce({
        response: {
          data: { message: errorMessage },
          status: 404,
        },
        message: errorMessage,
      });

      await fetchShows(mockPage)(dispatchMock, getStateMock, undefined);

      expect(dispatchMock).toHaveBeenCalledWith({
        type: fetchShows.pending.type,
        meta: {
          arg: mockPage,
          requestId: expect.any(String),
          requestStatus: 'pending',
        },
      });

      expect(dispatchMock).toHaveBeenCalledWith(
        expect.objectContaining({
          type: fetchShows.rejected.type,
          error: expect.anything(),
          meta: expect.objectContaining({
            arg: mockPage,
            requestId: expect.any(String),
            requestStatus: 'rejected',
            aborted: expect.any(Boolean),
            condition: expect.any(Boolean),
            rejectedWithValue: expect.any(Boolean),
          }),
          payload: undefined,
        }),
      );
    });
  });

  describe('reducers', () => {
    it('addFavourite should add a show to favourites', () => {
      const state = {
        ...initialState,
        shows: [
          {
            id: 1,
            name: 'Show 1',
            genres: ['Drama'],
            image: { original: 'localhost/img', medium: 'localhost/img' },
            premiered: '12/2/2024',
            rating: { average: 1 },
          },
        ],
        favourites: [],
      };
      const action: AnyAction = { type: addFavourite.type, payload: { id: 1, name: 'Show 1' } };

      const nextState = showsReducer(state, action);

      expect(nextState.favourites).toHaveLength(1);
      expect(nextState.favourites[0].id).toBe(1);
    });

    it('removeFavourite should remove a show from favourites', () => {
      const state = {
        ...initialState,
        shows: [],
        favourites: [
          {
            id: 1,
            name: 'Show 1',
            genres: ['Drama'],
            image: { original: 'localhost/img', medium: 'localhost/img' },
            premiered: '12/2/2024',
            rating: { average: 1 },
          },
        ],
      };
      const action: AnyAction = { type: removeFavourite.type, payload: { id: 1, name: 'Show 1' } };

      const nextState = showsReducer(state, action);

      expect(nextState.favourites).toHaveLength(0);
    });

    it('setPage should update currentPage in state', () => {
      const state = { ...initialState, currentPage: 1 };
      const action: AnyAction = { type: setPage.type, payload: 2 };

      const nextState = showsReducer(state, action);

      expect(nextState.currentPage).toBe(2);
    });
  });
});
