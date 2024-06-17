import timeZoneReducer, { setTimeZone, initialState } from './timeZoneSlice';

describe('timeZoneSlice reducer', () => {
  it('should return the initial state', () => {
    const nextState = timeZoneReducer(undefined, { type: 'unknown' });
    expect(nextState).toEqual(initialState);
  });

  it('should handle setTimeZone', () => {
    const payload = 'America/New_York';
    const nextState = timeZoneReducer(initialState, setTimeZone(payload));
    expect(nextState.timeZone).toEqual(payload);
  });
});
