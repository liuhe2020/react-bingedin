import { useState, useContext } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import Modal from './Modal';
import { GlobalContext } from '../context/GlobalState';

function MovieSinglePoster({ id, poster, title, isButton }) {
  const [modalOpen, setModalOpen] = useState(false);

  // first part of movie URL from TMDB with image width of 185px
  const movieBaseURL = 'https://image.tmdb.org/t/p/w185';

  // get values from GlobalContext object
  const { removeWatchList } = useContext(GlobalContext);

  return (
    <Wrapper hasPoster={poster}>
      <img
        src={poster ? `${movieBaseURL}${poster}` : `./images/img_unavail.jpg`}
        alt={title}
      />
      <div onClick={() => setModalOpen(true)}>
        <span>{title}</span>
      </div>
      {isButton && (
        <motion.button
          whileHover={{ scale: 1.2 }}
          onClick={() => removeWatchList(id)}
        >
          <RemoveCircleIcon />
        </motion.button>
      )}
      <Modal open={modalOpen} id={id} onClose={() => setModalOpen(false)} />
    </Wrapper>
  );
}

export default MovieSinglePoster;

const Wrapper = styled.div`
  cursor: pointer;
  position: relative;
  height: 100%;
  overflow: hidden;
  // display movie title if doesn't have poster
  color: ${(props) => (props.hasPoster ? 'transparent' : '#999')};

  div {
    position: absolute;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    font-size: 1vw;
    font-weight: 600;
    z-index: 1;
    padding: 10%;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition: all 0.2s;

    @media (max-width: 1000px) {
      font-size: 11px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    border-radius: 0.2vw;
    transition: all 0.3s;
  }

  button {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    z-index: 2;
    background-color: transparent;
    color: #ddd;
    border: none;
    cursor: pointer;
    opacity: 0;
    transition: all 0.3;

    @media (max-width: 768px) {
      opacity: 1;
    }
  }

  &:hover {
    color: #ddd;

    div {
      background-color: rgba(0, 0, 0, 0.8);
    }
    img {
      transform: scale(1.2);
    }

    button {
      opacity: 1;
    }
  }
`;
