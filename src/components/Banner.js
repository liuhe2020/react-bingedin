import styled from 'styled-components';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import { fetcher, requests } from '../api/api';
import SlideSingle from './SlideSingle';
import { useQuery } from '@tanstack/react-query';
import shuffleArray from '../utils/shuffleArray';

export default function Banner() {
  const { data, isSuccess } = useQuery(['trending'], () => fetcher(requests.getTrending), {
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
      {isSuccess && (
        <BannerSlider {...settings}>
          {data.map((movie) => (
            <SlideSingle key={movie.id} movie={movie} />
          ))}
        </BannerSlider>
      )}
    </>
  );
}

const BannerSlider = styled(Slider)`
  height: 35.9vw;

  .slick-dots {
    bottom: -1.5vw;

    li {
      margin: 0;

      @media (min-width: 1920px) {
        margin: 0.5rem;
      }

      button:before {
        font-size: 0.8vw;
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
