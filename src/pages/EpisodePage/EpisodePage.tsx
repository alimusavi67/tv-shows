import React from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import EpisodeList from '../../components/Episode/EpisodeList';
import { Episode } from '../../types';
import Loading from '../../components/Basics/Loading/Loading';
import Error from '../../components/Basics/Error/Error';
import EmptyList from '../../components/Basics/EmptyList/EmptyList';
import { fetchEpisodes } from '../../api/apiService';

const EpisodePage: React.FC = () => {
  const { seasonId } = useParams<{ seasonId: string }>();
  const { data: episodes, loading, error } = useFetch<Episode[]>(() => fetchEpisodes(Number(seasonId)));

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;
  if (!episodes?.length) return <EmptyList message={'There is no episodes to show'} />;
  return <EpisodeList episodes={episodes} />;
};

export default EpisodePage;
