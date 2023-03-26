import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieSingleBackdrop from './MovieSingleBackdrop';
import shuffleArray from '../utils/shuffleArray';
import { fetcher } from '../api/api';
import { useQuery } from '@tanstack/react-query';

export default function MovieRow({ title, url }) {
  const { data, isSuccess } = useQuery([title], () => fetcher(url), {
    staleTime: 1000 * 60 * 60,
    select: (data) => shuffleArray(data.results),
  });

  const PrevBtn = (props) => {
    const { className, onClick } = props;
    return <button className={className} onClick={onClick} />;
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return <button className={className} onClick={onClick} />;
  };

  // settings for react slick slider
  const settings = {
    prevArrow: <PrevBtn />,
    nextArrow: <NextBtn />,
    dots: false,
    infinite: false,
    draggable: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <RowContainer>
      <h1>{title}</h1>
      {!isSuccess ? (
        <Row {...settings}>
          {[...Array(6).keys()].map((i) => (
            <Skeleton key={i} />
          ))}
        </Row>
      ) : (
        <Row {...settings}>
          {data.map(
            (movie) =>
              movie.backdrop_path && <MovieSingleBackdrop key={movie.id} id={movie.id} poster={movie.backdrop_path} title={movie.title || movie.name} />
          )}
        </Row>
      )}
    </RowContainer>
  );
}

const RowContainer = styled.div`
  overflow: hidden;
  padding: 1.5vw 4vw;
  transition: all 0.15s;

  h1 {
    color: #ddd;
    font-size: 1.5rem;
    margin-bottom: 0.75rem;

    @media (max-width: 1240px) {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
  }

  @media (max-width: 767px) {
    padding: 1.5rem 2.25rem;
  }
`;

const Row = styled(Slider)`
  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    overflow-y: visible;

    > div {
      width: 98%;
      border-radius: 0.2vw;
      margin: 0 auto;
    }
  }

  .slick-arrow {
    width: 4vw;
    height: 102%;
    z-index: 1;
    transition: all 0.15s;
    @media (max-width: 767px) {
      width: 2.25rem;
    }

    &:before {
      visibility: hidden;
      font-size: 2rem;
      opacity: 0.85;

      @media (max-width: 1023px) {
        font-size: 1.25rem;
      }
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }

    &:hover:before {
      opacity: 1;
    }
  }

  &:hover .slick-arrow:before {
    visibility: visible;
  }

  .slick-prev {
    left: -4vw;
    @media (max-width: 767px) {
      left: -2.25rem;
    }
  }

  .slick-next {
    right: -4vw;
    @media (max-width: 767px) {
      right: -2.25rem;
    }
  }

  .slick-disabled {
    display: none;
  }
`;

export const Skeleton = styled.div`
  width: 100%;
  aspect-ratio: 16/9;
  background-color: #ededed0f;
  background: linear-gradient(100deg, #ffffff00 40%, #ffffff12 50%, #ffffff00 60%) #ededed0f;
  background-size: 200% 100%;
  background-position-x: 180%;
  animation: 1.6s Shine ease-in-out infinite;

  @keyframes Shine {
    to {
      background-position-x: -20%;
    }
  }
`;
