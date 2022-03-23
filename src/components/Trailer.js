import { useState, useEffect } from 'react';
import styled from 'styled-components';
import YouTube from 'react-youtube';
import axios from './API';
import { API_KEY } from './Requests';

function Trailer({ id, setIsTrailer, setIsPlaying }) {
  const [trailer, setTrailer] = useState('');

  // set options https://www.npmjs.com/package/react-youtube
  const opts = {
    playerVars: { autoplay: 1 },
  };

  // set state based on playback https://developers.google.com/youtube/iframe_api_reference#Events
  const handleOnStateChange = (e) => {
    e.data === 1 ? setIsPlaying(true) : setIsPlaying(false);
  };

  useEffect(() => {
    async function getTrailer() {
      const { data } = await axios.get(
        `/movie/${id}/videos?api_key=${API_KEY}&language=en-US`
      );
      setTrailer(data.results[0]?.key);
      return data;
    }
    getTrailer();
  }, [id]);

  return (
    <PlayerContainer>
      <Player>
        <YouTube
          videoId={trailer}
          opts={opts}
          onStateChange={handleOnStateChange}
          onEnd={() => setIsTrailer(false)}
        />
      </Player>
    </PlayerContainer>
  );
}

export default Trailer;

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
