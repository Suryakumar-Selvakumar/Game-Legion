// libs
import { Component, createRef } from "react";
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
import withRouter from "./withRouter";

// utils
import media from "../utils/breakpoints";

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

export const StyledHeader = styled.header`
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

  @media ${media.mobile} {
    display: flex;
    justify-content: space-between;
    gap: 1.5rem;
  }

  @media ${media.tablet} {
    display: flex;
    justify-content: space-between;
  }

  @media ${media.tabletPro} {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled(Link)`
  display: flex;
  text-decoration: none;
  width: min-content;
  padding-top: ${(props) =>
    props.theme.currentTheme === "norse" ? "0px" : "2.75px"};
  font-family: ${(props) =>
    props.theme.currentTheme === "norse"
      ? "myFontLogoNorse"
      : "myFontLogoGreek"};
  font-size: ${(props) =>
    props.theme.currentTheme === "norse" ? "2rem" : "1.95rem"};
  color: white;
  display: flex;
  align-items: end;
  gap: ${(props) => (props.theme.currentTheme === "norse" ? "" : "0.2rem")};

  cursor: pointer;
  transition: transform 250ms ease;

  &:hover {
    transform: scale(1.05);
  }

  @media ${media.mobile} {
    width: fit-content;
    padding-left: ${(props) =>
      props.theme.currentTheme === "norse" ? "0" : "7.5px"};
    padding-top: ${(props) =>
      props.theme.currentTheme === "norse" ? "0" : "7.5px"};
  }

  @media ${media.tablet} {
    width: fit-content;
  }
`;

const LogoIcon = styled.img`
  height: ${(props) =>
    props.theme.currentTheme === "norse" ? "50px" : "42.5px"};
  width: ${(props) =>
    props.theme.currentTheme === "norse" ? "65px" : "62.5px"};
  position: relative;
  top: -0.25rem;

  @media ${media.mobile} {
    height: ${(props) =>
      props.theme.currentTheme === "norse" ? "50px" : "42.5px"};
    width: ${(props) =>
      props.theme.currentTheme === "norse" ? "60px" : "47.5px"};
    top: ${(props) =>
      props.theme.currentTheme === "norse" ? "-0.1rem" : "-0.35rem"};
  }

  @media ${media.tablet} {
    height: ${(props) =>
      props.theme.currentTheme === "norse" ? "60px" : "52.5px"};
    width: ${(props) =>
      props.theme.currentTheme === "norse" ? "65px" : "57.5px"};
    top: ${(props) =>
      props.theme.currentTheme === "norse" ? "-0.1rem" : "-0.35rem"};
  }
`;

const SearchIcon = styled(Link)`
  text-decoration: none;
  cursor: pointer;
  position: relative;
  left: -2rem;
  display: flex;
  align-items: center;

  img {
    width: 25px;
  }

  @media ${media.mobile} {
    & > img {
      display: none;
    }
  }

  @media ${media.tablet} {
    left: -1rem;
  }
`;

const SearchInputContainer = styled.div`
  display: flex;

  & > img {
    width: 25px;
    position: relative;
    left: -2rem;
    cursor: pointer;
  }

  @media ${media.mobile} {
    margin-left: ${(props) =>
      props.theme.currentTheme === "norse" ? "-5px" : "0"};
    & > img {
      display: none;
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const expand = keyframes`
  0% {
    width: 350px;
  }

  50% {
    width: 550px
  }

  75% {
    width: 540px;
  }

  100% {
    width: 550px;
  }
`;

const shrink = keyframes`
  0% {
    width: 550px;
  }

  50% {
    width: 350px;
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
  padding: 0.275rem 2.25rem 0.275rem 1rem;
  font-size: 1rem;
  border: none;
  width: 350px;
  box-shadow: 0 0 2.5px rgb(115, 115, 115);

  &:focus {
    animation: ${expand} 375ms ease forwards;
  }

  &.shrink {
    animation: ${shrink} 375ms ease-in-out forwards;
  }

  @media ${media.mobile} {
    width: 200px;
    font-size: 1rem;
    padding: 0.25rem 1rem 0.25rem 1rem;

    &:focus {
      animation: none;
    }

    &.shrink {
      animation: none;
    }
  }

  @media ${media.tablet} {
    position: relative;
    left: 1rem;
  }
`;

const CartIcon = styled.img.attrs({
  src: cartIcon,
  alt: "a cart icon",
})`
  height: 35px;
  cursor: pointer;

  @media ${media.mobile} {
    height: 35px;
  }
`;

const CartContainer = styled.div`
  display: flex;
  transition: transform 150ms ease;
  width: fit-content;
  place-self: center end;

  svg {
    width: 11.5px;
    position: relative;
    top: -18px;
    right: 0px;
  }

  &:hover {
    transform: scale(1.1);
  }

  @media ${media.mobile} {
    svg {
      top: -15px;
    }
  }
`;

class Header extends Component {
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
      isSearchOn: false,
      isMobileView: window.matchMedia(media.mobile).matches,
      isTabletView: window.matchMedia(media.tablet).matches,
    };

    this.handleBlur = this.handleBlur.bind(this);
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.setSearchInput = this.setSearchInput.bind(this);
    this.setPreviewVisible = this.setPreviewVisible.bind(this);
    this.handleInputSubmit = this.handleInputSubmit.bind(this);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.tabletRef = createRef(null);
  }

  handleMediaChange(e, currentView) {
    currentView === "mobile"
      ? this.setIsMobileView(e.matches)
      : this.setIsTabletView(e.matches);
  }

  setIsTabletView(currentState) {
    this.setState((state) => ({
      ...state,
      isTabletView: currentState,
    }));
  }

  setIsMobileView(currentState) {
    this.setState((state) => ({
      ...state,
      isMobileView: currentState,
    }));
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

  handleInputSubmit(e) {
    if (e.key === "Enter") {
      this.props.navigate("/shop", {
        state: { pageState: "Results", searchInput: this.state.searchInput },
      });

      if (this.props.isInShop) {
        this.props.setShopSearchInput(this.state.searchInput);
        this.props.setPageState("Results");
        document.activeElement.blur();
      }
    }
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);

    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    this.tabletRef.current = window.matchMedia(media.tablet);
    this.tabletRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "tablet")
    );
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);

    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    this.tabletRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "tablet")
    );
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
        this.setState((state) => ({
          ...state,
          searchInput: e.target.value,
        })),
      500
    );
  }

  render() {
    const { cart, theme } = this.context;

    return (
      <>
        <StyledHeader
          className={this.state.isHeaderVisible ? "visible" : "hidden"}
        >
          <Logo role="banner" to="/" data-testid="logo">
            {!this.state.isMobileView && !this.state.isTabletView && "GAME"}
            <LogoIcon
              aria-hidden="true"
              data-testid="logo-icon"
              src={
                theme.currentTheme === "norse" ? omegaNorseIcon : omegaGreekIcon
              }
              alt=""
            />
            {!this.state.isMobileView && !this.state.isTabletView && "LEGION"}
          </Logo>
          <SearchContainer role="search">
            <SearchInputContainer>
              <SearchBar
                id="search-input"
                data-testid="search-input"
                aria-label="Search games"
                onFocus={this.setPreviewVisible}
                onBlur={this.handleBlur}
                onAnimationEnd={this.handleAnimationEnd}
                className={this.state.isShrinking ? "shrink" : ""}
                onKeyUp={this.setSearchInput}
                onKeyDown={this.handleInputSubmit}
              />
              {!this.props.isInShop ? (
                <SearchIcon
                  data-testid="search-icon-link"
                  aria-label="Submit search input"
                  to={"/shop"}
                  state={{
                    pageState: "Results",
                    searchInput: this.state.searchInput,
                  }}
                  onMouseDown={(e) => e.preventDefault()}
                >
                  <img src={searchIcon} alt="" aria-hidden="true" />
                </SearchIcon>
              ) : (
                <img
                  data-testid="search-icon-link"
                  src={searchIcon}
                  alt="a search icon"
                  aria-label="Submit search input"
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      this.props.setShopSearchInput(this.state.searchInput);
                      this.props.setPageState("Results");
                    }
                  }}
                  onMouseDown={() => {
                    this.props.setShopSearchInput(this.state.searchInput);
                    this.props.setPageState("Results");
                  }}
                />
              )}
            </SearchInputContainer>
            {this.state.searchInput !== "" &&
              this.state.isPreviewVisible &&
              this.state.isHeaderVisible && (
                <Preview
                  searchInput={this.state.searchInput}
                  isInShop={this.props.isInShop}
                />
              )}
          </SearchContainer>
          <CartContainer>
            <CartIcon
              aria-label="Open cart"
              role="button"
              tabIndex={0}
              onClick={this.handleCartClick}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  this.handleCartClick();
                }
              }}
            />
            <svg
              data-testid="dot-icon"
              viewBox="0 0 16 16"
              role="presentation"
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
          <Cart setCart={this.handleCartClick} isInShop={this.props.isInShop} />
        )}
      </>
    );
  }
}

Header.propTypes = {
  isInShop: PropTypes.bool,
  setShopSearchInput: PropTypes.func,
  setPageState: PropTypes.func,
  navigate: PropTypes.any,
};

export default withRouter(Header);

export { expand };
