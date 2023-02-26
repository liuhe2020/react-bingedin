import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MovieSingleBackdrop from './MovieSingleBackdrop';
import useTMDB from '../utils/useTMDB';
import shuffleArray from '../utils/shuffleArray';

export default function MovieRow({ title, url }) {
  const { data, isLoading, error } = useTMDB(url);

  // settings for react slick slider
  const settings = {
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
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 450,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  if (error) return <div>Error fetching data</div>;
  if (isLoading) return <div>Loading...</div>;

  const movies = shuffleArray(data.results);

  return (
    <RowContainer>
      <h1>{title}</h1>
      <Row {...settings}>
        {movies.map(
          (movie) => movie.backdrop_path && <MovieSingleBackdrop key={movie.id} id={movie.id} poster={movie.backdrop_path} title={movie.title || movie.name} />
        )}
      </Row>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  overflow: hidden;
  padding: 1.5vw 4vw;
  transition: all 0.15s;

  h1 {
    color: #ddd;
    font-size: 1.6vw;
    margin-bottom: 0.7vw;

    @media (max-width: 1300px) {
      margin-bottom: 0.5rem;
      font-size: 1rem;
    }
  }

  .slick-arrow {
    width: 4vw;
    height: 102%;
    z-index: 1;
    transition: all 0.15s;

    &:before {
      visibility: hidden;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }

  &:hover .slick-arrow:before {
    visibility: visible;
  }

  .slick-prev {
    left: -4.1vw;
  }

  .slick-next {
    right: -4.1vw;
  }
`;

const Row = styled(Slider)`
  .slick-list {
    overflow: visible;
  }

  .slick-slide {
    overflow-y: visible;
  }
`;
