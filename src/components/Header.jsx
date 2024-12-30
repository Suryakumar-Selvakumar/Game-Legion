// libs
import { Component } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// assets
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import omegaNorseIcon from "../assets/icons/omega-norse.png";
import omegaGreekIcon from "../assets/icons/omega-greek.png";

// components
import { StyledShop } from "../pages/Shop";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const Logo = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;

  span {
    font-family: ${(props) =>
      props.theme.currentTheme === "norse"
        ? "myFontLogoNorse"
        : "myFontLogoGreek"};
    font-size: 2.5rem;
    color: white;
    display: flex;
    align-items: end;
    gap: ${(props) => (props.theme.currentTheme === "norse" ? "" : "0.2rem")};
  }

  cursor: pointer;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const LogoIcon = styled.img`
  height: ${(props) =>
    props.theme.currentTheme === "norse" ? "65px" : "60px"};
  width: ${(props) => (props.theme.currentTheme === "norse" ? "75px" : "70px")};
  position: relative;
  top: -0.25rem;
`;

const SearchContainer = styled.div`
  display: flex;

  img {
    width: 25px;
    position: relative;
    left: -9rem;
    cursor: pointer;
  }
`;

const expand = keyframes`
  0% {
    width: 350px;
  }

  50% {
    width: 600px
  }

  75% {
    width: 590px;
  }

  100% {
    width: 600px;
  }
`;

const shrink = keyframes`
  0% {
    width: 600px;
  }

  50% {
    width: 350px
  }

  75% {
    width: 360px;
  }

  100% {
    width: 350px;
  }
`;

const SearchBar = styled.input.attrs({
  placeholder: "Search games...",
})`
  outline: none;
  border-radius: 10px;
  padding: 0.3rem 2.25rem 0.3rem 1rem;
  font-size: 1.25rem;
  border: none;
  position: relative;
  left: -7rem;
  width: 350px;
  box-shadow: 0 0 2.5px rgb(115, 115, 115);

  &:focus {
    animation: ${expand} 375ms ease forwards;
  }

  &.shrink {
    animation: ${shrink} 375ms ease-in-out forwards;
  }
`;

const Cart = styled.img.attrs({
  src: cartIcon,
  alt: "a cart icon",
})`
  height: 40px;
  cursor: pointer;
  transition: transform 150ms ease;
  position: relative;
  top: -2.5px;

  &:hover {
    transform: scale(1.1);
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShrinking: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  static contextType = ThemeContext;

  handleBlur() {
    this.setState((state) => ({
      ...state,
      isShrinking: true,
    }));
  }

  handleAnimationEnd() {
    this.setState((state) => ({
      ...state,
      isShrinking: false,
    }));
  }

  render() {
    const theme = this.context;

    return (
      <StyledHeader>
        <Logo to="/">
          <span>
            GAME{" "}
            <LogoIcon
              src={
                theme.currentTheme === "norse" ? omegaNorseIcon : omegaGreekIcon
              }
              alt={
                theme.currentTheme === "norse"
                  ? "Jormungandur icon"
                  : "omega icon"
              }
            />{" "}
            LEGION
          </span>
        </Logo>
        <SearchContainer>
          <SearchBar
            onBlur={this.handleBlur}
            onAnimationEnd={this.handleAnimationEnd}
            className={this.state.isShrinking ? "shrink" : ""}
          />
          <img src={searchIcon} alt="a search icon" />
        </SearchContainer>
        <Cart />
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  setTheme: PropTypes.func,
  handleRefresh: PropTypes.func,
};
