// libs
import { Component, createRef } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// assets
import tickIcon from "../assets/icons/tick.svg";

const StyledDropDown = styled.div`
  padding: 1.5rem 0rem 0rem 1rem;
  position: relative;
  margin-left: 1rem;
  width: min-content;
`;

const MenuOpener = styled.div`
  background-color: white;
  width: 220px;
  display: flex;
  padding: 5px 10px;
  border-radius: 10px;
  justify-content: space-between;
  gap: 0.25rem;
  cursor: pointer;
  align-items: center;

  svg {
    width: 25px;
    transition: 250ms cubic-bezier(0.61, -0.53, 0.43, 1.43);
  }

  svg.open {
    transform: rotate(180deg);
  }

  svg.close {
    transform: rotate(0deg);
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
  cursor: pointer;
  transform-origin: top center;
  transform: scaleY(0);

  &.open {
    animation: ${growDown} 250ms cubic-bezier(0.61, -0.53, 0.43, 1.43) forwards;
    box-shadow: 0px 4px 10px rgb(0, 0, 0, 0.25);
  }

  &.close {
    animation: ${growUp} 250ms ease forwards;
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  transition: all 250ms ease;

  &:hover {
    background-color: #e3e3e3;
  }

  img {
    width: 25px;
  }
`;

class DropDown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropDownOpen: false,
      firstLoad: true,
    };

    this.setDropDownOpen = this.setDropDownOpen.bind(this);
    this.setFirstLoad = this.setFirstLoad.bind(this);
    this.dropDownRef = createRef(null);
  }

  setDropDownOpen() {
    this.setState((state) => ({
      ...state,
      dropDownOpen: !this.state.dropDownOpen,
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

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true);
  }

  componentWillUnmount() {
    return () => {
      document.removeEventListener("click", this.handleClickOutside, true);
    };
  }

  render() {
    return (
      <StyledDropDown ref={this.dropDownRef}>
        <MenuOpener
          onClick={() => {
            this.setDropDownOpen();
            this.setFirstLoad();
          }}
        >
          <span>
            Order By: <b>{this.props.orderBy}</b>
          </span>
          <svg
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

        <Menu
          className={
            this.state.firstLoad
              ? ""
              : this.state.dropDownOpen
              ? "open"
              : "close"
          }
        >
          {this.props.menuItems &&
            this.props.menuItems.map((item, index) => (
              <MenuItem
                key={index}
                onClick={() => {
                  this.props.setOrderBy(item);
                  this.setDropDownOpen();
                }}
              >
                <span>{item}</span>
                {this.props.orderBy === item && (
                  <img src={tickIcon} alt="a tick icon" />
                )}
              </MenuItem>
            ))}
        </Menu>
      </StyledDropDown>
    );
  }
}

DropDown.propTypes = {
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func,
  menuItems: PropTypes.array,
};

export default DropDown;
