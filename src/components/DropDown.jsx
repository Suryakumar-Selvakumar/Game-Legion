// libs
import { Component, createRef } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import PropTypes from "prop-types";

// assets
import tickIcon from "../assets/icons/tick.svg";

const StyledDropDown = styled.div`
  padding: 1.5rem 2rem 0rem 1rem;
  position: relative;
  margin-left: 1rem;
`;

const MenuOpener = styled.div`
  background-color: white;
  width: 225px;
  display: flex;
  padding: 5px 7.5px;
  border-radius: 10px;
  justify-content: center;
  gap: 0.25rem;
  cursor: pointer;
  align-items: center;

  svg {
    width: 25px;
  }
`;

const growDown = keyframes`
    0%{
        transform: scaleY(0);
    }

    /* 80% {
        transform: scaleY(1.1);
    } */

    100% {
        transform: scaleY(1);
    }
`;

const growUp = keyframes`
    0%{
        transform: scaleY(1);
    }

    100% {
        transform: scaleY(0);
    }
`;

const Menu = styled.ul`
  position: absolute;
  list-style-type: none;
  padding: 4.5px 7.5px;
  border: 1px solid grey;
  width: 225px;
  background-color: white;
  border-radius: 10px;
  z-index: 3;
  cursor: pointer;
  transform-origin: top center;

  &.open {
    animation: ${growDown} 250ms cubic-bezier(0.61, -0.53, 0.43, 1.43) forwards;
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
  transition: all 500ms ease;

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
    };

    this.setDropDownOpen = this.setDropDownOpen.bind(this);
    this.dropDownRef = createRef(null);
  }

  setDropDownOpen() {
    this.setState((state) => ({
      ...state,
      dropDownOpen: !this.state.dropDownOpen,
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
        <MenuOpener onClick={this.setDropDownOpen}>
          <span>
            Order By: <b>{this.props.orderBy}</b>
          </span>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill="rgb(67, 67, 67)"
              d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"
            />
          </svg>
        </MenuOpener>

        <Menu className={this.state.dropDownOpen ? "open" : "close"}>
          <MenuItem
            onClick={() => {
              this.props.setOrderBy("Name");
            }}
            onAnimationEnd={this.setDropDownOpen}
          >
            <span>Name</span>
            {this.props.orderBy === "Name" && (
              <img src={tickIcon} alt="a tick icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.setOrderBy("Release Date");
            }}
            onAnimationEnd={this.setDropDownOpen}
          >
            <span>Release Date</span>
            {this.props.orderBy === "Release Date" && (
              <img src={tickIcon} alt="a tick icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.setOrderBy("Popularity");
            }}
            onAnimationEnd={this.setDropDownOpen}
          >
            <span>Popularity</span>
            {this.props.orderBy === "Popularity" && (
              <img src={tickIcon} alt="a tick icon" />
            )}
          </MenuItem>
          <MenuItem
            onClick={() => {
              this.props.setOrderBy("Rating");
            }}
            onAnimationEnd={this.setDropDownOpen}
          >
            <span>Rating</span>
            {this.props.orderBy === "Rating" && (
              <img src={tickIcon} alt="a tick icon" />
            )}
          </MenuItem>
        </Menu>
      </StyledDropDown>
    );
  }
}

DropDown.propTypes = {
  orderBy: PropTypes.string,
  setOrderBy: PropTypes.func,
};

export default DropDown;
