import React from 'react';
import { Show } from '../../types';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import useFavourite from '../../hooks/useFavourite';
import useImageLoader from '../../hooks/useImageLoader';
import Skeleton from '../Basics/Skeleton/Skeleton';
import DefaultImage from '../Basics/DefaultImage/DefaultImage';

interface ShowItemProps {
  show: Show;
}

const ShowItem: React.FC<ShowItemProps> = ({ show }) => {
  const { favourites, handleFavourite } = useFavourite();
  const isFavourite = !!favourites.find((fav) => fav.id === show.id);
  const imageIsLoading = useImageLoader(show.image?.medium);

  return (
    <div key={show.id} className="rounded-sm overflow-hidden">
      <div className="relative group overflow-hidden">
        {imageIsLoading ? (
          <Skeleton className="h-72" />
        ) : (
          <DefaultImage src={show.image?.medium} alt={show.name} className="h-72" />
        )}
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white text-center p-2 z-10">
          <div>
            <p className="text-white">{show.genres.join(', ')}</p>
            <p className="text-white">{show.premiered}</p>
            <p className="text-white">{show.rating.average}</p>
            <button onClick={() => handleFavourite(show)} className="mt-2">
              {isFavourite ? (
                <FaHeart size="30px" className="text-red-500" />
              ) : (
                <FaHeart size="30px" className="text-gray-500" />
              )}
            </button>
            <Link
              to={`/shows/${show.id}`}
              className="block mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
      <h2 className="mt-2 text-center">{show.name}</h2>
    </div>
  );
};

export default ShowItem;
