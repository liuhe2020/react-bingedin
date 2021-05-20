import { useState } from "react";
import styled from "styled-components";
import Modal from "./Modal";

function MovieSingleBackdrop({ id, poster, title }) {
  const [modalOpen, setModalOpen] = useState(false);

  // first part of movie URL from TMDB with image width of 300px
  const movieBaseURL = "https://image.tmdb.org/t/p/w300";

  return (
    <Wrapper>
      <img
        src={poster ? `${movieBaseURL}${poster}` : `./images/img_unavail.jpg`}
        alt={title}
      />
      <div onClick={() => setModalOpen(true)}></div>
      <p onClick={() => setModalOpen(true)}>
        <span>{title}</span>
      </p>
      <Modal open={modalOpen} id={id} onClose={() => setModalOpen(false)} />
    </Wrapper>
  );
}

export default MovieSingleBackdrop;

const Wrapper = styled.div`
  position: relative;
  cursor: pointer;
  transition: all 0.3s;

  img {
    display: block;
    width: 98%;
    border-radius: 0.2vw;
  }

  div {
    position: absolute;
    top: 0;
    left: 0;
    width: 98%;
    height: 100%;
    z-index: 1;
  }

  p {
    color: #ddd;
    position: absolute;
    bottom: 0.5vw;
    right: 1vw;
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
  }

  &:hover {
    z-index: 3;
    transform: scale(1.3);

    img {
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5), 0 6px 6px rgba(0, 0, 0, 0.6);
    }
  }
`;
