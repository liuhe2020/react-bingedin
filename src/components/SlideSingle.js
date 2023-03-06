import { useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { fetcher, API_KEY } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function SlideSingle({ movie }) {
  // isTrailer tracks when play trailer button is clicked, if yes, render trailer iframe, else render image
  const [isTrailer, setIsTrailer] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playerEvent, setPlayerEvent] = useState(null);

  const { ref, inView } = useInView();

  const movieURL = 'https://image.tmdb.org/t/p/w1280';

  const { data, isSuccess } = useQuery([movie.id], () => fetcher(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`), {
    staleTime: 1000 * 60 * 60,
    select: (data) => data.results[0]?.key,
  });

  // truncate movie description into excerpt, n = number of characters
  const truncate = (string, n) => (string?.length > n ? string.substr(0, n - 1) + '...' : string);

  const opts = {
    playerVars: { autoplay: 1, controls: 0, fs: 0, modestbranding: 1 },
  };

  // set state based on playback https://developers.google.com/youtube/iframe_api_reference#Events
  const handleOnStateChange = (e) => {
    e.data === 1 ? setIsPlaying(true) : setIsPlaying(false);
  };

  // effect to pause video when user scroll out of view or change slide, targets an empty div on the DOM as targeting any other container div doesn't work with useInView, bug?
  useEffect(() => {
    if (!inView && playerEvent) {
      playerEvent.pauseVideo();
    }
  }, [inView]);

  return (
    <Slide key={movie.id}>
      {isTrailer ? (
        <PlayerContainer>
          <Player>
            {isSuccess && (
              <YouTube
                videoId={data}
                opts={opts}
                onReady={(e) => {
                  setPlayerEvent(e.target);
                }}
                onStateChange={handleOnStateChange}
                onEnd={() => setIsTrailer(false)}
              />
            )}
          </Player>
        </PlayerContainer>
      ) : (
        <img loading='lazy' src={`${movieURL}${movie.backdrop_path}`} alt={movie?.title || movie?.name || movie?.original_title} />
      )}
      <Info>
        {!isPlaying && <h1>{movie?.title || movie?.name || movie?.original_title}</h1>}
        {!isTrailer && <button onClick={() => setIsTrailer(true)}>Play Trailer</button>}
        {!isPlaying && <p>{truncate(movie.overview, 200)}</p>}
      </Info>
      <Overlay>
        <Ref ref={ref} />
      </Overlay>
    </Slide>
  );
}

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

const PlayerContainer = styled.div`
  height: 35.9vw;
  overflow: hidden;
`;

const Player = styled.div`
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    left: 0;
    top: -15%;
    height: 100%;
    width: 100%;
    position: absolute;
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

const Ref = styled.div`
  width: 1px;
  height: 100%;
`;
