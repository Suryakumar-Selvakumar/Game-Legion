// libs
import { Component, createRef } from "react";
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
import { Link } from "react-router-dom";
import media from "../utils/breakpoints";

const GameCardDetails = styled.section`
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 10px;

  a {
    text-decoration: none;
    cursor: pointer;
  }

  @media ${media.mobile} {
    gap: 5px;
    padding-top: 1rem;
  }
`;

const FirstRow = styled.div`
  display: flex;
  justify-content: space-between;
  color: rgb(153, 153, 153);
  font-size: 1rem;

  button {
    background-color: rgb(32, 32, 32);
    border: none;
    outline: none;
    color: rgb(153, 153, 153);
    border-radius: 2.5px;
    padding: 0;
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
  }

  button:focus-visible {
    box-shadow: 0 0 0 1.5px white;
  }

  svg {
    width: 25px;
  }
`;

const SecondRow = styled.div`
  display: flex;
  justify-content: space-between;

  svg {
    width: 20px;
    cursor: pointer;
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

const WishListButton = styled.button`
  padding: 0;
  border: none;
  background-color: transparent;
`;

const GameName = styled.h3`
  color: white;
  font-family: myFontBold;
  font-size: 1.375rem;
  font-weight: 500;
  line-height: 1;
  padding: 0.25rem 0;
  cursor: pointer;

  @media ${media.mobile} {
    font-size: 1.2rem;
  }
`;

const StyledGameCard = styled.article`
  display: grid;
  grid-template-rows: 250px 150px;
  background-color: rgb(32, 32, 32);
  border-radius: 20px;
  transition: transform 400ms ease;

  &:hover {
    transform: scale(1.05);
  }

  @media ${media.mobile} {
    grid-template-rows: 225px 125px;

    &:hover {
      transform: scale(1);
    }
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

  a {
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

  @media ${media.mobile} {
    height: 225px;
  }
`;

const ScreenReaderText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  -webkit-clip-path: inset(50%);
  clip-path: inset(50%);
  border: 0;
`;

class GameCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoading: true,
      animateTap: false,
      isMobileView: window.matchMedia(media.mobile).matches,
    };

    this.setImageLoading = this.setImageLoading.bind(this);
    this.addToCart = this.addToCart.bind(this);
    this.setAnimateTap = this.setAnimateTap.bind(this);
    this.updateWishList = this.updateWishList.bind(this);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
  }

  handleMediaChange(e, currentView) {
    currentView === "mobile"
      ? this.setIsMobileView(e.matches)
      : this.setIsTabletView(e.matches);
  }

  setIsMobileView(currentState) {
    this.setState((state) => ({
      ...state,
      isMobileView: currentState,
    }));
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
    cart?.find((cartItem) => cartItem.id === this.props.gameDetails.id);

  addToCart() {
    const { cart, setCart } = this.context;

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

  updateWishList() {
    const { wishList, setWishList } = this.context;

    const wishListGameDetails = {
      id: this.props.gameDetails.id,
      name: this.props.gameDetails.name,
      image: this.props.gameDetails.image,
      price: this.props.gameDetails.price,
      platforms: this.props.gameDetails.platforms,
    };

    if (!this.existingItem(wishList)) {
      setWishList([...wishList, wishListGameDetails]);
      this.setAnimateTap();
    } else {
      setWishList(
        wishList.filter((item) => item.id !== this.props.gameDetails.id)
      );
    }
  }

  componentDidMount() {
    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
  }

  componentWillUnmount() {
    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
  }

  static contextType = CartContext;

  render() {
    const { cart, theme, wishList } = this.context;

    return (
      <motion.div
        role="presentation"
        animate={
          !this.state.isMobileView
            ? this.state.animateTap
              ? { scale: 0.95 }
              : { scale: 1 }
            : {}
        }
        transition={{
          duration: 0.05,
          ease: "easeOut",
        }}
        onAnimationComplete={() => {
          if (this.state.animateTap) {
            !this.state.isMobileView && this.setAnimateTap();
          }
        }}
      >
        <StyledGameCard>
          <ImageContainer>
            {this.state.imageLoading && (
              <Skeleton
                role="presentation"
                variant="rectangular"
                width="100%"
                height="100%"
                animation="wave"
              />
            )}
            <Link
              aria-label={`View ${this.props.gameDetails.name}`}
              to={`game/${String(this.props.gameDetails.id)}`}
            >
              <GameImage
                data-testid="game-card-image"
                src={
                  this.props.gameDetails.image !== null
                    ? this.props.gameDetails.image
                    : placeHolderImage
                }
                alt=""
                aria-hidden="true"
                onLoad={this.setImageLoading}
                style={{
                  display: this.state.imageLoading ? "none" : "block",
                }}
              />
            </Link>
          </ImageContainer>
          <GameCardDetails aria-labelledby="game-name-heading">
            <FirstRow>
              <button
                onClick={() => {
                  this.addToCart();
                  document.activeElement.blur();
                }}
                data-testid="add-to-cart"
                style={{
                  color: this.existingItem(cart)
                    ? theme.currentTheme === "norse"
                      ? "#46afe8"
                      : "#ff5a5a"
                    : "white",
                }}
                disabled={this.existingItem(cart)}
                aria-disabled={this.existingItem(cart)}
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
              <ScreenReaderText aria-live="polite">
                {this.existingItem(cart)
                  ? `${this.props.gameDetails.name} added to cart`
                  : ""}
              </ScreenReaderText>
              <p>${this.props.gameDetails.price}</p>
            </FirstRow>
            <SecondRow>
              <Icons>
                <ScreenReaderText>
                  {`Platforms: ${this.props.gameDetails.platforms?.join(", ")}`}
                </ScreenReaderText>
                {this.props.gameDetails.platforms?.includes("PC") && (
                  <img src={pcIcon} alt="" aria-hidden="true" />
                )}
                {this.props.gameDetails.platforms?.includes("PlayStation") && (
                  <img
                    src={playStationIcon}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: "17.5px",
                      height: "17.5px",
                    }}
                  />
                )}
                {this.props.gameDetails.platforms?.includes("Xbox") && (
                  <img src={xboxIcon} alt="" aria-hidden="true" />
                )}
                {this.props.gameDetails.platforms?.includes("Nintendo") && (
                  <img
                    src={nintendoIcon}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: "17.5px",
                      height: "17.5px",
                    }}
                  />
                )}
                {this.props.gameDetails.platforms?.includes("Android") && (
                  <img src={androidIcon} alt="" aria-hidden="true" />
                )}
                {this.props.gameDetails.platforms?.includes(
                  "Apple Macintosh"
                ) && (
                  <img
                    src={appleIcon}
                    alt=""
                    aria-hidden="true"
                    style={{
                      width: "17.5px",
                      height: "17.5px",
                    }}
                  />
                )}
              </Icons>
              <WishListButton
                onClick={this.updateWishList}
                data-testid="wishlist-card-icon"
                aria-label={`Add to wishlist`}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  viewBox="0 0 64 64"
                  xmlns="http://www.w3.org/2000/svg"
                  strokeWidth="3"
                  stroke="#ffffff"
                  fill={
                    this.existingItem(wishList)
                      ? theme.currentTheme === "norse"
                        ? "#46afe8"
                        : "#ff5a5a"
                      : "none"
                  }
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M51,55.4,32.18,39A1,1,0,0,0,31,39L13,55.34a1,1,0,0,1-1.6-.8V9.41a1,1,0,0,1,1-1H51.56a1,1,0,0,1,1,1V54.58A1,1,0,0,1,51,55.4Z"
                      strokeLinecap="round"
                    ></path>
                  </g>
                </svg>
              </WishListButton>
            </SecondRow>
            <Link to={`game/${this.props.gameDetails.id}`}>
              <GameName id="game-name-heading" data-testid="game-card-name">
                {this.props.gameDetails.name}
              </GameName>
            </Link>
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
