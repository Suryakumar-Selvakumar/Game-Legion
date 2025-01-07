// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import { Header } from "../components/Header";
import { QuickNavigation } from "../components/QuickNavigation";
import { InfoCard } from "../components/InfoCard";
import { Footer } from "../components/Footer";
import { StyledHeader } from "../components/Header";

// assets
import backgroundVideoNorse from "../assets/videos/bg-video-norse.mp4";
import backgroundVideoGreek from "../assets/videos/bg-video-greek.mp4";
import { CartContext } from "../components/CartContext";

export const StyledHome = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: 1fr;

  & > ${StyledHeader} {
    background-color: rgb(255, 255, 255, 0);
  }
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 5rem;
`;

const VideoBackground = styled.div`
  position: relative;
  width: 100%;
  height: 100dvh;
  overflow: hidden;

  & video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: 100% 25%;
  }

  & ${Content} {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
`;

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshKey: 0,
    };

    this.handleRefresh = this.handleRefresh.bind(this);
  }

  handleRefresh() {
    this.setState((state) => ({
      ...state,
      refreshKey: state.refreshKey + 1,
    }));
  }

  static contextType = CartContext;

  render() {
    const { cart, setCart, theme, setTheme } = this.context;

    return (
      <StyledHome>
        <VideoBackground>
          <video key={this.state.refreshKey} autoPlay loop muted>
            <source
              src={
                theme.currentTheme === "norse"
                  ? backgroundVideoNorse
                  : backgroundVideoGreek
              }
              type="video/mp4"
            />
          </video>
          <Content>
            <Header />
            <Body>
              <InfoCard />
              <QuickNavigation />
            </Body>
            <Footer setTheme={setTheme} handleRefresh={this.handleRefresh} />
          </Content>
        </VideoBackground>
      </StyledHome>
    );
  }
}

export default Home;
