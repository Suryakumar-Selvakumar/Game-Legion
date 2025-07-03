// libs
import { Component, createRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

// components
import Header from "../components/Header";
import QuickNavigation from "../components/QuickNavigation";
import { InfoCard } from "../components/InfoCard";
import { Footer } from "../components/Footer";
import { StyledHeader } from "../components/Header";

// assets
import backgroundVideoNorse from "../assets/videos/bg-video-norse.mp4";
import backgroundVideoGreek from "../assets/videos/bg-video-greek.mp4";
import { CartContext } from "../components/CartContext";

// utils
import media from "../utils/breakpoints";

const HomeVideo = styled(motion.video)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: -2;
  object-fit: cover;
  object-position: 100% 25%;
`;

export const StyledHome = styled.main`
  position: relative;
  width: 100%;
  min-height: 100vh;

  @media ${media.mobile} {
    overflow: visible;

    & ${HomeVideo} {
      object-position: ${(props) =>
        props.theme.currentTheme === "norse" ? "80% 0%" : "100% 50%"};
    }
  }

  @media ${media.tablet} {
    overflow: auto;

    & ${HomeVideo} {
      object-position: ${(props) =>
        props.theme.currentTheme === "norse" ? "80% 0%" : "100% 50%"};
    }
  }
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;

  & > ${StyledHeader} {
    background-color: rgb(255, 255, 255, 0);
    position: static;
    align-self: start;
  }

  ${StyledHeader}.visible {
    animation: none;
  }

  ${StyledHeader}.hidden {
    animation: none;
  }

  @media ${media.mobile} {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;

  @media ${media.mobile} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
  }

  @media ${media.tablet} {
    padding: 0;
    justify-content: space-evenly;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshKey: 0,
      isMobileView: window.matchMedia(media.mobile).matches,
      isTabletView: window.matchMedia(media.tablet).matches,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.tabletRef = createRef(null);
  }

  handleMediaChange(e, currentView) {
    currentView === "mobile"
      ? this.setIsMobileView(e.matches)
      : this.setIsTabletView(e.matches);
  }

  setIsTabletView(currentState) {
    this.setState((state) => ({
      ...state,
      isTabletView: currentState,
    }));
  }

  setIsMobileView(currentState) {
    this.setState((state) => ({
      ...state,
      isMobileView: currentState,
    }));
  }

  handleRefresh() {
    this.setState((state) => ({
      ...state,
      refreshKey: state.refreshKey + 1,
    }));
  }

  static contextType = CartContext;

  componentDidMount() {
    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    this.tabletRef.current = window.matchMedia(media.tablet);
    this.tabletRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "tablet")
    );
  }

  componentWillUnmount() {
    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    this.tabletRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "tablet")
    );
  }

  render() {
    const { theme, setTheme } = this.context;

    return (
      <StyledHome aria-labelledby="info-heading">
        <HomeVideo
          key={this.state.refreshKey}
          autoPlay
          loop
          muted
          playsInline
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          exit={{ opacity: 0 }}
        >
          <source
            src={
              theme.currentTheme === "norse"
                ? backgroundVideoNorse
                : backgroundVideoGreek
            }
            type="video/mp4"
          />
        </HomeVideo>
        <Content>
          <Header isInShop={false} />
          <Body>
            <InfoCard />
            <QuickNavigation />
          </Body>
          <Footer setTheme={setTheme} handleRefresh={this.handleRefresh} />
        </Content>
      </StyledHome>
    );
  }
}

export default Home;
