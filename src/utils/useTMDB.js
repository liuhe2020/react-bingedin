import useSWR from 'swr';
import { tmdbApi } from '../api/api';

const fetcher = async (url) => {
  const response = await tmdbApi.get(url);
  return response.data;
};

export default function useTMDB(url) {
  const { data, error, isLoading } = useSWR(url, fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
