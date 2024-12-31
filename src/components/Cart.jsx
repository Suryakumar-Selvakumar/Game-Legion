// libs
import { Component, createRef } from "react";
import styled, { keyframes, ThemeContext } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const popIn = keyframes`
    0%{
        background-color: rgb(0, 0, 0, 0);
    }

    100% {
        background-color: rgb(0, 0, 0, 0.5);
    }
`;

const CartPage = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: rgb(0, 0, 0, 0.5);
`;

const slideIn = keyframes`
    0%{
        background-color: rgb(0, 0, 0, 0);
        transform: translateX(400px);

    }

    60% {
      transform: translateX(-30px);
    }

    100% {
        background-color: rgb(32, 32, 32, 1);
        transform: translateX(0p);
    }
`;

const slideOut = keyframes`
    0% {
        transform: translateX(0px);
    }

    100% {
        transform: translateX(400px);
    }
`;

const StyledCart = styled.div`
  position: absolute;
  z-index: 3;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  width: 400px;
  height: 100dvh;
  animation: ${slideIn} 500ms ease forwards;
  color: white;
  right: 0;
  box-shadow: 10px 0 10px black;

  &.hide-cart {
    animation: ${slideOut} 250ms ease forwards;
  }
`;

const CartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  width: inherit;
  padding: 2rem;
  align-items: center;

  h2 {
    font-family: myFontBold;
    font-size: 1.75rem;
  }

  button {
    background-color: rgb(32, 32, 32, 1);
    border: none;
    color: rgb(153, 153, 153);
    cursor: pointer;
  }
`;

const CartItems = styled.div``;

const Checkout = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    align-self: end;
  }
`;

const shine = keyframes`
    0% {
        left: -100px;
    }

    25% {
        left: 100%;
    }

    100% {
        left: 100%;
    }
`;

const Shine = styled.button`
  border: none;
  border-radius: 5px;
  padding: 7.5px 0;
  background: rgb(0, 0, 0);
  position: relative;
  overflow: hidden;
  color: #fff;
  cursor: pointer;
  font-family: myFontBold;

  &:before {
    content: "";
    position: absolute;
    width: 100px;
    height: 100%;
    background-image: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 0.8),
      rgba(255, 255, 255, 0) 70%
    );
    top: 0;
    left: -100px;
    animation: ${shine} 3s infinite linear;
  }
`;

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCart: false,
    };
    this.cartRef = createRef(null);
    this.callBackRef = createRef(null);
    this.callBackRef.current = this.props.setCart;
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
  }

  handleAnimationEnd() {
    this.state.hideCart && this.callBackRef.current();
  }

  componentDidMount() {
    const handleClickOutside = (e) => {
      if (
        !this.cartRef?.current?.contains(e.target) &&
        this.callBackRef.current
      ) {
        this.setState((state) => ({
          ...state,
          hideCart: true,
        }));
      }
    };

    document.addEventListener("click", handleClickOutside, true);

    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }

  render() {
    return (
      <>
        <StyledCart
          ref={this.cartRef}
          className={this.state.hideCart ? "hide-cart" : ""}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <CartHeader>
            <h2>Games</h2>
            <button>Clear</button>
          </CartHeader>
          <CartItems></CartItems>
          <Checkout>
            <p>Total: </p>
            <Shine>Checkout</Shine>
          </Checkout>
        </StyledCart>
        <CartPage />
      </>
    );
  }
}

Cart.propTypes = {
  setCart: PropTypes.func,
};

export default Cart;
