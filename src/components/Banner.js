import { useState, useEffect } from "react";
import styled from "styled-components";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "./API";
import requests from "./Requests";
import SlideSingle from "./SlideSingle";

function Banner() {
  // use state to assign movies to setMovies state to be passed into JSX below
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function getData() {
      // APIs from imported requests from Requests.js file
      const request = await axios.get(requests.getTrending);
      // get the ten random movies using a somewhat random algorithm in requested array
      const sortMovies = request.data.results.sort(() => 0.5 - Math.random());
      const randomTenMovies = sortMovies.slice(0, 10);
      setMovies(randomTenMovies);
      return request;
    }
    getData();
  }, []);

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
    <BannerSlider {...settings}>
      {movies.map((movie) => (
        <SlideSingle key={movie.id} movie={movie} />
      ))}
    </BannerSlider>
  );
}

export default Banner;

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
