import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

const StyledCarousel = styled.div`
  position: relative;
  width: 70vw;
  height: 980px;
  grid-area: image-carousel;
  margin: auto;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    border-radius: 30px;
  }
`;

const SlideDirection = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  color: #fff;
  padding: 10px 8px 8px 13px;
  margin: 0 20px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 10px;
  height: 100px;
  width: max-content;
  left: 0;

  svg {
    width: 35px;
    fill: rgb(204, 204, 204);
    cursor: pointer;
  }
`;

const Right = styled.div`
  color: #fff;
  padding: 10px 8px 8px 13px;
  margin: 0 20px;
  border-radius: 50%;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 10px;
  right: 0;
  height: 100px;
  width: max-content;

  svg {
    width: 35px;
    fill: rgb(204, 204, 204);
    cursor: pointer;
  }
`;

const Indicator = styled.div`
  margin-top: -50px;
  display: flex;
  justify-content: center;
  gap: 20px;
`;

const DotContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  background-color: rgb(15, 16, 17);
  padding: 0.75rem 1rem;
  border-radius: 10px;
`;

const Dot = styled.div`
  background-color: rgb(153, 153, 153);
  width: 10px;
  height: 10px;
  border-radius: 50%;
  cursor: pointer;

  &.active {
    background-color: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
  }
`;

const Carousel = ({ images }) => {
  // states
  const [currentIndex, setCurrentIndex] = useState(0);

  // context
  const { cart, setCart, theme, setTheme } = useContext(CartContext);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + 1 === images.length ? 0 : prevIndex + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - 1 < 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleDotClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <StyledCarousel>
      <img key={currentIndex} src={images[currentIndex]} alt="game image" />
      <SlideDirection>
        <Left onClick={handlePrevious}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="M400 976 0 576l400-400 56 57-343 343 343 343-56 57Z" />
          </svg>
        </Left>
        <Right onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 96 960 960">
            <path d="m304 974-56-57 343-343-343-343 56-57 400 400-400 400Z" />
          </svg>
        </Right>
      </SlideDirection>
      <Indicator>
        <DotContainer>
          {images.map((_, index) => (
            <Dot
              key={index}
              className={currentIndex === index ? "active" : ""}
              onClick={() => handleDotClick(index)}
            ></Dot>
          ))}
        </DotContainer>
      </Indicator>
    </StyledCarousel>
  );
};

Carousel.propTypes = {
  images: PropTypes.array,
};

export default Carousel;
