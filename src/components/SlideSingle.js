import { useEffect, useState } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import { fetcher, API_KEY } from '../api/api';
import { useQuery } from '@tanstack/react-query';
import { useInView } from 'react-intersection-observer';

export default function SlideSingle({ movie }) {
  // isTrailer tracks when play trailer button is clicked, if yes, render trailer iframe, else render image
  const [playerStatus, setPlayerStatus] = useState('initial');
  const [playerEvent, setPlayerEvent] = useState(null); // get Youtube player from their API so we can control the events on the player

  const { ref, inView } = useInView();

  const movieURL = 'https://image.tmdb.org/t/p/w1280';

  const { data, isSuccess } = useQuery([movie.id], () => fetcher(`/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`), {
    staleTime: 1000 * 60 * 60,
  });

  // truncate movie description into excerpt, n = number of characters
  const truncate = (string, n) => (string?.length > n ? string.substr(0, n - 1) + '...' : string);

  const opts = {
    playerVars: { autoplay: 1, controls: 0, fs: 0, modestbranding: 1 },
  };

  // set state based on playback https://developers.google.com/youtube/iframe_api_reference#Events
  const handleOnStateChange = (e) => {
    e.data === 0 && setPlayerStatus('initial');
    e.data === 1 && setPlayerStatus('playing');
    e.data === 2 && setPlayerStatus('paused');
  };

  const handleOnClick = () => {
    playerStatus !== 'paused' ? setPlayerStatus('playing') : playerEvent.playVideo();
  };

  // effect to pause video when user scroll out of view or change slide, targets an empty div on the DOM as targeting any other container div doesn't work with useInView, bug?
  useEffect(() => {
    if (!inView && playerEvent) {
      playerEvent.pauseVideo();
    }
  }, [inView, playerEvent]);

  return (
    <Slide key={movie.id}>
      {playerStatus === 'initial' ? (
        <img src={`${movieURL}${movie.backdrop_path}`} alt={movie?.title || movie?.original_title} />
      ) : (
        <PlayerContainer>
          <Player>
            {isSuccess && (
              <YouTube
                videoId={data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer')[0]?.key}
                opts={opts}
                onReady={(e) => {
                  setPlayerEvent(e.target);
                }}
                onStateChange={handleOnStateChange}
                onEnd={() => {
                  setPlayerStatus('initial');
                  setPlayerEvent(null);
                }}
              />
            )}
          </Player>
        </PlayerContainer>
      )}
      {playerStatus !== 'playing' && (
        <Info>
          <h1>{movie?.title || movie?.original_title}</h1>
          <button onClick={handleOnClick}>{playerStatus !== 'paused' ? 'Play Trailer' : 'Resume'}</button>
          <p>{truncate(movie.overview, 200)}</p>
        </Info>
      )}
      <Overlay>
        <Ref ref={ref} />
      </Overlay>
    </Slide>
  );
}

const Slide = styled.div`
  position: relative;
  cursor: grab;

  img {
    width: 100%;
    aspect-ratio: 100/35.9;
    display: block;
    object-fit: cover;
    object-position: 50% 30%;
  }
`;

const PlayerContainer = styled.div`
  width: 100%;
  aspect-ratio: 100/35.9;
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
  max-width: 36rem;
  left: 4%;
  top: 30%;
  z-index: 1;
  color: #fff;

  h1 {
    font-size: 2.5rem;
    text-shadow: 1px 1px 1px #000;
  }

  p {
    font-size: 1.25rem;
    text-shadow: 1px 1px 1px #000;
    margin-top: 1.5rem;
  }

  button {
    outline: none;
    border: none;
    font-size: 1.25rem;
    font-weight: 700;
    border-radius: 0.25rem;
    padding: 0.5rem 2rem;
    margin-top: 1.5rem;
    color: #fff;
    background-color: rgba(50, 50, 50, 0.5);
    cursor: pointer;
  }

  button:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }

  @media (max-width: 1240px) {
    p {
      display: none;
    }
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 1.5rem;
    }

    button {
      font-size: 1rem;
      margin-top: 1rem;
    }
  }

  @media (max-width: 600px) {
    top: 15%;

    h1 {
      font-size: 1rem;
    }

    button {
      font-size: 0.75rem;
      margin-top: 0.75rem;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  aspect-ratio: 100/7;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(17, 17, 17, 1));
  z-index: 1;
`;

const Ref = styled.div`
  width: 1px;
  height: 100%;
`;
