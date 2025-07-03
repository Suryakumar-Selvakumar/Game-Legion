import { Component } from "react";
import styled from "styled-components";
import { CircularProgress } from "react-cssfx-loading";
import PropTypes from "prop-types";
import { CartContext } from "./CartContext";

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

  static contextType = CartContext;

  render() {
    const { theme } = this.context;

    return (
      <StyledLoading role="presentation">
        <CircularProgress
          color={theme?.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"}
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
