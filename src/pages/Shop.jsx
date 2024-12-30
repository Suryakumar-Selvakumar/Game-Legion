// libs
import { Component } from "react";
import styled, { ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// components
import { Header } from "../components/Header";

const StyledShop = styled.div`
  display: grid;
  grid-template-rows: min-content 1fr;
  grid-template-columns: min-content 1fr;
`;

class Shop extends Component {
  constructor(props) {
    super(props);
  }

  static contextType = ThemeContext;

  render() {
    const theme = this.context;
    
    return (
      <StyledShop>
        <Header />
      </StyledShop>
    );
  }
}

Shop.propTypes = {
  setTheme: PropTypes.func,
};

export default Shop;
