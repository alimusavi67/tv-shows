import React from 'react';
import { render } from '@testing-library/react';
import Loading from './Loading';

test('renders Loading component correctly', () => {
  const { asFragment } = render(<Loading />);
  expect(asFragment()).toMatchSnapshot();
});
