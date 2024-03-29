import { useRef, useContext } from 'react';
import ReactDom from 'react-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { XCircleIcon, StarIcon, PlusCircleIcon, MinusCircleIcon } from '@heroicons/react/24/solid';
import { fetcher, API_KEY } from '../api/api';
import { GlobalContext } from '../context/GlobalState';
import { useQueries } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';

export default function Modal({ id, onClose }) {
  const { addWatchList, removeWatchList, watchlist } = useContext(GlobalContext);

  // check if movie exists already in watchlist
  const isWatchList = watchlist.find((movie) => movie.id === id) ? true : false;

  const modalRef = useRef();
  // if backdrop clicked, run onClose function to close modal
  const closeModal = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  const results = useQueries({
    queries: [
      {
        queryKey: [`${id}-details`, id],
        queryFn: () => fetcher(`/movie/${id}?api_key=${API_KEY}&language=en-US`),
        staleTime: 1000 * 60 * 60,
        select: (data) => {
          return {
            id: data.id,
            title: data.title,
            runtime: data.runtime,
            release_date: data.release_date,
            overview: data.overview,
            original_language: data.original_language.toUpperCase(),
            vote_average: data.vote_average ? Math.round(data.vote_average * 10) / 10 : 'Unrated',
            genres: data.genres.map((i) => i.name).join(', '),
            production_companies: data.production_companies.map((i) => i.name).join(', '),
            poster_path: data.poster_path,
          };
        },
      },
      {
        queryKey: [`${id}-video`, id],
        queryFn: () => fetcher(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
        staleTime: 1000 * 60 * 60,
        select: (data) => data.results.filter((v) => v.site === 'YouTube' && v.type === 'Trailer')[0]?.key,
      },
      {
        queryKey: [`${id}-credits`, id],
        queryFn: () => fetcher(`/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
        staleTime: 1000 * 60 * 60,
        select: (data) => {
          return {
            cast: data.cast
              .slice(0, 10)
              .map((c) => c.name)
              .join(', '),
            directors: data.crew
              .filter((c) => c.job === 'Director')
              .map((c) => c.name)
              .join(', '),
          };
        },
      },
    ],
  });

  const isSuccess = results.every((q) => q.isSuccess === true);

  // use createPortal to append modal to the body with id 'modal'
  return ReactDom.createPortal(
    <>
      <ModalContainer
        ref={modalRef}
        onClick={closeModal}
        initial={{ opacity: 0, overflowY: 'hidden' }} // animate overflow to stop scrollbar from flashing on component dismount
        animate={{ opacity: 1, overflowY: 'scroll' }}
        exit={{ opacity: 0, overflowY: 'hidden' }}
      >
        {isSuccess && (
          <Container initial={{ marginTop: '100%' }} animate={{ marginTop: '8%' }} exit={{ marginTop: '100%' }} transition={{ type: 'tween' }}>
            <Player>
              <iframe
                width='853'
                height='480'
                src={`https://www.youtube.com/embed/${results[1].data}`}
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                allowFullScreen
                title='Embedded youtube'
              />
            </Player>
            <Detail>
              <TitleWrapper>
                <h1>{results[0].data.title}</h1>
                {isWatchList ? (
                  <StyledButton
                    onClick={() => {
                      removeWatchList(id);
                      toast('Removed from watch list');
                    }}
                  >
                    <StyledMinusCircleIcon />
                    Watch List
                  </StyledButton>
                ) : (
                  <StyledButton
                    onClick={() => {
                      addWatchList(results[0].data);
                      toast('Added to watch list');
                    }}
                  >
                    <StyledPlusCircleIcon />
                    Watch List
                  </StyledButton>
                )}
              </TitleWrapper>
              <Info>
                <StyledStarIcon />
                <span>{results[0].data.vote_average}</span>
                <p>{`${results[0].data.runtime} mins`}</p>
                <p>{results[0].data.release_date}</p>
              </Info>
              <Overview>{results[0].data.overview}</Overview>
              <Credits>
                <p>
                  Genres:
                  <span>{results[0].data.genres}</span>
                </p>
                <p>
                  Language:
                  <span>{results[0].data.original_language}</span>
                </p>
                <p>
                  Cast: <span>{results[2].data.cast}</span>
                </p>
                <p>
                  Director: <span>{results[2].data.directors}</span>
                </p>
                <p>
                  Production: <span>{results[0].data.production_companies}</span>
                </p>
              </Credits>
            </Detail>
            <WrapXCircleIcon onClick={onClose} whileHover={{ scale: 1.1 }}>
              <StyledXCircleIcon />
            </WrapXCircleIcon>
          </Container>
        )}
      </ModalContainer>
    </>,
    document.getElementById('modal')
  );
}

const ModalContainer = styled(motion.div)`
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.8);
`;

const Container = styled(motion.div)`
  position: relative;
  width: 55%;
  margin-left: auto;
  margin-right: auto;
  background-color: #181818;
  color: #ddd;
  border-radius: 0.5rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.65), 0 6px 6px rgba(0, 0, 0, 0.7);

  @media (max-width: 1023px) {
    width: 70%;
  }

  @media (max-width: 767px) {
    width: 80%;
  }
`;

const WrapXCircleIcon = styled(motion.div)`
  position: absolute;
  top: -0.8rem;
  right: -0.8rem;
  cursor: pointer;
`;

const Player = styled.div`
  padding-bottom: 56.25%;
  position: relative;

  iframe {
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    position: absolute;
  }
`;

const Detail = styled.div`
  position: relative;
  padding: 2rem 3rem;
  overflow: hidden;

  @media (max-width: 767px) {
    padding: 1.5rem;
  }
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 0.75rem;

  span {
    margin: 0 1rem 0 0.2rem;
  }

  p {
    margin-right: 1rem;
  }
`;

const StyledButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.3rem;
  min-width: 8rem;
  outline: none;
  border: none;
  font-size: 0.875rem;
  font-weight: 600;
  border-radius: 0.2rem;
  padding: 0.5rem 0.5rem 0.5rem 0.2rem;
  color: #ddd;
  background-color: #333;
  cursor: pointer;

  &:hover {
    color: #111;
    background-color: #ddd;
    transition: all 0.2s;
  }
`;

const Overview = styled.div`
  font-size: 1.125rem;
  margin-bottom: 2.5rem;
`;

const Credits = styled.div`
  p {
    font-size: 1rem;
    color: #aaa;
    margin-bottom: 0.5rem;
  }

  span {
    font-size: 1rem;
    color: #ddd;
    margin-left: 0.25rem;
  }
`;

const StyledXCircleIcon = styled(XCircleIcon)`
  width: 1.5rem;
`;

const StyledStarIcon = styled(StarIcon)`
  width: 1.5rem;
  color: #ffca63;
`;

const StyledPlusCircleIcon = styled(PlusCircleIcon)`
  width: 1.5rem;
`;

const StyledMinusCircleIcon = styled(MinusCircleIcon)`
  width: 1.5rem;
`;
