// libs
import { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// assets
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import omegaNorseBlueIcon from "../assets/icons/omega-norse-blue.png";
import omegaNorseRedIcon from "../assets/icons/omega-norse-red.png";

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

  span > img {
    height: 65px;
    width: 75px;
    position: relative;
    top: -0.25rem;
  }

  span {
    font-family: myFontLogo;
    font-size: 2.5rem;
    color: white;
    display: flex;
    align-items: end;
  }

  cursor: pointer;
  transition: transform 150ms ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const SearchContainer = styled.div`
  display: flex;

  img {
    width: 25px;
    position: relative;
    left: -9.5rem;
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
  left: -7.5rem;
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
    return (
      <StyledHeader>
        <Logo to="/">
          <span>
            GAME <img src={omegaNorseBlueIcon} alt="Omega icon" /> LEGION
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
