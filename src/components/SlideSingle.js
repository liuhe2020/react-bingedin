import { useState } from 'react';
import styled from 'styled-components';
import Trailer from './Trailer';

function SlideSingle({ movie }) {
  // isTrailer tracks when play trailer button is clicked
  // if yes, render trailer iframe, else render image
  const [isTrailer, setIsTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const movieURL = 'https://image.tmdb.org/t/p/w1280';

  // truncate movie description into excerpt, n = number of characters
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + '...' : string;

  return (
    <Slide key={movie.id}>
      {isTrailer ? (
        <Trailer
          id={movie.id}
          setIsTrailer={setIsTrailer}
          setIsPlaying={setIsPlaying}
        />
      ) : (
        <img
          loading='lazy'
          src={`${movieURL}${movie.backdrop_path}`}
          alt={movie?.title || movie?.name || movie?.original_title}
        />
      )}
      <Info>
        {!isPlaying && (
          <h1>{movie?.title || movie?.name || movie?.original_title}</h1>
        )}
        {!isTrailer && (
          <button onClick={() => setIsTrailer(true)}>Play Trailer</button>
        )}
        {!isPlaying && <p>{truncate(movie.overview, 200)}</p>}
      </Info>
      <Overlay />
    </Slide>
  );
}

export default SlideSingle;

const Slide = styled.div`
  position: relative;

  img {
    width: 100%;
    height: 35.9vw;
    display: block;
    object-fit: cover;
    object-position: 50% 30%;
  }
`;

const Info = styled.div`
  position: absolute;
  max-width: 35vw;
  left: 4vw;
  top: 11vw;
  z-index: 1;
  color: #fff;

  h1 {
    font-size: 2.5vw;
    text-shadow: 1px 1px 1px #000;
  }

  p {
    font-size: 1.2vw;
    text-shadow: 1px 1px 1px #000;
    margin-top: 1vw;
  }

  button {
    outline: none;
    border: none;
    font-size: 1.2vw;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.5vw 2vw;
    margin-top: 1.5vw;
    color: #fff;
    background-color: rgba(50, 50, 50, 0.5);
    cursor: pointer;
  }

  button:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1rem;
    }

    button {
      font-size: 0.8rem;
    }
  }

  @media (max-width: 600px) {
    top: 7vw;

    p {
      display: none;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 7vw;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(17, 17, 17, 1));
  z-index: 1;
`;
