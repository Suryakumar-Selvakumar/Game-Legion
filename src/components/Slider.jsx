// libs
import Slider from "react-slick";
import { useEffect, useRef } from "react";

// styles
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import PropTypes from "prop-types";

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

  console.log(images);

  return (
    <Slider {...settings} ref={sliderRef}>
      {images?.length > 0 &&
        images.map((image, index) => (
          <div key={index}>
            <img src={image} alt="a game screenshot" />
          </div>
        ))}
    </Slider>
  );
}

SimpleSlider.propTypes = {
  images: PropTypes.array,
};
