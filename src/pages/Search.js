import { useEffect } from 'react';
import styled from 'styled-components';
import { tmdbApi, API_KEY } from '../api/api';
import MovieSinglePoster from '../components/MovieSinglePoster';
import Loader from '../components/Loader';
import { useInfiniteQuery } from 'react-query';
import { useInView } from 'react-intersection-observer';

export default function Search({ debouncedTerm }) {
  const { ref, inView } = useInView();

  const fetcher = async (pageParam = 1) => {
    const { data } = await tmdbApi(`/search/movie?api_key=${API_KEY}&language=en-US&query=${debouncedTerm}&page=${pageParam}`);
    return data;
  };

  const { data, fetchNextPage, isFetchingNextPage, status } = useInfiniteQuery(['search', debouncedTerm], ({ pageParam }) => fetcher(pageParam), {
    getNextPageParam: (lastPage) => {
      const { page, total_pages } = lastPage;
      return page < total_pages ? page + 1 : undefined;
    },
    staleTime: 1000 * 60 * 60, // 1 hr no refetch
  });

  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView, fetchNextPage]);

  return (
    <SearchContainer>
      {!debouncedTerm && <p>Start your search by typing into the search box.</p>}
      {status === 'loading' && (
        <HandleContainer>
          <Loader />
        </HandleContainer>
      )}
      {status === 'error' && <p>Failed to load, please try again later.</p>}
      {status === 'success' && (
        <>
          {debouncedTerm && data.pages[0].total_results === 0 && (
            <p>Your search for "{debouncedTerm}" did not have any matches. Please try a different keyword.</p>
          )}
          {debouncedTerm && data.pages[0].total_results !== 0 && (
            <p>
              Your search for "{debouncedTerm}" has {data.pages[0].total_results} results.
            </p>
          )}
          <ResultContainer>
            {data.pages.map((page) =>
              page.results.map((movie) => <MovieSinglePoster key={movie.id} id={movie.id} poster={movie.poster_path} title={movie.title || movie.name} />)
            )}
          </ResultContainer>
          <div ref={ref}>{isFetchingNextPage && <Loader />}</div>
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

const HandleContainer = styled.div`
  padding-top: 30vh;
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
