import { Component } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import PropTypes from "prop-types";

const animate = keyframes`
     0% {
        stroke-dashoffset: 270;
     }

     50% {
        stroke-dashoffset: 0;
     }

     50.1% {
        stroke-dashoffset: 540;
     }

     100% {
        stroke-dashoffset: 270;
     }
`;

const rotate = keyframes`
0% {
    transform: rotate(0deg)
}

100% {
    transform: rotate(360deg);
}
`;

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding-top: 7.5rem;

  svg {
    position: relative;
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
    animation: ${rotate} 1.5s linear infinite;
  }

  svg circle {
    fill: none;
    stroke-width: 5;
    stroke: ${(props) =>
      props.theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"};
    stroke-linecap: round;
    transform: translate(5px, 5px);
    stroke-dasharray: ${(props) => 2 * Math.PI * (props.size / 2)};
    stroke-dashoffset: ${(props) => 2 * Math.PI * (props.size / 2)};
    animation: ${animate} 3s linear infinite;
  }
`;

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledLoading size={90}>
        <svg>
          <circle cx="40" cy="40" r="40"></circle>
        </svg>
      </StyledLoading>
    );
  }
}

export default Loading;
