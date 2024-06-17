import React from 'react';
import FavoriteItem from './FavoriteItem';
import useFavourite from '../../hooks/useFavourite';

const FavoriteSection: React.FC = () => {
  const { favourites } = useFavourite();
  return (
    <div>
      <h1 className="text-2xl mb-4">Favourite Shows</h1>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-7">
        {favourites.map((show) => (
          <li key={show.id}>
            <FavoriteItem show={show} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FavoriteSection;
