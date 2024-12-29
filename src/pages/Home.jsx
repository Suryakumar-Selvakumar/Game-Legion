import { Component } from "react";
import { Header } from "../components/Header";
import styled from "styled-components";

// assets
import backgroundVideo from "../assets/videos/bg-video-norse.mp4";

const StyledHome = styled.div`
  width: 100%;
  height: 100%;
`;

const Content = styled.div``;

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
          </Content>
        </VideoBackground>
      </StyledHome>
    );
  }
}
