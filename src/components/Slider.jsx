// libs
import Slider from "react-slick";
import { useEffect, useRef } from "react";

// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";
import { styled, keyframes } from "styled-components";

const waveLoading = keyframes`
  0%{
    background-position: -240% 0;
  }

  100% {
    background-position: 340% 0;
  }
`;

const GameImage = styled.img`
  background: linear-gradient(
    90deg,
    rgba(46, 46, 46, 1) 0%,
    rgba(73, 73, 73, 0.6) 50%,
    rgba(46, 46, 46, 1) 100%
  );
  background-repeat: no-repeat;
  background-size: 70% 100%;
  background-color: rgb(32, 32, 32);
  animation: ${waveLoading} 3s linear infinite;
`;

export default function SimpleSlider({ images }) {
  const sliderRef = useRef(null);

  useEffect(() => {
    if (sliderRef.current && images?.length > 0) {
      sliderRef.current.slickGoTo(0);
    }
  }, [images]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 350,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings} ref={sliderRef}>
      {images?.length > 0 &&
        images.map((image, index) => (
          <div key={index}>
            <GameImage src={image} alt="a game screenshot" />
          </div>
        ))}
    </Slider>
  );
}

SimpleSlider.propTypes = {
  images: PropTypes.array,
};
