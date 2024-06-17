import React from 'react';
import { Show } from '../../types';
import ShowItem from './ShowItem';

interface ShowListProps {
  shows: Show[];
}

const ShowList: React.FC<ShowListProps> = ({ shows }) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-7">
      {shows.map((show) => (
        <ShowItem key={show.id} show={show} />
      ))}
    </ul>
  );
};

export default ShowList;
