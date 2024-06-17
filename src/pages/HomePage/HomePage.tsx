import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store';
import { fetchShows, setPage, searchShows } from '../../store/slices/showsSlice';
import SearchBox from '../../components/Search/SearchBox';
import ShowList from '../../components/Show/ShowList';
import Pagination from '../../components/Pagination/Pagination';
import FavoriteSection from '../../components/Favorite/FavoriteSection';
import Loading from '../../components/Basics/Loading/Loading';
import Error from '../../components/Basics/Error/Error';
import EmptyList from '../../components/Basics/EmptyList/EmptyList';

const HomePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { shows, status, error } = useSelector((state: RootState) => state.shows);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchQuery = searchParams.get('query') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchShows(searchQuery));
    } else {
      dispatch(fetchShows(page));
    }
  }, [dispatch, searchQuery, page]);

  /**
   * Handles page change events to update the search parameters and fetch shows for the new page.
   *
   * @param {number} page - The new page number to fetch.
   */
  const handlePageChange = (page: number) => {
    setSearchParams({ query: searchQuery, page: page.toString() });
    dispatch(setPage(page));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  /**
   * Handles search events to update the search parameters and fetch shows based on the search query.
   *
   * @param {string} searchQuery - The search query to fetch shows.
   */
  const handleSearch = (searchQuery: string) => {
    setSearchParams({ query: searchQuery, page: '1' });
    dispatch(setPage(1));
  };

  if (status === 'loading') {
    return <Loading />;
  }

  if (status === 'failed') {
    return <Error message={error || 'An error occurred'} />;
  }
  if (!shows.length) {
    return <EmptyList message={'There is No Show To Show!'} />;
  }

  return (
    <div className="p-4">
      <FavoriteSection />
      <SearchBox onSearch={handleSearch} initialQuery={searchQuery} />
      <h1 className="text-2xl my-4">{searchQuery ? `Searched for ${searchQuery}` : 'All Shows'}</h1>
      <ShowList shows={shows} />
      <div className="my-4">
        <Pagination currentPage={page} setPage={handlePageChange} isLastPage={shows.length < 200} />
      </div>
    </div>
  );
};

export default HomePage;
