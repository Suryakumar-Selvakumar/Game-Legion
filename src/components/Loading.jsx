import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import { CircularProgress } from "react-cssfx-loading";
import PropTypes from "prop-types";

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
          width={this.props.width}
          height={this.props.height}
        />
      </StyledLoading>
    );
  }
}

Loading.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

export default Loading;
