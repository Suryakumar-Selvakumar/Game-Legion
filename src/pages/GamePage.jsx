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

const StyledGamePage = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  background-color: rgb(15, 16, 17);
  padding-top: 5rem;
  width: 100dvw;
  height: 100dvh;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: min-content 1fr;
  grid-template-areas:
    "back-button game-name"
    "image-carousel game-details";
  padding: 2.5rem;
`;

const BackButton = styled(Link)`
  grid-area: back-button;
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
  grid-area: game-name;
  font-family: myFontBlack;
  color: white;
  font-size: 3rem;
  place-self: end;
`;

const ImageCarousel = styled.div`
  grid-area: image-carousel;
`;

const GameDetails = styled.div`
  grid-area: game-details;
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

  return (
    <StyledGamePage>
      <Header />
      <Body>
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
        <ImageCarousel></ImageCarousel>
        <GameDetails></GameDetails>
      </Body>
    </StyledGamePage>
  );
}
