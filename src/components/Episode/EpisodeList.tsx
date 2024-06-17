import React from 'react';
import { Episode } from '../../types';
import EpisodeItem from './EpisodeItem';
import Breadcrumb from '../BreadCrumb';

interface EpisodeListProps {
  episodes?: Episode[];
}

const EpisodeList: React.FC<EpisodeListProps> = ({ episodes }) => {
  return (
    <div className="flex flex-col p-4">
      {episodes?.length && episodes[0] && (
        <Breadcrumb
          showName={episodes[0]._embedded?.show.name}
          showId={episodes[0]._embedded?.show.id}
          seasonId={episodes[0].season}
        />
      )}
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6 p-2">
        {episodes?.map((episode) => <EpisodeItem key={episode.id} episode={episode} />)}
      </ul>
    </div>
  );
};

export default EpisodeList;
