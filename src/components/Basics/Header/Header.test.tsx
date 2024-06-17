import React from 'react';
import { render } from '@testing-library/react';
import Header from './Header';

jest.mock('../../TimeZoneSelector/TimeZoneSelector', () => {
  return function MockTimeZoneSelector() {
    return <div>TimeZoneSelector Mock</div>;
  };
});

describe('Header component', () => {
  it('matches the snapshot', () => {
    const { asFragment } = render(<Header />);
    expect(asFragment()).toMatchSnapshot();
  });
});
