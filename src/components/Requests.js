const API_KEY = process.env.REACT_APP_API_KEY;

const requests = {
  getTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,

  getPopular: `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc`,
  getTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-us`,
  getAction: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  getComedy: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  getCrime: `/discover/movie?api_key=${API_KEY}&with_genres=80`,
  getDrama: `/discover/movie?api_key=${API_KEY}&with_genres=18`,
  getHorror: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  getRomance: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  getSciFi: `/discover/movie?api_key=${API_KEY}&with_genres=878`,
  getDocumentary: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;
export { API_KEY };
