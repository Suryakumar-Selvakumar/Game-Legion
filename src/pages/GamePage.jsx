// libs
import styled from "styled-components";

// hooks
import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// utils
import { getAPIURL } from "../utils/getAPIURL";
import { getGamesData } from "../utils/getGamesData";

// components
import Header from "../components/Header";
import { CartContext } from "../components/CartContext";
import SimpleSlider from "../components/Slider";
import { StyledHeader } from "../components/Header";
import getFormattedDate from "../utils/getFormattedDate";
import media from "../utils/breakpoints";

const StyledGamePage = styled.div`
  display: grid;
  background-color: rgb(15, 16, 17);
  width: 100%;
  height: 100vh !important;
  box-sizing: border-box;
  grid-template-rows: min-content 1fr;

  ${StyledHeader} {
    position: static;
  }

  ${StyledHeader}.visible {
    animation: none;
  }

  ${StyledHeader}.hidden {
    animation: none;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 0rem 2.5rem;
  padding-bottom: 2.5rem;
  height: 100% !important;
  width: 100%;
  box-sizing: border-box;

  @media ${media.mobile} {
    width: calc(100dvw - 2.5rem) !important;
    padding: 0;
    margin: 0 auto;
    padding-bottom: 2rem;
    gap: 0.25rem;
  }
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 77.5px;

  @media ${media.mobile} {
    width: calc(100dvw - 2.5rem);
    padding: 0.75rem 0;
    padding-top: 2rem;
    gap: 1.5rem;
  }
`;

const BackButton = styled.div`
  text-decoration: none;
  color: rgb(204, 204, 204);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: myFontBold;
  font-size: 1.375rem;
  transition: all 250ms ease;
  cursor: pointer;

  svg {
    width: 25px;
    fill: rgb(204, 204, 204);
    transition: all 250ms ease;
  }

  &:hover {
    color: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
    svg {
      fill: ${(props) =>
        props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
    }
  }

  @media ${media.mobile} {
    font-size: 1.15rem;
    gap: 0.25rem;

    svg {
      min-width: 20px;
    }
  }
`;

const GameName = styled.span`
  font-family: myFontBlack;
  color: white;
  font-size: 3rem;

  @media ${media.mobile} {
    font-size: 1.5rem;
    text-align: end;
    line-height: 1.15;
  }

  @media ${media.tablet} {
    font-size: 2rem;
  }
`;

const BottomRow = styled.div`
  display: grid;
  gap: 2rem;
  grid-template: 1fr min-content / auto max(26vw, 300px);
  grid-template-areas:
    "image-carousel game-details"
    "image-carousel cart-button";
  box-sizing: border-box;
  height: 100% !important;

  @media ${media.mobile} {
    grid-template-columns: calc(100dvw - 2.5rem);
    grid-template-rows: 500px min-content min-content;
    grid-template-areas:
      "image-carousel"
      "cart-button"
      "game-details";
    gap: 1.5rem;
    padding: 0;
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  height: 100% !important;
  grid-area: image-carousel;
  width: 100%;
  overflow: hidden;
  cursor: grab;
  border-radius: 30px;
  display: flex;
  align-items: end;

  &:active {
    cursor: grabbing;
  }

  img {
    object-fit: cover;
    height: 100% !important;
    width: 100%;
    pointer-events: none;
  }

  .slick-slider {
    height: 100% !important;
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .slick-list,
  .slick-track,
  .slick-slide,
  .slick-slide > div,
  .slick-slide > div > div {
    height: 100% !important;
    width: 100%;
  }

  .slick-arrow {
    border-radius: 50%;
    position: absolute;
    top: 1rem;
    bottom: 0;
    margin: auto 0;
    height: min-content;
    z-index: 2;
  }

  .slick-next {
    right: 25px;
  }

  .slick-next::before {
    content: "›";
    font-size: 5rem;
    color: rgb(204, 204, 204);
  }

  .slick-prev {
    left: 20px;
  }

  .slick-prev::before {
    font-size: 5rem;
    content: "‹";
    color: rgb(204, 204, 204);
  }

  .slick-dots {
    bottom: 20px;
    background-color: rgb(15, 16, 17);
    padding: 0.25rem 0.75rem 0rem 0.75rem;
    border-radius: 10px;
    width: max-content;
  }

  .slick-dots > li {
    margin: 0;
  }

  .slick-dots li button:before {
    color: rgb(153, 153, 153);
    font-size: 0.65rem;
    line-height: 1;
    opacity: 1;
    height: min-content;
  }

  .slick-dots li.slick-active button:before {
    color: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
  }

  @media ${media.mobile} {
    .slick-slider {
      width: 100%;
    }

    .slick-next::before {
      font-size: 3rem;
    }

    .slick-prev::before {
      font-size: 3rem;
    }

    .slick-next {
      right: 10px;
    }

    .slick-prev {
      left: 10px;
    }

    .slick-dots {
      bottom: 10px;
      padding: 0rem 0.5rem 0rem 0.5rem;
      border-radius: 10px;
      width: max-content;
    }

    .slick-dots li button {
      height: 0;
      width: 0;
    }

    .slick-dots li button:before {
      font-size: 0.6rem;
    }
  }
`;

const WishListIcon = styled.svg`
  min-width: 30px !important;
  height: 30px;
  cursor: pointer;
  position: relative;
  bottom: 15px;
  left: -45px;

  @media ${media.mobile} {
    min-width: 25px !important;
    height: 25px;
    bottom: 15px;
    left: -40px;
  }
`;

const GameDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  grid-area: game-details;
`;

const Description = styled.div`
  display: flex;
  flex-direction: column;
  color: white;
  gap: 0.75rem;
  height: 295px;
  overflow: scroll;
  scrollbar-width: none;
  background: linear-gradient(
    90deg,
    rgba(26, 26, 26, 0) 0%,
    rgb(26, 26, 26) 100%
  );
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  padding: 2rem 1.5rem 1.5rem 1rem;

  span {
    font-family: myFontBold;
    font-size: 1.375rem;
  }

  p {
    text-align: justify;
    color: rgb(204, 204, 204);
  }
`;

const DetailsDropDown = styled.div`
  padding: 1.5rem 1rem 1rem 1rem;
  background: linear-gradient(
    90deg,
    rgba(38, 38, 38, 0) 0%,
    rgb(38, 38, 38) 100%
  );
  border-bottom-right-radius: 12px;
  border-bottom-left-radius: 12px;
  box-shadow: 0px -10px 25px rgb(15, 15, 15);
  overflow: hidden;
  position: relative;
  z-index: 1;
  clip-path: inset(-25px 0px 0px 0px);
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: all 0.4s ease-in-out;

  &.closed {
    padding-top: 0rem;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-height: 500px;
  overflow: hidden;
  opacity: 1;
  transition: all 0.4s ease-in-out;

  &.closed {
    max-height: 0;
    opacity: 0;
  }
`;

const DetailPair = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
`;

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  span {
    color: white;
    font-family: myFontBold;
  }

  div > span,
  div {
    color: rgb(204, 204, 204);
    font-family: myFontRegular;
  }

  a {
    color: rgb(204, 204, 204);
    text-decoration: none;
  }
`;

const Opener = styled.div`
  display: flex;
  color: rgb(204, 204, 204);
  transition: all 250ms ease;
  align-items: center;
  gap: 0.25rem;
  justify-content: end;
  cursor: pointer;

  svg {
    width: 20px;
    fill: rgb(204, 204, 204);
    transition: all 250ms ease;
  }

  &:hover {
    color: white;

    svg {
      fill: white;
    }
  }

  svg.open {
    transform: rotate(180deg);
  }
`;

const CartButton = styled.div`
  grid-area: cart-button;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    rgba(26, 26, 26, 0) 0%,
    rgb(26, 26, 26) 100%
  );
  border-radius: 12px;
  padding: 0.75rem 1rem;
  height: 55px;
  align-items: center;

  span {
    color: white;
    font-size: 1.125rem;
  }

  button {
    background: linear-gradient(
      90deg,
      rgba(26, 26, 26, 0) 0%,
      rgb(26, 26, 26) 100%
    );
    border: none;
    outline: none;
    color: rgb(153, 153, 153);
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
    font-size: 1.375rem;
    font-family: myFontBold;
  }

  button > svg {
    width: 30px;
  }

  div {
    display: flex;
    gap: 1rem;
  }

  @media ${media.mobile} {
    button {
      font-size: 1.25rem;
    }

    span {
      font-size: 1.15rem;
    }
  }
`;

function GamePage() {
  // route data
  let params = useParams();

  // hooks
  const { state } = useLocation();
  const navigate = useNavigate();

  // states
  const [gameData, setGameData] = useState(null);
  const [screenShotsData, setScreenShotsData] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(
    window.matchMedia(media.mobile).matches
  );

  // context
  const { cart, setCart, theme, setTheme, wishList, setWishList } =
    useContext(CartContext);

  const fetchGameData = async () => {
    try {
      const fetchedGameData = await getGamesData(
        getAPIURL("Game", "", "", "", params?.gameId),
        null,
        "game"
      );
      const fetchedScreenShotsData = await getGamesData(
        getAPIURL("Screenshots", "", "", "", params?.gameId),
        null,
        "screenshot"
      );

      setGameData(fetchedGameData);

      fetchedScreenShotsData.unshift(fetchedGameData.background_image);
      setScreenShotsData(fetchedScreenShotsData);
    } catch (err) {
      setGameData(null);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia(media.mobile);

    const handleMediaChange = (e) => {
      setIsMobileView(e.matches);
    };

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);

  useEffect(() => {
    params.gameId !== undefined && fetchGameData();
  }, [params.gameId]);

  const existingItem = (cart) =>
    cart?.find((cartItem) => cartItem.id === gameData?.id);

  function addToCart() {
    const cartGameDetails = {
      id: gameData?.id,
      name: gameData?.name,
      image: gameData?.background_image,
      price: gameData?.price,
    };

    if (!existingItem(cart)) {
      setCart([...cart, cartGameDetails]);
    }
  }

  function updateWishList() {
    const wishListGameDetails = {
      id: gameData?.id,
      name: gameData?.name,
      image: gameData?.background_image,
      price: gameData?.price,
      platforms: gameData?.platforms,
    };

    if (!existingItem(wishList)) {
      setWishList([...wishList, wishListGameDetails]);
    } else {
      setWishList(wishList.filter((item) => item.id !== gameData?.id));
    }
  }

  function handleLegionPress() {
    state?.currentPath === "home"
      ? navigate("/shop", {
          state: {
            pageState: "default",
          },
        })
      : navigate(-1);
  }

  return (
    <StyledGamePage>
      <Header />
      <Body>
        <TopRow>
          <BackButton onClick={handleLegionPress}>
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <path d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                <path d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path>
              </g>
            </svg>
            <span>Legion</span>
          </BackButton>
          <GameName data-testid="game-name">{gameData?.name}</GameName>
        </TopRow>
        <BottomRow>
          {screenShotsData && (
            <ImageCarousel>
              <SimpleSlider images={screenShotsData} />
              <WishListIcon
                data-testid="wishlist-icon"
                title="wishlist"
                onClick={updateWishList}
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                strokeWidth="3"
                stroke="#ffffff"
                fill={
                  existingItem(wishList)
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
              </WishListIcon>
            </ImageCarousel>
          )}
          <GameDetails>
            <div>
              <Description>
                <span>Description</span>
                <p data-testid="game-desc">
                  {gameData?.description}
                  {gameData?.description &&
                    !gameData?.description.endsWith(".") &&
                    "."}
                </p>
              </Description>
              <DetailsDropDown className={dropDownOpen ? "" : "closed"}>
                <Details
                  className={dropDownOpen ? "" : "closed"}
                  data-testid="details"
                >
                  <DetailPair>
                    <Detail>
                      <span>Platforms</span>
                      <div>
                        {gameData?.platforms.map((platform, index) => (
                          <span key={index}>
                            {platform}
                            {gameData?.platforms.length > 1 &&
                              gameData?.platforms.indexOf(platform) !==
                                gameData?.platforms.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </Detail>
                    <Detail>
                      <span>Genre</span>
                      <div>
                        {gameData?.genres.map((genre, index) => (
                          <span key={index}>
                            {genre}
                            {gameData?.genres.length > 1 &&
                              gameData?.genres.indexOf(genre) !==
                                gameData?.genres.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </Detail>
                  </DetailPair>
                  <DetailPair>
                    <Detail>
                      <span>Release date</span>
                      <div>
                        {gameData?.released &&
                          getFormattedDate(gameData?.released)}
                      </div>
                    </Detail>
                    <Detail>
                      <span>Developers</span>
                      <div>
                        {gameData?.developers.map((dev, index) => (
                          <span key={index}>
                            {dev}
                            {gameData?.developers.length > 1 &&
                              gameData?.developers.indexOf(dev) !==
                                gameData?.developers.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </Detail>
                  </DetailPair>
                  <DetailPair>
                    <Detail>
                      <span>Publishers</span>
                      <div>
                        {gameData?.publishers.map((pub, index) => (
                          <span key={index}>
                            {pub}
                            {gameData?.publishers.length > 1 &&
                              gameData?.publishers.indexOf(pub) !==
                                gameData?.publishers.length - 1 &&
                              ", "}
                          </span>
                        ))}
                      </div>
                    </Detail>
                    <Detail>
                      <span>Age Rating</span>
                      <div>{gameData?.ageRating}</div>
                    </Detail>
                  </DetailPair>
                  <Detail>
                    <span>Website</span>
                    <a href={gameData?.website} target="_blank">
                      {gameData?.website}
                    </a>
                  </Detail>
                </Details>
                <Opener
                  data-testid="opener"
                  onClick={() => setDropDownOpen(!dropDownOpen)}
                >
                  More
                  <svg
                    className={dropDownOpen ? "open" : ""}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </Opener>
              </DetailsDropDown>
            </div>
          </GameDetails>
          <CartButton>
            <span data-testid="game-price">${gameData?.price}</span>
            <button
              onClick={addToCart}
              style={{
                color: existingItem(cart)
                  ? theme.currentTheme === "norse"
                    ? "#46afe8"
                    : "#ff5a5a"
                  : "white",
              }}
            >
              {!existingItem(cart) ? (
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
          </CartButton>
        </BottomRow>
      </Body>
    </StyledGamePage>
  );
}

export default GamePage;
