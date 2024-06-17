import React from 'react';
import { Season } from '../../types';
import SeasonItem from './SeasonItem';
import EmptyList from '../Basics/EmptyList/EmptyList';

interface SeasonListProps {
  seasons: Season[];
}

const SeasonList: React.FC<SeasonListProps> = ({ seasons }) => {
  if (!seasons?.length) return <EmptyList message="There is no episodes to show" />;
  return (
    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {seasons.map((season) => (
        <SeasonItem key={season.id} season={season} />
      ))}
    </ul>
  );
};

export default SeasonList;
