import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { addFavourite, removeFavourite } from '../store/slices/showsSlice';
import { RootState, AppDispatch } from '../store';
import { Show } from '../types';

const useFavourite = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favourites = useSelector((state: RootState) => state.shows.favourites);

  const handleFavourite = (show: Show) => {
    if (favourites?.find((fav: Show) => fav.id === show.id)) {
      dispatch(removeFavourite(show));
      toast.info(`${show.name} removed from favorites`);
    } else {
      dispatch(addFavourite(show));
      toast.success(`${show.name} added to favorites`);
    }
  };

  return { handleFavourite, favourites };
};

export default useFavourite;
