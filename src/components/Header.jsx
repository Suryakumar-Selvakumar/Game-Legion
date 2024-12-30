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
    left: -7rem;
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
  left: -5rem;
  width: 350px;
  box-shadow: 0 0 2.5px rgb(115, 115, 115);

  &:focus {
    animation: ${expand} 375ms ease forwards;
  }

  &.shrink {
    animation: ${shrink} 375ms ease-in-out forwards;
  }
`;

const ThemeCartContainer = styled.div`
  display: flex;
  gap: 1rem;

  div:nth-child(2) {
    background-color: white;
    width: 1.5px;
    border-radius: 10px;
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

const ThemeSwitcher = styled.input.attrs({
  type: "checkbox",
})`
  width: 75px;
  height: 34px;
  cursor: pointer;
  appearance: none;
  border-radius: 10px;
  position: relative;
  outline: 0;
  transition: all 0.2s;
  background-color: rgb(255, 255, 255, 0.9);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);

  &:after {
    position: absolute;
    content: "";
    top: 1.5px;
    left: 2.25px;
    width: 30px;
    height: 29px;
    background-color: #7c7c7c;
    z-index: 2;
    border-radius: 10px;
    transition: all 0.35s;
  }

  &:checked:after {
    left: calc(100% - 32px);
    top: 1.5px;
  }
`;

const InputWrapper = styled.div`
  width: 80px;
  height: 40px;
  position: relative;
  cursor: pointer;

  & img {
    position: absolute;
    top: 50%;
    transform-origin: 50% 50%;
    transition: all 0.35s;
    z-index: 1;
  }

  & .is-checked {
    width: 27.5px;
    height: 27.5px;
    left: 10%;
    transform: translateX(190%) translateY(-60%) scale(0);
  }

  & .is-unchecked {
    width: 21.5px;
    height: 23px;
    right: 18%;
    transform: translateX(0) translateY(-63%) scale(1);
  }

  ${ThemeSwitcher}:checked + .is-checked {
    transform: translateX(0) translateY(-63%) scale(1);
  }

  ${ThemeSwitcher}:checked ~ .is-unchecked {
    transform: translateX(-190%) translateY(-61%) scale(0);
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShrinking: false,
      isChecked: true,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  static contextType = ThemeContext;

  handleChange(e) {
    this.setState((state) => ({
      ...state,
      isChecked: e.target.checked,
    }));

    this.props.setTheme({
      currentTheme: e.target.checked ? "norse" : "greek",
    });

    this.props.handleRefresh();
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
        <ThemeCartContainer>
          <InputWrapper>
            <ThemeSwitcher
              checked={this.state.isChecked}
              onChange={this.handleChange}
            />
            <img
              src={omegaNorseIcon}
              alt="Jormungandur icon"
              className="is-checked"
            />
            <img
              src={omegaGreekIcon}
              alt="omega icon"
              className="is-unchecked"
            />
          </InputWrapper>
          <div></div>
          <Cart />
        </ThemeCartContainer>
      </StyledHeader>
    );
  }
}

Header.propTypes = {
  setTheme: PropTypes.func,
  handleRefresh: PropTypes.func,
};
