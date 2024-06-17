import React from 'react';
import { render } from '@testing-library/react';
import Skeleton from './Skeleton';

test('renders Skeleton component correctly', () => {
  const { asFragment } = render(<Skeleton />);
  expect(asFragment()).toMatchSnapshot();
});
