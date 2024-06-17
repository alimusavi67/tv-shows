import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import SeasonList from '../../components/Season/SeasonList';
import { Show, ShowWithEmbedded } from '../../types';
import { FaHeart } from 'react-icons/fa';
import useFavourite from '../../hooks/useFavourite';
import Loading from '../../components/Basics/Loading/Loading';
import Error from '../../components/Basics/Error/Error';
import { fetchSeasons } from '../../api/apiService';
import Breadcrumb from '../../components/BreadCrumb';

const ShowPage: React.FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const { data: show, loading, error } = useFetch<ShowWithEmbedded>(() => fetchSeasons(Number(showId)));
  const [isLoading, setIsLoading] = useState(true);
  const { favourites, handleFavourite } = useFavourite();
  const isFavourite = favourites.some((fav: Show) => fav.id.toString() === showId);
  useEffect(() => {
    if (show && show.image?.medium) {
      const img = new Image();
      img.src = show.image.medium;
      img.onload = () => setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [show]);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="p-4">
      <Breadcrumb />
      <div className="flex mb-8 mt-2 bg-no-repeat bg-center bg-cover md:bg-[url('../public/banner.jpg')]">
        {isLoading ? (
          <div className="w-32 h-48 bg-gray-300 animate-pulse"></div>
        ) : (
          <img
            src={show?.image?.medium || '/no-image.jpg'}
            alt={show?.name || 'Default Show Image'}
            className="mr-3 w-32 h-48 object-cover"
          />
        )}
        <div>
          <h1 className="text-2xl">{show?.name}</h1>
          <p>Language: {show?.language}</p>
          <p>Genres: {show?.genres?.join(', ')}</p>
          <p>Status: {show?.status}</p>
          <p>Premiered: {show?.premiered}</p>
          <p>Rating: {show?.rating?.average}</p>
          {show && (
            <button onClick={() => handleFavourite(show)} className="mt-2">
              {isFavourite ? (
                <FaHeart size="30px" className="text-red-500" />
              ) : (
                <FaHeart size="30px" className="text-gray-500" />
              )}
            </button>
          )}
        </div>
      </div>
      <SeasonList seasons={show?._embedded?.seasons || []} />
    </div>
  );
};

export default ShowPage;
