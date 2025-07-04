// libs
import { Component, createRef } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import PropTypes from "prop-types";
import media from "../utils/breakpoints";
import { FocusTrap } from "focus-trap-react";

const StyledDropDown = styled.div`
  width: max-content;
`;

const MenuOpener = styled.button`
  background-color: white;
  border: none;
  width: 220px;
  display: flex;
  padding: 5px 10px;
  border-radius: 10px;
  justify-content: space-between;
  gap: 0.25rem;
  cursor: pointer;
  align-items: center;
  user-select: none;

  svg {
    user-select: none;
    width: 25px;
    transition: 250ms cubic-bezier(0.61, -0.53, 0.43, 1.43);
  }

  svg.open {
    transform: rotate(180deg);
  }

  svg.close {
    transform: rotate(0deg);
  }

  @media ${media.mobile} {
    font-size: 0.75rem;
    gap: 0rem;
    padding: 4.5px 7.5px;
    padding-right: 5px;

    svg {
      width: 20px;
    }
  }
`;

const growDown = keyframes`
    0%{
        transform: scaleY(0);
    }

    100% {
        transform: scaleY(1);
    }
`;

const growUp = keyframes`
    0%{
        transform: scaleY(1);
        opacity: 1;
    }

    100% {
        transform: scaleY(0);
        opacity: 0;
    }
`;

const Menu = styled.ul`
  position: absolute;
  list-style-type: none;
  padding: 4.5px 7.5px;
  border: 1px solid grey;
  width: 220px;
  background-color: white;
  border-radius: 10px;
  z-index: 3;
  transform-origin: top center;
  transform: scaleY(0);

  &.open {
    animation: ${growDown} 250ms cubic-bezier(0.61, -0.53, 0.43, 1.43) forwards;
    box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.25);
  }

  &.close {
    animation: ${growUp} 250ms ease forwards;
  }

  @media ${media.mobile} {
    font-size: 0.825rem;
  }
`;

const MenuItem = styled.li`
  color: black;
  margin: 5px 0;
  width: 100%;
  height: 100%;
  text-align: left;
  background: none;
  border: none;
  padding: 1px 7.5px;
  cursor: pointer;
  border-radius: 10px;
  transition: all 250ms ease;

  button {
    width: 100%;
    background-color: transparent;
    cursor: pointer;
    border: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &:hover {
    background-color: #e3e3e3;
  }

  svg {
    width: 25px;
  }

  @media ${media.mobile} {
    padding: 1px 0px 1px 5px;
  }
`;

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownOpen: false,
      firstLoad: true,
      isMobileView: window.matchMedia(media.mobile).matches,
    };

    this.setDropDownOpen = this.setDropDownOpen.bind(this);
    this.setFirstLoad = this.setFirstLoad.bind(this);
    this.dropDownRef = createRef(null);
    this.menuOpenerRef = createRef(null);
    this.setIsMobileView = this.setIsMobileView.bind(this);
    this.mobileRef = createRef(null);
    this.handleMediaChange = this.handleMediaChange.bind(this);
    this.handleEscapePress = this.handleEscapePress.bind(this);
  }

  handleMediaChange(e, currentView) {
    currentView === "mobile"
      ? this.setIsMobileView(e.matches)
      : this.setIsTabletView(e.matches);
  }

  setIsMobileView(currentState) {
    this.setState((state) => ({
      ...state,
      isMobileView: currentState,
    }));
  }

  static contextType = ThemeContext;

  setDropDownOpen() {
    this.setState((state) => ({
      ...state,
      dropDownOpen: !this.state.dropDownOpen,
      isMobileView: window.matchMedia(media.mobile).matches,
    }));
  }

  setFirstLoad() {
    this.setState((state) => ({
      ...state,
      firstLoad: false,
    }));
  }

  handleClickOutside = (e) => {
    if (
      !this.dropDownRef?.current?.contains(e.target) &&
      this.state.dropDownOpen
    ) {
      this.setDropDownOpen();
    }
  };

  handleEscapePress(e) {
    if (this.state.dropDownOpen) {
      if (e.key === "Escape") {
        this.setDropDownOpen();
      }
    }
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);

    this.mobileRef.current = window.matchMedia(media.mobile);
    this.mobileRef.current.addEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    document.addEventListener("keydown", this.handleEscapePress);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true);

    this.mobileRef.current.removeEventListener("change", (e) =>
      this.handleMediaChange(e, "mobile")
    );

    document.removeEventListener("keydown", this.handleEscapePress);
  }

  render() {
    const theme = this.context;

    return (
      <StyledDropDown ref={this.dropDownRef}>
        <MenuOpener
          ref={this.menuOpenerRef}
          onClick={() => {
            this.setDropDownOpen();
            this.setFirstLoad();
          }}
          style={{
            width: this.state.isMobileView
              ? this.props.count === 1
                ? "160px"
                : "145px"
              : "",
          }}
          aria-haspopup="listbox"
          aria-expanded={this.state.dropDownOpen}
          aria-controls="dropdown-menu"
          data-testid={
            this.props.menuName === "Order by: " ? "order-by" : "sort-by"
          }
        >
          <span>
            {this.props.menuName}
            <b
              data-testid={
                this.props.menuName === "Order by: "
                  ? "order-by-block"
                  : "sort-by-block"
              }
            >
              {this.props.menuItem}
            </b>
          </span>
          <svg
            aria-hidden="true"
            className={
              this.state.firstLoad
                ? ""
                : this.state.dropDownOpen
                ? "open"
                : "close"
            }
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fill="rgb(45, 45, 45)"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </MenuOpener>
        <FocusTrap
          active={this.state.dropDownOpen}
          focusTrapOptions={{
            clickOutsideDeactivates: true,
          }}
        >
          <Menu
            id="dropdown-menu"
            role="listbox"
            aria-label={
              this.props.menuName === "Order by: "
                ? "Order by menu"
                : "Sort by menu"
            }
            data-testid={
              this.props.menuName === "Order by: "
                ? "order-by-menu"
                : "sort-by-menu"
            }
            className={
              this.state.firstLoad
                ? ""
                : this.state.dropDownOpen
                ? "open"
                : "close"
            }
            style={{
              width: this.state.isMobileView
                ? this.props.count === 1
                  ? "160px"
                  : "145px"
                : "",
            }}
          >
            {this.props.menuItems &&
              this.props.menuItems.map((item, index) => (
                <MenuItem key={index}>
                  <button
                    role="option"
                    tabIndex={this.state.dropDownOpen ? 0 : -1}
                    data-testid={
                      this.props.menuName === "Order by: "
                        ? "order-by-options"
                        : "sort-by-options"
                    }
                    onClick={() => {
                      this.props.setMenuItem(item);
                      this.setDropDownOpen();
                    }}
                    aria-selected={this.props.menuItem === item}
                  >
                    <span>{item}</span>
                    {this.props.menuItem === item && (
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        fill={
                          theme.currentTheme === "norse" ? "#46afe8" : "#ff5a5a"
                        }
                        viewBox="0 0 1024 1024"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g id="SVGRepo_bgCarrier" strokeWidth="0" />

                        <g
                          id="SVGRepo_tracerCarrier"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />

                        <g id="SVGRepo_iconCarrier">
                          <path d="M760 380.4l-61.6-61.6-263.2 263.1-109.6-109.5L264 534l171.2 171.2L760 380.4z" />
                        </g>
                      </svg>
                    )}
                  </button>
                </MenuItem>
              ))}
          </Menu>
        </FocusTrap>
      </StyledDropDown>
    );
  }
}

DropDown.propTypes = {
  menuItem: PropTypes.string,
  setMenuItem: PropTypes.func,
  menuItems: PropTypes.array,
  menuName: PropTypes.string,
  count: PropTypes.number,
};

export default DropDown;
