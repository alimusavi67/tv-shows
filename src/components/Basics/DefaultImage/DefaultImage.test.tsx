import React from 'react';
import { render } from '@testing-library/react';
import DefaultImage from './DefaultImage';

describe('DefaultImage component', () => {
  test('renders correctly with src and alt', () => {
    const { asFragment } = render(<DefaultImage src="https://example.com/image.jpg" alt="Example Image" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correctly with default image when src is undefined', () => {
    const { asFragment } = render(<DefaultImage src={undefined} alt="Example Image" />);
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders correctly with additional className', () => {
    const { asFragment } = render(
      <DefaultImage src="https://example.com/image.jpg" alt="Example Image" className="custom-class" />,
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
