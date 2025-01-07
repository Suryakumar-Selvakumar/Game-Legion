// libs
import { Component } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

// assets
import omegaNorseIcon from "../assets/icons/omega-norse.png";
import omegaGreekIcon from "../assets/icons/omega-greek.png";

const StyledFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 1rem 0;
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
  background-color: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0)
  );
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

export class Footer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: true,
    };

    this.handleChange = this.handleChange.bind(this);
  }

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

  componentDidMount() {
    const storedTheme = JSON.parse(localStorage.getItem("theme"));

    this.setState((state) => ({
      ...state,
      isChecked: storedTheme.currentTheme === "norse" ? true : false,
    }));
  }

  render() {
    return (
      <StyledFooter>
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
          <img src={omegaGreekIcon} alt="omega icon" className="is-unchecked" />
        </InputWrapper>
      </StyledFooter>
    );
  }
}

Footer.propTypes = {
  setTheme: PropTypes.func,
  handleRefresh: PropTypes.func,
};
