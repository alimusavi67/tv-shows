import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import moment from 'moment-timezone';
import TimeZoneSelector from './TimeZoneSelector';
import { setTimeZone } from '../../store/slices/timeZoneSlice';

const mockStore = configureStore([]);

describe('TimeZoneSelector component', () => {
  let store: any;

  beforeEach(() => {
    store = mockStore({
      timeZone: { timeZone: 'UTC' },
    });

    store.dispatch = jest.fn();
  });

  it('renders the correct time zones', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <TimeZoneSelector />
      </Provider>,
    );

    const select = getByLabelText('Time Zone') as HTMLSelectElement;
    const timeZones = moment.tz.names();

    expect(select.children.length).toBe(timeZones.length);

    timeZones.forEach((zone, index) => {
      expect(select.children[index].textContent).toBe(zone);
      expect((select.children[index] as HTMLInputElement).value).toBe(zone);
    });
  });

  it('displays the selected time zone from the store', () => {
    store = mockStore({
      timeZone: { timeZone: 'America/New_York' },
    });

    const { getByLabelText } = render(
      <Provider store={store}>
        <TimeZoneSelector />
      </Provider>,
    );

    const select = getByLabelText('Time Zone') as HTMLSelectElement;

    expect(select.value).toBe('America/New_York');
  });

  it('dispatches setTimeZone action on change', () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <TimeZoneSelector />
      </Provider>,
    );

    const select = getByLabelText('Time Zone') as HTMLSelectElement;
    fireEvent.change(select, { target: { value: 'Asia/Tokyo' } });

    expect(store.dispatch).toHaveBeenCalledWith(setTimeZone('Asia/Tokyo'));
  });
});
