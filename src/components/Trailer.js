import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "./API";
import { API_KEY } from "./Requests";

function Trailer({ id }) {
  const [trailer, setTrailer] = useState("");

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
        <iframe
          width="853"
          height="480"
          src={`https://www.youtube.com/embed/${trailer}`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          title="Embedded youtube"
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
