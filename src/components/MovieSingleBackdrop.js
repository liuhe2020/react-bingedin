import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import styled from 'styled-components';
import Modal from './Modal';
import { Skeleton } from './MovieRow';

export default function MovieSingleBackdrop({ id, poster, title }) {
  const [modalOpen, setModalOpen] = useState(false);

  // first part of movie URL from TMDB with image width of 300px
  const movieBaseURL = 'https://image.tmdb.org/t/p/w300';

  return (
    <>
      <Container onClick={() => setModalOpen(true)}>
        {poster ? <img src={`${movieBaseURL}${poster}`} alt={title} /> : <Skeleton />}
        <Wrapper>
          <span>{title}</span>
        </Wrapper>
      </Container>
      <AnimatePresence>{modalOpen && <Modal key='modal-backdrop' id={id} onClose={() => setModalOpen(false)} />}</AnimatePresence>
    </>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  img {
    width: 100%;
    aspect-ratio: 16/9;
  }

  &:hover {
    z-index: 3;
    transform: scale(1.3);

    img {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.6);
    }
  }
`;

const Wrapper = styled.div`
  color: #ddd;
  position: absolute;
  bottom: 0.7vw;
  right: 0.7vw;
  width: 12vw;
  text-align: right;
  font-size: 1vw;
  font-weight: 600;
  line-height: 1.2vw;
  z-index: 2;
  transition: all 0.2s;

  @media (max-width: 1000px) {
    font-size: 11px;
    line-height: 13px;
    width: 130px;
    bottom: 0.5rem;
    right: 0.7rem;
  }

  span {
    background-image: linear-gradient(to right, #111, #111);
    background-origin: 0;
    background-size: 100% 80%;
    background-repeat: repeat-x;
    background-position: -100% 100%;
  }
`;
