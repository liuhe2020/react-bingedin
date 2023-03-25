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
  bottom: 8%;
  right: 4%;
  width: 80%;
  text-align: right;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.25;
  z-index: 2;
  transition: all 0.2s;

  @media (max-width: 1240px) {
    font-size: 0.75rem;
  }

  span {
    background-image: linear-gradient(to right, #111, #111);
    background-origin: 0;
    background-size: 100% 80%;
    background-repeat: repeat-x;
    background-position: -100% 100%;
  }
`;
