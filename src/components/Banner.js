import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetcher, API_KEY } from '../api/api';
import SlideSingle from './SlideSingle';
import { useQuery } from '@tanstack/react-query';
import shuffleArray from '../utils/shuffleArray';

export default function Banner() {
  const { data, isSuccess } = useQuery(['now_playing'], () => fetcher(`/movie/now_playing?api_key=${API_KEY}&language=en-us`), {
    staleTime: 1000 * 60 * 60,
    select: (data) => shuffleArray(data.results.slice(0, 10)),
  });

  // settings for react slick slider
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: false,
  };

  return (
    <>
      {isSuccess ? (
        <BannerSlider {...settings}>
          {data.map((movie) => (
            <SlideSingle key={movie.id} movie={movie} />
          ))}
        </BannerSlider>
      ) : (
        <BannerSlider {...settings}>
          <Skeleton>
            <div>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </Skeleton>
        </BannerSlider>
      )}
    </>
  );
}

const BannerSlider = styled(Slider)`
  @media (max-width: 600px) {
    margin-bottom: 1.5rem;
  }

  .slick-dots {
    bottom: -1.5rem;

    li {
      margin: 0;

      @media (min-width: 1920px) {
        margin: 0.5rem;
      }

      button:before {
        font-size: 0.8rem;
        color: #fff;
        z-index: 1;

        @media (min-width: 1920px) {
          font-size: 1rem;
        }

        @media (max-width: 1024px) {
          font-size: 0.5rem;
        }
      }
    }
  }
`;

export const Skeleton = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 100/35.9;
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

  div {
    position: absolute;
    max-width: 35vw;
    left: 4vw;
    top: 11vw;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 2vw;

    span {
      border-radius: 0.2rem;
    }

    span:nth-child(1) {
      width: 20vw;
      height: 2.5vw;
      background: rgba(100, 100, 100, 0.3);
    }

    span:nth-child(2) {
      width: 12vw;
      height: 2.5vw;
      background: rgba(100, 100, 100, 0.3);
    }

    span:nth-child(3) {
      width: 33vw;
      height: 2.5vw;
      background: rgba(100, 100, 100, 0.3);
    }
  }

  @media (max-width: 600px) {
    top: 7vw;
  }
`;
