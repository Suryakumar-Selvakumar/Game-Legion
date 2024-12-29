import { Component } from "react";
import bladesOfChaosIcon from "../assets/icons/blades.png";
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import styled, { keyframes } from "styled-components";

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: black;
  padding: 0 1rem;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;

  img {
    height: 85px;
    width: 85px;
    transform: rotate(5deg);
  }

  span {
    font-family: myFontLogo;
    /* font-weight: 600; */
    font-size: 2.5rem;
    color: white;
  }
`;

const SearchContainer = styled.div`
  display: flex;

  img {
    width: 22.5px;
    position: relative;
    left: -6rem;
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
    width: 565px;
  }

  100% {
    width: 600px;
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
  left: -4rem;
  width: 350px;
  transition: all 350ms ease;

  &:focus {
    animation: ${expand} 350ms ease forwards;
  }
`;

const Cart = styled.img.attrs({
  src: cartIcon,
  alt: "a cart icon",
})`
  height: 40px;
`;

export class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledHeader>
        <Logo>
          <img src={bladesOfChaosIcon} alt="Blade of Chaos" />
          {/* <img src={bladeExileIcon} alt="Blade of Chaos" /> */}
          <span>Game Legion</span>
        </Logo>
        <SearchContainer>
          <SearchBar />
          <img src={searchIcon} alt="a search icon" />
        </SearchContainer>
        <Cart />
      </StyledHeader>
    );
  }
}
