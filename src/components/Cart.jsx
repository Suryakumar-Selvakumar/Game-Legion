// libs
import { Component, createRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// Context
import { CartContext } from "./CartContext";

// assets
import placeHolderImage from "../assets/icons/placeholder-image.jpg";
import closeIcon from "../assets/icons/close.svg";

const CartPage = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0vh;
  left: 0;
  z-index: 2;
  background-color: rgb(0, 0, 0, 0.5);
`;

const slideIn = keyframes`
    0%{
        /* background-color: rgb(0, 0, 0, 0); */
        background-color: rgb(32, 32, 32, 1);
        transform: translateX(400px);

    }

    60% {
      transform: translateX(-30px);
    }

    100% {
      background-color: rgb(32, 32, 32, 1);
        transform: translateX(0);
    }
`;

const slideOut = keyframes`
    0% {
        transform: translateX(0px);
        background-color: rgb(32, 32, 32, 1);
    }

    100% {
        transform: translateX(400px);
        background-color: rgb(32, 32, 32, 1);
    }
`;

const StyledCart = styled.div`
  position: fixed;
  z-index: 4;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  width: 400px;
  height: 100vh;
  top: 0vh;
  animation: ${slideIn} 500ms ease forwards;
  color: white;
  right: 0;
  box-shadow: 10px 0 10px black;
  overflow: scroll;
  scrollbar-width: none;

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

const Checkout = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    align-self: end;
    font-size: 1.15rem;
    color: rgb(153, 153, 153);
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
  font-family: myFontMedium;
  font-size: 1.1rem;

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

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 2rem;
`;

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const fadeOut = keyframes`
  0% {
    opacity: 1;
  }

  100% {
    opacity: 0;
  }
`;

const CartItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  padding: 1rem;
  border-radius: 10px;
  background-color: rgb(40, 40, 40);
  border-color: rgb(153, 153, 153);
  border-width: 1px;
  box-shadow: 0px 0px 5px rgb(32, 32, 32);
  gap: 0.25rem;

  animation: ${fadeIn} 500ms ease forwards;

  &.hide-cart {
    display: none;
  }

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: end;
    gap: 1rem;
    cursor: pointer;
    line-height: 1.15;
  }

  & > div > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

const GameImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 10px;
`;

const GameName = styled.p`
  overflow-wrap: break-word;
  font-size: 1rem;
`;

const GamePrice = styled.p`
  color: rgb(153, 153, 153);
`;

const RemoveButton = styled.svg`
  width: 22.5px;
  align-self: end;
  background-color: rgb(15, 16, 17);
  border-radius: 5px;
  cursor: pointer;
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
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.getTotal = this.getTotal.bind(this);
  }

  static contextType = CartContext;

  handleAnimationEnd() {
    this.state.hideCart && this.callBackRef.current();
  }

  removeItem(gameId) {
    const { cart, setCart, theme, setTheme } = this.context;

    setCart(cart.filter((item) => item.id !== gameId));
  }

  clearCart() {
    const { cart, setCart, theme, setTheme } = this.context;

    setCart([]);
  }

  getTotal() {
    const { cart, setCart, theme, setTheme } = this.context;
    let total = 0;

    cart.forEach((item) => (total += item.price));
    return total.toFixed(2);
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
    const { cart, setCart, theme, setTheme } = this.context;

    return (
      <>
        <StyledCart
          ref={this.cartRef}
          className={this.state.hideCart ? "hide-cart" : ""}
          onAnimationEnd={this.handleAnimationEnd}
        >
          <CartHeader>
            <h2>{cart.length} Games</h2>
            <button onClick={this.clearCart}>Clear</button>
          </CartHeader>
          <CartItems className={this.state.hideCart ? "hide-cart" : ""}>
            {cart.map((game) => (
              <CartItem key={game.id}>
                <RemoveButton
                  onClick={() => this.removeItem(game.id)}
                  viewBox="0 0 24 24"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g
                    id="Page-1"
                    stroke="none"
                    strokeWidth="1"
                    fill="none"
                    fillRule="evenodd"
                  >
                    <g id="Close">
                      <rect
                        id="Rectangle"
                        fillRule="nonzero"
                        x="0"
                        y="0"
                        width="24"
                        height="24"
                      ></rect>
                      <line
                        x1="16.9999"
                        y1="7"
                        x2="7.00001"
                        y2="16.9999"
                        id="Path"
                        stroke="rgb(153, 153, 153)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                      <line
                        x1="7.00006"
                        y1="7"
                        x2="17"
                        y2="16.9999"
                        id="Path"
                        stroke="rgb(153, 153, 153)"
                        strokeWidth="2"
                        strokeLinecap="round"
                      ></line>
                    </g>
                  </g>
                </RemoveButton>
                <div>
                  <GameImage
                    src={game.image !== null ? game.image : placeHolderImage}
                  />
                  <div>
                    <GameName>{game.name}</GameName>
                    <GamePrice>${game.price}</GamePrice>
                  </div>
                </div>
              </CartItem>
            ))}
          </CartItems>
          <Checkout>
            <p>Total: ${this.getTotal()}</p>
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
