import React from 'react';
import { render } from '@testing-library/react';
import Error from './Error';

test('renders Error correctly', () => {
  const { asFragment } = render(<Error message="An error occurred!" />);
  expect(asFragment()).toMatchSnapshot();
});
