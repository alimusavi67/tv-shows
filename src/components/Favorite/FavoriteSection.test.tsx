import React from 'react';
import { render } from '@testing-library/react';
import FavoriteSection from './FavoriteSection';
import useFavourite from '../../hooks/useFavourite';
import '@testing-library/jest-dom';

jest.mock('../../hooks/useFavourite');

jest.mock('./FavoriteItem', () => {
  const MockFavoriteItem = ({ show }: { show: { name: string } }) => <div>{show.name}</div>;
  MockFavoriteItem.displayName = 'MockFavoriteItem';
  return MockFavoriteItem;
});
describe('FavoriteSection component', () => {
  it('renders correctly with favourites', () => {
    const mockFavourites = [
      { id: 1, name: 'Show 1' },
      { id: 2, name: 'Show 2' },
    ];

    (useFavourite as jest.Mock).mockReturnValue({
      favourites: mockFavourites,
    });

    const { getByText } = render(<FavoriteSection />);

    expect(getByText('Favourite Shows')).toBeInTheDocument();

    mockFavourites.forEach((show) => {
      expect(getByText(show.name)).toBeInTheDocument();
    });
  });

  it('renders correctly with no favourites', () => {
    (useFavourite as jest.Mock).mockReturnValue({
      favourites: [],
    });

    const { getByText, queryByText } = render(<FavoriteSection />);

    expect(getByText('Favourite Shows')).toBeInTheDocument();

    expect(queryByText('Show 1')).not.toBeInTheDocument();
    expect(queryByText('Show 2')).not.toBeInTheDocument();
  });
});
