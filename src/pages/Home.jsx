import { Component } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";

// assets
import backgroundVideo from "../assets/videos/bg-video-norse.mp4";
import { QuickNavigation } from "../components/QuickNavigation";

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
`;

const Body = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
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

export class Home extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledHome>
        <VideoBackground>
          <video autoPlay loop muted>
            <source src={backgroundVideo} type="video/mp4" />
          </video>
          <Content>
            <Header />
            <Body>
              <QuickNavigation />
            </Body>
          </Content>
        </VideoBackground>
      </StyledHome>
    );
  }
}
