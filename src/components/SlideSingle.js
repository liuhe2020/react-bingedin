import { useState } from "react";
import styled from "styled-components";
import Trailer from "./Trailer";

function SlideSingle({ movie }) {
  const [isTrailer, setIsTrailer] = useState(false);

  const movieURL = "https://image.tmdb.org/t/p/w1280";

  // truncate movie description into excerpt, n = number of characters
  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "..." : string;

  return (
    <Slide key={movie.id}>
      {isTrailer ? (
        <Trailer id={movie.id} />
      ) : (
        <img
          src={`${movieURL}${movie.backdrop_path}`}
          alt={movie?.title || movie?.name || movie?.original_title}
        />
      )}
      <Info>
        <h1>{movie?.title || movie?.name || movie?.original_title}</h1>
        <button onClick={() => setIsTrailer(true)}>Play Trailer</button>
        <p>{truncate(movie.overview, 200)}</p>
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
  color: #ddd;

  @media (max-width: 600px) {
    top: 7vw;
  }

  h1 {
    font-size: 2.5vw;
  }

  p {
    font-size: 1.2vw;
    @media (max-width: 600px) {
      display: none;
    }
  }

  button {
    outline: none;
    border: none;
    font-size: 1.2vw;
    font-weight: 700;
    border-radius: 0.2vw;
    padding: 0.5vw 2vw;
    margin: 1.5vw 0 1vw 0;
    color: #ddd;
    background-color: rgba(50, 50, 50, 0.5);
    cursor: pointer;
  }

  button:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(17, 17, 17, 1));
  z-index: 1;
`;
