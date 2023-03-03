import axios from 'axios';

export const API_KEY = process.env.REACT_APP_API_KEY;

export const requests = {
  getTrending: `/trending/movie/week?api_key=${API_KEY}&language=en-us`,
  getPopular: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`,
  getTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-us`,
  getAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  getAdventure: `/discover/movie?api_key=${API_KEY}&with_genres=12`,
  getAnimation: `/discover/movie?api_key=${API_KEY}&with_genres=16`,
  getComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  getCrime: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  getDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
  getDrama: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  getFamily: `/discover/movie?api_key=${API_KEY}&with_genres=10751`,
  getFantasy: `/discover/movie?api_key=${API_KEY}&with_genres=14`,
  getHistory: `/discover/movie?api_key=${API_KEY}&with_genres=36`,
  getHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  getMystery: `/discover/movie?api_key=${API_KEY}&with_genres=9648`,
  getRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  getSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  getThriller: `/discover/movie?api_key=${API_KEY}&with_genres=53`,
  getWar: `/discover/movie?api_key=${API_KEY}&with_genres=10752`,
  getWestern: `/discover/movie?api_key=${API_KEY}&with_genres=37`,
};

export const tmdbApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
});

export const fetcher = async (url) => {
  const response = await tmdbApi.get(url);
  return response.data;
};
