import axios from 'axios';
import { toast } from 'react-toastify';

export const BASE_URL = 'https://api.tvmaze.com';

const handleApiCall = async (apiCall: Promise<any>) => {
  try {
    return await apiCall;
  } catch (error: any) {
    toast.error(error?.message || 'An error occurred while fetching data');
    throw error;
  }
};

export const fetchAllShows = (page: number) => handleApiCall(axios.get(`${BASE_URL}/shows?page=${page}`));
export const searchInShows = (query: string) => handleApiCall(axios.get(`${BASE_URL}/search/shows?q=${query}`));
export const fetchSeasons = (showId: number) => handleApiCall(axios.get(`${BASE_URL}/shows/${showId}?embed=seasons`));
export const fetchEpisodes = (seasonId: number) =>
  handleApiCall(axios.get(`${BASE_URL}/seasons/${seasonId}/episodes?embed=show`));
