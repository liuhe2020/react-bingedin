import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tmdbApi, API_KEY } from '../api/api';
import MovieSinglePoster from '../components/MovieSinglePoster';
import Loader from '../components/Loader';

export default function Search({ debouncedTerm, page, setPage }) {
  const [movies, setMovies] = useState([]);
  const [pageTotal, setPageTotal] = useState(1);
  const [movieTotal, setMovieTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  // fetch data at search debouncedTerm change
  useEffect(() => {
    if (!debouncedTerm) {
      setMovies([]);
      setMovieTotal(0);
      setPageTotal(1);
      return;
    } // prevent fetching at initial load since debouncedTerm is empty

    setLoading(true);

    const getSearch = async () => {
      const { data } = await tmdbApi.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedTerm}&page=1`);
      setMovies(data.results);
      setMovieTotal(data.total_results);
      setPageTotal(data.total_pages);
      setLoading(false);
    };
    getSearch();
  }, [debouncedTerm]);

  // fetch next page when user clicks load more button
  // useEffect(() => {
  //   if (page === 1) return;

  //   setLoading(true);

  //   const getNextPage = async () => {
  //     const { data } = await axios.get(`/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedTerm}&page=${page}`);
  //     setMovies((prev) => [...prev, ...data.results]);
  //     setLoading(false);
  //   };

  //   getNextPage();
  // }, [debouncedTerm, page]);

  return (
    <SearchContainer>
      {!debouncedTerm ? (
        <p>Start your search by typing into the search box.</p>
      ) : movies.length === 0 ? (
        <p>Your search for "{debouncedTerm}" did not have any matches. Please try a different keyword.</p>
      ) : (
        <>
          <p>
            Your search for "{debouncedTerm}" has {movieTotal} results.
          </p>
          <ResultContainer>
            {movies.map((movie, index) => (
              <MovieSinglePoster key={index} id={movie.id} poster={movie.poster_path} title={movie.title || movie.name} />
            ))}
          </ResultContainer>
          {loading && <Loader />}
          {page < pageTotal && <LoadButton onClick={() => setPage((prev) => prev + 1)}>Load More</LoadButton>}
        </>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 2% 0 2%;

  p {
    color: #ddd;
    margin-bottom: 2rem;
  }

  @media (min-width: 1440px) {
    padding-top: 6%;
  }

  @media (max-width: 600px) {
    padding-top: 2%;
  }
`;

const ResultContainer = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;

  // width calculated based on number of images and taking into account of grid gap
  @media (min-width: 251px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, calc((100% - 5px) / 2)));
  }

  @media (min-width: 451px) {
    grid-template-columns: repeat(auto-fit, minmax(100px, calc((100% - 10px) / 3)));
  }

  @media (min-width: 601px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, calc((100% - 15px) / 4)));
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, calc((100% - 20px) / 5)));
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(auto-fit, minmax(120px, calc((100% - 30px) / 7)));
  }
`;

const LoadButton = styled.button`
  display: block;
  width: 11rem;
  outline: none;
  border: none;
  font-size: 1.2rem;
  font-weight: 700;
  border-radius: 0.2rem;
  padding: 0.7rem 1.8rem;
  margin: 4vw auto;
  color: #ddd;
  background-color: #333;
  cursor: pointer;

  &:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }
`;
