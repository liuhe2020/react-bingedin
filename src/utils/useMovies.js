import { useQuery } from 'react-query';
import { tmdbApi } from '../api/api';

const fetcher = async (url) => {
  const response = await tmdbApi.get(url);
  return response.data;
};

export default function useMovies(url) {
  return useQuery('movies', () => fetcher(url), { staleTime: 1000 * 60 * 60 });
}
