import { useContext } from 'react';
import styled from 'styled-components';
import MovieSinglePoster from '../components/MovieSinglePoster';
import { GlobalContext } from '../context/GlobalState';
import { PlusCircleIcon } from '@heroicons/react/24/solid';

export default function WatchList() {
  const { watchlist } = useContext(GlobalContext);

  return (
    <ListContainer>
      {watchlist.length !== 0 ? (
        <>
          <h1>Watch List</h1>
          <List>
            {watchlist.map((movie) => (
              <MovieSinglePoster key={movie.id} id={movie.id} poster={movie.poster_path} title={movie.title} isButton={true} />
            ))}
          </List>
        </>
      ) : (
        <Desc>
          <span>Your watch list is empty. You can add movies to the list by selecting a movie and hit the</span>
          <StyledButton>
            <StyledPlusCircleIcon />
            Watch List
          </StyledButton>
          <span>button.</span>
        </Desc>
      )}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 100px 4vw 0 4vw;
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

  p {
    color: #ddd;
    grid-column: 1 / span 7;
  }
`;

const Desc = styled.div`
  span {
    line-height: 1.8;
  }

  span:first-child {
    margin-right: 0.3rem;
  }
`;

const StyledButton = styled.div`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  min-width: 6.2rem;
  outline: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  border-radius: 0.2rem;
  padding: 0.3rem 0.3rem 0.3rem 0.1rem;
  color: #ddd;
  background-color: #333;
  vertical-align: text-top;
  margin-right: 0.3rem;
`;

const StyledPlusCircleIcon = styled(PlusCircleIcon)`
  width: 1rem;
`;
