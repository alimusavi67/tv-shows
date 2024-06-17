import React from 'react';
import { Episode } from '../../types';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import moment from 'moment';
import Skeleton from '../Basics/Skeleton/Skeleton';
import useImageLoader from '../../hooks/useImageLoader';
import DefaultImage from '../Basics/DefaultImage/DefaultImage';

interface EpisodeItemProps {
  episode: Episode;
}

const EpisodeItem: React.FC<EpisodeItemProps> = ({ episode }) => {
  const timeZone = useSelector((state: RootState) => state.timeZone);
  const formattedDate = episode.airstamp
    ? moment(episode.airstamp).tz(timeZone.timeZone).format('YYYY/MM/DD HH:mm')
    : 'No date available';
  const isLoading = useImageLoader(episode.image?.medium);

  return (
    <li key={episode.id} className="p-2 border rounded-lg">
      <div className="relative group overflow-hidden">
        {isLoading ? <Skeleton /> : <DefaultImage src={episode.image?.medium} alt={episode.name} />}
      </div>
      <div className="mt-2">
        <h2 className="text-lg font-semibold">{episode.name}</h2>
        <p className="text-sm text-gray-600">{formattedDate}</p>
        <p
          className="text-sm mt-2"
          dangerouslySetInnerHTML={{ __html: episode.summary || '<em>No summary available</em>' }}
        ></p>
      </div>
    </li>
  );
};

export default EpisodeItem;
