import { useContext } from 'react';
import styled from 'styled-components';
import MovieSinglePoster from '../components/MovieSinglePoster';
import { GlobalContext } from '../context/GlobalState';

export default function WatchList() {
  // get values from GlobalContext object
  const { watchlist } = useContext(GlobalContext);

  return (
    <ListContainer>
      {watchlist.length !== 0 ? (
        <>
          <h1>Watch List</h1>
          <List>
            {watchlist.map((movie) => (
              <MovieSinglePoster
                key={movie.id}
                id={movie.id}
                poster={movie.poster_path}
                title={movie.title || movie.name}
                isButton={true}
              />
            ))}
          </List>
        </>
      ) : (
        <p>
          The watch list is empty. Please click on a movie and select "+" on the
          pop-up page to add it to the list.
        </p>
      )}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 2% 0 2%;
  color: #ddd;

  h1 {
    font-size: 1.6vw;
    margin-bottom: 2rem;
  }

  @media (min-width: 1440px) {
    padding-top: 6%;
  }

  @media (max-width: 600px) {
    padding-top: 2%;
  }
`;

const List = styled.div`
  display: grid;
  grid-auto-rows: auto;
  grid-gap: 5px;

  // width calculated based on number of images and taking into account of grid gap
  @media (min-width: 251px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(100px, calc((100% - 5px) / 2))
    );
  }

  @media (min-width: 451px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(100px, calc((100% - 10px) / 3))
    );
  }

  @media (min-width: 601px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(120px, calc((100% - 15px) / 4))
    );
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(120px, calc((100% - 20px) / 5))
    );
  }

  @media (min-width: 1025px) {
    grid-template-columns: repeat(
      auto-fit,
      minmax(120px, calc((100% - 30px) / 7))
    );
  }

  p {
    color: #ddd;
    grid-column: 1 / span 7;
  }
`;
