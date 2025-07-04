// libs
import styled from "styled-components";

// hooks
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

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

const Body = styled.main`
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

const TopRow = styled.header`
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

const BackButton = styled.button`
  text-decoration: none;
  color: rgb(204, 204, 204);
  background-color: transparent;
  border: none;
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

const GameName = styled.h1`
  font-family: myFontBlack;
  color: white;
  font-size: 3rem;
  font-weight: normal;

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

const ImageCarousel = styled.section`
  position: relative;
  height: 100% !important;
  grid-area: image-carousel;
  width: 100%;
  overflow: hidden;
  border-radius: 30px;
  display: flex;
  align-items: end;

  &:active &.grab-on {
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
    bottom: 10px;
    background-color: rgb(15, 16, 17);
    padding: 0 0.75rem;
    border-radius: 10px;
    height: max-content;
    width: max-content;
    display: flex;
    align-items: start;
  }

  .slick-dots > li {
    margin: 0;
    height: 25px;
    position: relative;
    top: 9px;
  }

  .slick-dots li button {
    padding: 0;
    height: min-content;

    &:focus-visible {
      &::before {
        box-shadow: 0 0 0 1.5px white;
      }
    }
  }

  .slick-dots li button:before {
    color: rgb(153, 153, 153);
    font-size: 0.65rem;
    line-height: 1;
    position: relative;
    top: -5px;
    border-radius: 100%;
    opacity: 1;
    height: 20px;
    width: min-content;
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
      font-size: 3.5rem;
    }

    .slick-prev::before {
      font-size: 3.5rem;
    }

    .slick-next {
      right: 10px;
    }

    .slick-prev {
      left: 10px;
    }

    .slick-dots {
      border-radius: 10px;
      width: max-content;
    }

    .slick-dots > li {
      margin: 0;
      height: 15px;
      width: 17.5px;
      position: relative;
      top: 4px;
    }

    .slick-dots > li:last-child {
      width: 8.55px;
    }

    .slick-dots li button {
      height: 0;
      width: 0;
    }

    .slick-dots li button:before {
      font-size: 0.55rem;
    }
  }
`;

const WishListIcon = styled.button`
  position: relative;
  bottom: 15px;
  left: -45px;
  background-color: transparent;
  border: none;
  padding: 0;

  svg {
    min-width: 30px !important;
    height: 30px;
    cursor: pointer;
  }

  @media ${media.mobile} {
    left: -40px;
    bottom: 10px;

    svg {
      min-width: 25px !important;
      height: 25px;
    }
  }
`;

const GameDetails = styled.section`
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

  h3 {
    font-family: myFontBold;
    font-size: 1.375rem;
    font-weight: normal;
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

const Details = styled.dl`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const Detail = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;

  dt {
    color: white;
    font-family: myFontBold;
  }

  div > dt,
  dd {
    color: rgb(204, 204, 204);
    font-family: myFontRegular;
  }

  a {
    color: rgb(204, 204, 204);
    text-decoration: none;
  }
`;

const Opener = styled.button`
  display: flex;
  color: rgb(204, 204, 204);
  transition: all 250ms ease;
  background-color: transparent;
  border: none;
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

const CartButton = styled.section`
  grid-area: cart-button;
  display: flex;
  justify-content: space-between;
  background: linear-gradient(
    90deg,
    rgba(26, 26, 26, 0) 0%,
    rgb(26, 26, 26) 100%
  );
  border-radius: 12px;
  padding: 0.75rem 0.5rem 0.75rem 1rem;
  height: 55px;
  align-items: center;

  p {
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
    padding: 0.5rem;
    outline: none;
    color: rgb(153, 153, 153);
    cursor: pointer;
    line-height: 1;
    display: flex;
    align-items: center;
    font-size: 1.375rem;
    font-family: myFontBold;
    border-radius: 12px;

    &:focus-visible {
      box-shadow: 0 0 0 1.5px white;
    }
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

  // context
  const { cart, setCart, theme, wishList, setWishList } =
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
    if (state?.currentPath === "home")
      navigate("/shop", {
        state: {
          pageState: "default",
        },
      });
    else {
      navigate(-1);
    }
  }

  return (
    <StyledGamePage role="presentation">
      <Header />
      <Body aria-describedby="game-heading">
        <TopRow>
          <BackButton onClick={handleLegionPress}>
            <svg
              aria-hidden="true"
              viewBox="0 0 1024 1024"
              xmlns="http://www.w3.org/2000/svg"
            >
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
          <GameName id="game-heading" data-testid="game-name">
            {gameData?.name}
          </GameName>
        </TopRow>
        <BottomRow role="grid">
          {screenShotsData && (
            <ImageCarousel
              style={{
                cursor: screenShotsData?.length > 1 && "grab",
              }}
              className={screenShotsData?.length > 1 ? "grab-on" : ""}
              aria-label="Image carousel"
              role="region"
            >
              <SimpleSlider
                images={screenShotsData}
                gameName={gameData?.name}
              />

              <WishListIcon
                onClick={updateWishList}
                data-testid="wishlist-icon"
                aria-label={`Add to wishlist`}
              >
                <svg
                  aria-hidden="true"
                  focusable="false"
                  title="wishlist"
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
                </svg>
              </WishListIcon>
            </ImageCarousel>
          )}
          <GameDetails role="region" aria-label="Game details">
            <Description>
              <h3>Description</h3>
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
                <Detail>
                  <dt>Platforms</dt>
                  <dd>{gameData?.platforms.join(", ")}</dd>
                </Detail>
                <Detail>
                  <dt>Genre</dt>
                  <dd>{gameData?.genres.join(", ")}</dd>
                </Detail>
                <Detail>
                  <dt>Release date</dt>
                  <dd>
                    {gameData?.released && getFormattedDate(gameData?.released)}
                  </dd>
                </Detail>
                <Detail>
                  <dt>Developers</dt>
                  <dd>{gameData?.developers.join(", ")}</dd>
                </Detail>
                <Detail>
                  <dt>Publishers</dt>
                  <dd>{gameData?.publishers.join(", ")}</dd>
                </Detail>
                <Detail>
                  <dt>Age Rating</dt>
                  <dd>{gameData?.ageRating}</dd>
                </Detail>
                <Detail>
                  <dt>Website</dt>
                  <a
                    tabIndex={dropDownOpen ? 0 : -1}
                    href={gameData?.website}
                    target="_blank"
                  >
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
          </GameDetails>
          <CartButton role="region" aria-label="Cart actions">
            <p data-testid="game-price">${gameData?.price}</p>
            <button
              onClick={() => {
                addToCart();
                document.activeElement.blur();
              }}
              style={{
                color: existingItem(cart)
                  ? theme.currentTheme === "norse"
                    ? "#46afe8"
                    : "#ff5a5a"
                  : "white",
                cursor: existingItem(cart) ? "default" : "pointer",
              }}
              disabled={existingItem(cart)}
              aria-disabled={existingItem(cart)}
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
