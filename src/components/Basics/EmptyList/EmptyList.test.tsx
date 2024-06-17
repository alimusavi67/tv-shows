import React from 'react';
import { render } from '@testing-library/react';
import EmptyList from './EmptyList';

test('renders EmptyList correctly', () => {
  const { asFragment } = render(<EmptyList message="No items found" />);
  expect(asFragment()).toMatchSnapshot();
});
