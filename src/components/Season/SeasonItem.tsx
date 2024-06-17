import React from 'react';
import { Link } from 'react-router-dom';
import { Season } from '../../types';
import useImageLoader from '../../hooks/useImageLoader';
import Skeleton from '../Basics/Skeleton/Skeleton';
import DefaultImage from '../Basics/DefaultImage/DefaultImage';

interface SeasonItemProps {
  season: Season;
}

const SeasonItem: React.FC<SeasonItemProps> = ({ season }) => {
  const isLoading = useImageLoader(season.image?.medium);

  return (
    <li key={season.id} className="p-4 border rounded-lg shadow-lg flex justify-between flex-col md:flex-row">
      <div className={`mt-2 ${isLoading ? 'w-1/3' : ''}`}>
        {isLoading ? <Skeleton /> : <DefaultImage src={season.image?.medium} alt={`Season ${season.number}`} />}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Season {season.number}</h2>
        <p className="mb-2">Episodes: {season.episodeOrder}</p>
        <p className="mb-4">Premiered: {season.premiereDate}</p>
        <Link
          to={`/episodes/${season.id}`}
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          View Episodes
        </Link>
      </div>
    </li>
  );
};

export default SeasonItem;
