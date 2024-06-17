import React from 'react';
import { Show } from '../../types';
import { Link } from 'react-router-dom';
import { FaTimes, FaEye } from 'react-icons/fa';
import useFavourite from '../../hooks/useFavourite';
import DefaultImage from '../Basics/DefaultImage/DefaultImage';

interface FavoriteItemProps {
  show: Show;
}

const FavoriteItem: React.FC<FavoriteItemProps> = ({ show }) => {
  const { handleFavourite } = useFavourite();
  return (
    <div className="flex flex-col items-center justify-between p-2">
      <DefaultImage
        src={show.image?.medium || '/no-image.jpg'}
        alt={show.name}
        className="w-16 h-16 object-cover rounded"
      />
      <p className="truncate max-w-32 hover:text-clip mt-2">{show.name}</p>
      <div className="flex mt-2">
        <button onClick={() => handleFavourite(show)} className="text-red-500 mr-4" data-testid="delete-button">
          <FaTimes />
        </button>
        <Link to={`/shows/${show.id}`} data-testid="preview-button">
          <FaEye className="text-blue-500" />
        </Link>
      </div>
    </div>
  );
};

export default FavoriteItem;
