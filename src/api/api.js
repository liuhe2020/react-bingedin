import axios from 'axios';

export const API_KEY = process.env.REACT_APP_API_KEY;

export const requests = [
  { title: 'Trending', url: `/trending/movie/week?api_key=${API_KEY}&language=en-us` },
  { title: 'Action', url: `/discover/movie?api_key=${API_KEY}&with_genres=28` },
  { title: 'Adventure', url: `/discover/movie?api_key=${API_KEY}&with_genres=12` },
  { title: 'Animation', url: `/discover/movie?api_key=${API_KEY}&with_genres=16` },
  { title: 'Comedy', url: `/discover/movie?api_key=${API_KEY}&with_genres=35` },
  { title: 'Crime', url: `/discover/movie?api_key=${API_KEY}&with_genres=80` },
  { title: 'Documentary', url: `/discover/movie?api_key=${API_KEY}&with_genres=99` },
  { title: 'Drama', url: `/discover/movie?api_key=${API_KEY}&with_genres=18` },
  { title: 'Family', url: `/discover/movie?api_key=${API_KEY}&with_genres=10751` },
  { title: 'Fantasy', url: `/discover/movie?api_key=${API_KEY}&with_genres=14` },
  { title: 'History', url: `/discover/movie?api_key=${API_KEY}&with_genres=36` },
  { title: 'Horror', url: `/discover/movie?api_key=${API_KEY}&with_genres=27` },
  { title: 'Mystery', url: `/discover/movie?api_key=${API_KEY}&with_genres=9648` },
  { title: 'Romance', url: `/discover/movie?api_key=${API_KEY}&with_genres=10749` },
  { title: 'SciFi', url: `/discover/movie?api_key=${API_KEY}&with_genres=878` },
  { title: 'Thriller', url: `/discover/movie?api_key=${API_KEY}&with_genres=53` },
  { title: 'War', url: `/discover/movie?api_key=${API_KEY}&with_genres=10752` },
  { title: 'Western', url: `/discover/movie?api_key=${API_KEY}&with_genres=37` },
  { title: 'Greatest Of All Time', url: `/movie/top_rated?api_key=${API_KEY}&language=en-us` },
];

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const fetcher = async (url) => {
  const response = await tmdbApi.get(url);
  return response.data;
};
