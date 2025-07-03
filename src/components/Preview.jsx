// libs
import { Component, createRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Skeleton } from "@mui/material";

//components
import Loading from "./Loading";
import { GameName } from "./GameCard";

// utils
import { getGamesData } from "../utils/getGamesData";
import { getAPIURL } from "../utils/getAPIURL";

// assets
import placeHolderImage from "../assets/icons/placeholder-image.jpg";
import media from "../utils/breakpoints";

const expand = keyframes`
  0% {
    width: 350px;
    transform: scaleY(0);
    opacity: 0;
  }

  50% {
    width: 550px;
    transform: scaleY(1);
    opacity: 1;
  }

  75% {
    width: 540px;
    transform: scaleY(0.98);
  }

  100% {
    width: 550px;
    transform: scaleY(1);
    opacity: 1;
  }
`;

const StyledPreview = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  background-color: white;
  position: absolute;
  z-index: 3;
  border-radius: 10px;
  margin-top: 2.65rem;
  margin-left: -1.7rem;
  transform-origin: top center;
  animation: ${expand} 375ms ease forwards;
  height: 405px;
  overflow: scroll;
  scrollbar-width: none;
  box-shadow: inset 0 -10px 10px -10px #000000;

  @media ${media.mobile} {
    width: 200px;
    animation: none;
    margin-left: ${(props) =>
      props.theme.currentTheme === "norse" ? "-5px" : "0"};
    margin-top: 2.75rem;
    height: 300px;
  }

  @media ${media.tablet} {
    margin-left: 0.35rem;
  }
`;

const SearchCard = styled(Link)`
  width: 100%;
  min-height: 135px;
  display: flex;
  transition: all 250ms ease;
  align-items: center;
  gap: 1rem;
  padding: 15px;
  cursor: pointer;
  text-decoration: none;

  &:hover {
    background-color: rgb(218, 218, 218);
  }

  & ${GameName} {
    font-size: 1.25rem;
    font-family: myFontRegular;
    padding: 0;
    color: black;
    width: calc(100% - 182px);
  }

  @media ${media.mobile} {
    flex-direction: column;
    gap: 0.5rem;
    padding-bottom: 1rem;
    min-height: max-content;

    & ${GameName} {
      font-size: 1rem;
      color: black;
      width: 100%;
      text-align: center;
    }
  }
`;

const ImageContainer = styled.div`
  cursor: pointer;
  width: 150px;
  height: 100%;

  .MuiSkeleton-root {
    border-radius: 10px;
  }

  @media ${media.mobile} {
    width: 100%;
    height: 95px;
  }
`;

const GameImage = styled.img`
  width: 150px;
  height: 100%;
  border-radius: 10px;

  @media ${media.mobile} {
    width: 100%;
  }
`;

class Preview extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gamesData: null,
      loading: true,
      error: null,
      imageLoading: true,
      isMobileView: window.matchMedia(media.mobile).matches,
    };

    this.setLoading = this.setLoading.bind(this);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.setImageLoading = this.setImageLoading.bind(this);
    this.signalRef = createRef(null);
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

  fetchGamesData = async () => {
    const controller = new AbortController();
    this.signalRef.current = controller;

    try {
      const fetchedGamesData = await getGamesData(
        getAPIURL("preview", "", "", this.props.searchInput),
        controller.signal,
        "games"
      );
      this.setState((state) => ({
        ...state,
        gamesData: fetchedGamesData,
        error: null,
      }));
    } catch (err) {
      if (err.name === "AbortError") {
        return;
      }
      this.setState((state) => ({
        ...state,
        gamesData: null,
        error: err.message,
      }));
    } finally {
      this.setState((state) => ({
        ...state,
        loading: false,
      }));
    }
  };

  setImageLoading() {
    this.setState((state) => ({
      ...state,
      imageLoading: false,
    }));
  }

  setLoading() {
    this.setState((state) => ({
      ...state,
      loading: true,
    }));
  }

  componentDidMount() {
    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    this.fetchGamesData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.searchInput !== prevProps.searchInput) {
      this.fetchGamesData();
      this.setLoading();
      this.setState((state) => ({
        ...state,
        imageLoading: true,
      }));
    }
  }

  componentWillUnmount() {
    this.signalRef.current?.abort();

    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );
  }

  render() {
    return (
      <StyledPreview>
        {this.state.loading && (
          <Loading
            width={!this.state.isMobileView ? "90px" : "75px"}
            height={!this.state.isMobileView ? "90px" : "75px"}
          />
        )}
        {this.state.gamesData &&
          !this.state.loading &&
          this.state.error === null &&
          this.state.gamesData.map((game) => (
            <SearchCard
              data-testid="search-card"
              key={game.id}
              to={`/shop/game/${String(game.id)}`}
              state={{
                currentPath: !this.props.isInShop ? "home" : undefined,
              }}
              onMouseDown={(e) => {
                e.preventDefault();
                setTimeout(() => document.activeElement.blur(), 100);
              }}
              aria-label={`View ${game.name}`}
            >
              <ImageContainer>
                {this.state.imageLoading && (
                  <Skeleton
                    variant="rectangular"
                    width={!this.state.isMobileView ? "150px" : "100%"}
                    height={!this.state.isMobileView ? "100%" : "95px"}
                    animation="pulse"
                  />
                )}
                <GameImage
                  src={game.image !== null ? game.image : placeHolderImage}
                  alt=""
                  aria-hidden="true"
                  onLoad={this.setImageLoading}
                  style={{
                    display: this.state.imageLoading ? "none" : "block",
                  }}
                />
              </ImageContainer>
              <GameName data-testid="game-preview-name">{game.name}</GameName>
            </SearchCard>
          ))}
      </StyledPreview>
    );
  }
}

Preview.propTypes = {
  searchInput: PropTypes.string,
  isInShop: PropTypes.bool,
};

export default Preview;

export { SearchCard };
