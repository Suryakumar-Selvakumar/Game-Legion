// libs
import styled from "styled-components";

// hooks
import { useContext, useEffect, useRef, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

// utils
import { getAPIURL } from "../utils/getAPIURL";
import { getGamesData } from "../utils/getGamesData";

// components
import { Header } from "../components/Header";
import { CartContext } from "../components/CartContext";
import Carousel from "../components/Carousel";

const StyledGamePage = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: rgb(15, 16, 17);
  padding-top: 4rem;
  width: 100dvw;
  height: 100dvh;
`;

const Body = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  padding: 2.5rem;
  height: 100%;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BottomRow = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 2rem;
  grid-template-rows: 1fr max-content;
  grid-template-areas:
    "image-carousel game-details"
    "image-carousel cart-button";
`;

const BackButton = styled(Link)`
  text-decoration: none;
  color: rgb(204, 204, 204);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: myFontBold;
  font-size: 1.375rem;
  transition: all 250ms ease;

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
`;

const GameName = styled.span`
  font-family: myFontBlack;
  color: white;
  font-size: 3rem;
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
  padding: 1rem 1rem 1rem 1rem;
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
  z-index: 2;
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
  width: 100%;
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
    padding: 0;
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
`;

export function GamePage() {
  // route data
  let params = useParams();
  const { state } = useLocation();

  // states
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [screenShotsData, setScreenShotsData] = useState(null);
  const [dropDownOpen, setDropDownOpen] = useState(false);

  // context
  const { cart, setCart, theme, setTheme } = useContext(CartContext);

  const fetchGameData = async () => {
    try {
      const fetchedGameData = await getGamesData(
        getAPIURL("Game", "", "", "", params.gameId),
        null,
        "game"
      );
      const fetchedScreenShotsData = await getGamesData(
        getAPIURL("Screenshots", "", "", "", params.gameId),
        null,
        "screenshot"
      );
      setGameData(fetchedGameData);

      fetchedScreenShotsData.unshift(fetchedGameData.background_image);
      setScreenShotsData(fetchedScreenShotsData);

      setError(null);
      console.log(fetchedScreenShotsData);
      console.log(fetchedGameData);
    } catch (err) {
      if (err.name === "AbortError") {
        console.log("Aborted");
        return;
      }
      setGameData(null);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGameData();

    console.log(screenShotsData);
    console.log(gameData);
  }, []);

  useEffect(() => {
    fetchGameData();
  }, [params.gameId]);

  const existingItem = (cart) =>
    cart.find((cartItem) => cartItem.id === gameData?.id);

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

  return (
    <StyledGamePage>
      <Header />
      <Body>
        <TopRow>
          <BackButton
            to={"/shop"}
            state={state?.currentPath === "home" && { pageState: "default" }}
          >
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
          <GameName>{gameData?.name}</GameName>
        </TopRow>
        <BottomRow>
          {screenShotsData !== null && <Carousel images={screenShotsData} />}
          <GameDetails>
            <div>
              <Description>
                <span>Description</span>
                <p>{gameData?.description}.</p>
              </Description>
              <DetailsDropDown className={dropDownOpen ? "" : "closed"}>
                <Details className={dropDownOpen ? "" : "closed"}>
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
                      <div>{gameData?.released}</div>
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
                <Opener onClick={() => setDropDownOpen(!dropDownOpen)}>
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
            <span>${gameData?.price}</span>
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
