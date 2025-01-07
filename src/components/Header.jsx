// libs
import { Component } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// assets
import searchIcon from "../assets/icons/search.svg";
import cartIcon from "../assets/icons/cart.svg";
import omegaNorseIcon from "../assets/icons/omega-norse.png";
import omegaGreekIcon from "../assets/icons/omega-greek.png";

// components
import Cart from "./Cart";
import Preview from "./Preview";
import { CartContext } from "./CartContext";

const dropDown = keyframes`
  0% {
    transform: translateY(-100px);
  }

  100% {
    transform: translateY(0);
  }
`;

const moveUp = keyframes`
    0% {
    transform: translateY(0);
  }

  100% {
    transform: translateY(-100px);
  }
`;

export const StyledHeader = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  padding: 1rem;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1;
  background-color: rgb(15, 16, 17);
  top: 0;
  left: 0;

  &.visible {
    animation: ${dropDown} 500ms ease forwards;
  }

  &.hidden {
    animation: ${moveUp} 500ms ease forwards;
  }
`;

const Logo = styled(Link)`
  display: flex;
  text-decoration: none;
  width: min-content;

  font-family: ${(props) =>
    props.theme.currentTheme === "norse"
      ? "myFontLogoNorse"
      : "myFontLogoGreek"};
  font-size: 2.5rem;
  color: white;
  display: flex;
  align-items: end;
  gap: ${(props) => (props.theme.currentTheme === "norse" ? "" : "0.2rem")};

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

const SearchInputContainer = styled.div`
  display: flex;

  img {
    width: 25px;
    position: relative;
    left: -2rem;
    cursor: pointer;
  }
`;

const SearchBarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  font-size: 1.15rem;
  border: none;
  /* position: relative;
  left: -7rem; */
  width: 350px;
  box-shadow: 0 0 2.5px rgb(115, 115, 115);

  &:focus {
    animation: ${expand} 375ms ease forwards;
  }

  &.shrink {
    animation: ${shrink} 375ms ease-in-out forwards;
  }
`;

const CartIcon = styled.img.attrs({
  src: cartIcon,
  alt: "a cart icon",
})`
  height: 40px;
  cursor: pointer;
`;

const CartContainer = styled.div`
  display: flex;
  transition: transform 150ms ease;
  width: fit-content;
  place-self: center end;

  svg {
    width: 12.5px;
    position: relative;
    top: -20px;
    right: 0px;
  }

  &:hover {
    transform: scale(1.1);
  }
`;

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isShrinking: false,
      isCartPageVisible: false,
      isScrollDisabled: false,
      isHeaderVisible: true,
      scrollVal: undefined,
      searchInput: "",
      isPreviewVisible: false,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.setPreviewVisible = this.setPreviewVisible.bind(this);
  }

  setPreviewVisible() {
    this.setState((state) => ({
      ...state,
      isPreviewVisible: !state.isPreviewVisible,
    }));
  }

  static contextType = CartContext;

  handleScroll() {
    const currentScrollVal =
      window.scrollY || document.documentElement.scrollTop;

    if (this.state.scrollVal === undefined) {
      this.setState((state) => ({
        ...state,
        scrollVal: currentScrollVal,
      }));
    }

    if (currentScrollVal > this.state.scrollVal) {
      this.setState((state) => ({
        ...state,
        isHeaderVisible: false,
      }));
      document.activeElement.blur();
    } else {
      this.setState((state) => ({
        ...state,
        isHeaderVisible: true,
      }));
    }

    this.setState((state) => ({
      ...state,
      scrollVal: currentScrollVal,
    }));
  }

  handleBlur() {
    this.setState((state) => ({
      ...state,
      isShrinking: true,
      isPreviewVisible: false,
    }));
  }

  handleAnimationEnd() {
    this.setState((state) => ({
      ...state,
      isShrinking: false,
    }));
  }

  handleCartClick() {
    this.setState((state) => ({
      ...state,
      isCartPageVisible: !state.isCartPageVisible,
      isScrollDisabled: !state.isScrollDisabled,
    }));
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isScrollDisabled !== prevState.isScrollDisabled) {
      if (this.state.isScrollDisabled === true)
        document.body.style.overflow = "hidden";
      else document.body.style.overflow = "auto";
    }
  }

  setSearchInput(e) {
    setTimeout(
      () =>
        this.setState(
          (state) => ({
            ...state,
            searchInput: e.target.value,
          }),
          () => console.log(this.state.searchInput)
        ),
      1000
    );
  }

  render() {
    const { cart, setCart, theme, setTheme } = this.context;

    return (
      <>
        <StyledHeader
          className={this.state.isHeaderVisible ? "visible" : "hidden"}
        >
          <Logo to="/">
            GAME
            <LogoIcon
              src={
                theme.currentTheme === "norse" ? omegaNorseIcon : omegaGreekIcon
              }
              alt={
                theme.currentTheme === "norse"
                  ? "Jormungandur icon"
                  : "omega icon"
              }
            />
            LEGION
          </Logo>
          <SearchBarContainer>
            <SearchInputContainer>
              <SearchBar
                onFocus={this.setPreviewVisible}
                onBlur={this.handleBlur}
                onAnimationEnd={this.handleAnimationEnd}
                className={this.state.isShrinking ? "shrink" : ""}
                onKeyUp={this.setSearchInput}
              />
              <img src={searchIcon} alt="a search icon" />
            </SearchInputContainer>
            {this.state.searchInput !== "" &&
              this.state.isPreviewVisible &&
              this.state.isHeaderVisible && (
                <Preview searchInput={this.state.searchInput} />
              )}
          </SearchBarContainer>
          <CartContainer>
            <CartIcon onClick={this.handleCartClick} />
            <svg
              viewBox="0 0 16 16"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                visibility: cart.length >= 1 ? "visible" : "hidden",
              }}
            >
              <path
                fill={theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"}
                d="M8 3a5 5 0 100 10A5 5 0 008 3z"
              />
            </svg>
          </CartContainer>
        </StyledHeader>
        {this.state.isCartPageVisible && (
          <Cart setCart={this.handleCartClick} />
        )}
      </>
    );
  }
}

Header.propTypes = {
  setTheme: PropTypes.func,
  handleRefresh: PropTypes.func,
};

export { expand };
