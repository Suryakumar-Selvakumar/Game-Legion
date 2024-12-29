// libs
import { Component } from "react";
import styled, { keyframes } from "styled-components";

// assets
import bladesOfChaosIcon from "../assets/icons/blades.png";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import omegaIcon from "../assets/icons/omega.png";
import omegaNorseIcon from "../assets/icons/omega-norse-blue.png";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  span > img {
    height: 70px;
    width: 75px;
    transform: rotate(0deg);
    z-index: 1;
    position: relative;
  }

  span {
    font-family: myFontLogo;
    font-size: 2.5rem;
    color: white;
    display: flex;
    align-items: end;
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
        <Logo>
          <span>
            GAME <img src={omegaNorseIcon} alt="Omega icon" /> LEGION
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
