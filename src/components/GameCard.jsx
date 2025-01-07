// libs
import { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";
import { motion } from "motion/react";

// components

// assets
import pcIcon from "../assets/icons/windows.svg";
import playStationIcon from "../assets/icons/playstation.svg";
import xboxIcon from "../assets/icons/xbox.svg";
import nintendoIcon from "../assets/icons/nintendo.svg";
import appleIcon from "../assets/icons/apple.svg";
import androidIcon from "../assets/icons/android.svg";
import placeHolderImage from "../assets/icons/placeholder-image.jpg";
import { CartContext } from "./CartContext";

const GameCardDetails = styled.div`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  & > div:first-child {
    display: flex;
    justify-content: space-between;
    color: rgb(153, 153, 153);
    font-size: 1rem;
  }

  div > button {
    background-color: rgb(32, 32, 32);
    border: none;
    outline: none;
    color: rgb(153, 153, 153);
    padding: 0;
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  div > button > svg {
    width: 25px;
  }
`;

const Icons = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.5rem;
  align-items: center;

  img {
    width: 15px;
    height: 16px;
  }
`;

const GameName = styled.p`
  color: white;
  font-family: myFontBold;
  font-size: 1.375rem;
  line-height: 1;
  padding: 0.25rem 0;
  cursor: pointer;
`;

const StyledGameCard = styled.div`
  display: grid;
  grid-template-rows: 250px 150px;
  background-color: rgb(32, 32, 32);
  border-radius: 20px;
  transition: transform 400ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const ImageContainer = styled.div`
  cursor: pointer;
  width: 100%;
  height: 100%;

  .MuiSkeleton-root {
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
  }
`;

const GameImage = styled.img`
  object-fit: fill;
  height: 250px;
  width: 100%;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  cursor: pointer;
`;

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoading: true,
      animateTap: false,
    };

    this.setImageLoading = this.setImageLoading.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setAnimateTap = this.setAnimateTap.bind(this);
  }

  setAnimateTap() {
    this.setState((state) => ({
      ...state,
      animateTap: !state.animateTap,
    }));
  }

  setImageLoading() {
    this.setState((state) => ({
      ...state,
      imageLoading: false,
    }));
  }

  existingItem = (cart) =>
    cart.find((cartItem) => cartItem.id === this.props.gameDetails.id);

  addToCart() {
    const { cart, setCart, theme, setTheme } = this.context;

    const cartGameDetails = {
      id: this.props.gameDetails.id,
      name: this.props.gameDetails.name,
      image: this.props.gameDetails.image,
      price: this.props.gameDetails.price,
    };

    if (!this.existingItem(cart)) {
      setCart([...cart, cartGameDetails]);
      this.setAnimateTap();
    }
  }

  static contextType = CartContext;

  render() {
    const { cart, setCart, theme, setTheme } = this.context;

    return (
      <motion.div
        animate={this.state.animateTap ? { scale: 0.95 } : { scale: 1 }}
        transition={{
          duration: 0.065,
          ease: "easeInOut",
        }}
        onAnimationComplete={() => {
          if (this.state.animateTap) {
            this.setAnimateTap();
          }
        }}
      >
        <StyledGameCard>
          <ImageContainer>
            {this.state.imageLoading && (
              <Skeleton
                variant="rectangular"
                width="100%"
                height="100%"
                animation="pulse"
              />
            )}
            <GameImage
              src={
                this.props.gameDetails.image !== null
                  ? this.props.gameDetails.image
                  : placeHolderImage
              }
              alt={this.props.gameDetails.name}
              onLoad={this.setImageLoading}
              style={{
                display: this.state.imageLoading ? "none" : "block",
              }}
            />
          </ImageContainer>
          <GameCardDetails>
            <div>
              <button
                onClick={this.addToCart}
                style={{
                  color: this.existingItem(cart)
                    ? theme.currentTheme === "norse"
                      ? "#46afe8"
                      : "#ff5a5a"
                    : "white",
                }}
              >
                {!this.existingItem(cart) ? (
                  "Add to cart +"
                ) : (
                  <>
                    Added
                    <svg
                      fill={
                        theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"
                      }
                      viewBox="0 0 1024 1024"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                      <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />

                      <g id="SVGRepo_iconCarrier">
                        <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
                      </g>
                    </svg>
                  </>
                )}
              </button>
              <p>${this.props.gameDetails.price}</p>
            </div>
            <Icons>
              {this.props.gameDetails.platforms?.includes("PC") && (
                <img src={pcIcon} alt="pc icon" />
              )}
              {this.props.gameDetails.platforms?.includes("PlayStation") && (
                <img
                  src={playStationIcon}
                  alt="playstation icon"
                  style={{
                    width: "17.5px",
                    height: "17.5px",
                  }}
                />
              )}
              {this.props.gameDetails.platforms?.includes("Xbox") && (
                <img src={xboxIcon} alt="xbox icon" />
              )}
              {this.props.gameDetails.platforms?.includes("Nintendo") && (
                <img
                  src={nintendoIcon}
                  alt="nintendo icon"
                  style={{
                    width: "17.5px",
                    height: "17.5px",
                  }}
                />
              )}
              {this.props.gameDetails.platforms?.includes("Android") && (
                <img src={androidIcon} alt="android icon" />
              )}
              {this.props.gameDetails.platforms?.includes(
                "Apple Macintosh"
              ) && (
                <img
                  src={appleIcon}
                  alt="apple icon"
                  style={{
                    width: "17.5px",
                    height: "17.5px",
                  }}
                />
              )}
            </Icons>
            <GameName>{this.props.gameDetails.name}</GameName>
          </GameCardDetails>
        </StyledGameCard>
      </motion.div>
    );
  }
}

GameCard.propTypes = {
  gameDetails: PropTypes.object,
};

export default GameCard;

export { GameName };
