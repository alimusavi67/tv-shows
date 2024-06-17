import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment-timezone';

interface TimeZoneState {
  timeZone: any;
}

export const initialState: TimeZoneState = {
  timeZone: moment.tz.guess(),
};

const timeZoneSlice = createSlice({
  name: 'timeZone',
  initialState,
  reducers: {
    setTimeZone(state, action: PayloadAction<string>) {
      state.timeZone = action.payload;
    },
  },
});

export const { setTimeZone } = timeZoneSlice.actions;
export default timeZoneSlice.reducer;
