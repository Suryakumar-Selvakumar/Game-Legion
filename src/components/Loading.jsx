import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import { CircularProgress } from "react-cssfx-loading";

const StyledLoading = styled.div`
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  padding-top: 7.5rem;
`;

class Loading extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = ThemeContext;

  render() {
    const theme = this.context;

    return (
      <StyledLoading>
        <CircularProgress
          color={theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"}
          duration="2s"
          width="100px"
          height="100px"
        />
      </StyledLoading>
    );
  }
}

export default Loading;
