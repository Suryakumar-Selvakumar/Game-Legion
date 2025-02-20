// libs
import { Component, createRef } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { motion } from "framer-motion";

// Context
import { CartContext } from "./CartContext";

// assets
import placeHolderImage from "../assets/icons/placeholder-image.jpg";
import media from "../utils/breakpoints";

const CartPage = styled.div`
  position: fixed;
  min-height: 100%;
  width: 100dvw;
  top: 0vh;
  left: 0;
  z-index: 2;
  background-color: rgb(0, 0, 0, 0.5);
`;

const slideIn = keyframes`
    0%{
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

const slideInMobile = keyframes`
    0%{
        background-color: rgb(32, 32, 32, 1);
        transform: translateX(275px);
    }

    60% {
      transform: translateX(-20px);
    }

    100% {
      background-color: rgb(32, 32, 32, 1);
        transform: translateX(0);
    }
`;

const slideOutMobile = keyframes`
    0% {
        transform: translateX(0px);
        background-color: rgb(32, 32, 32, 1);
    }

    100% {
        transform: translateX(275px);
        background-color: rgb(32, 32, 32, 1);
    }
`;

const StyledCart = styled(motion.div).attrs({
  initial: { x: 360 },
  animate: { x: 0 },
  transition: { type: "spring", bounce: 0.35, duration: 0.7 },
  exit: { x: 360 },
})`
  position: fixed;
  z-index: 6;
  display: grid;
  grid-template-rows: max-content 1fr max-content;
  width: 400px;
  height: 100vh;
  background-color: rgb(32, 32, 32, 1);
  top: 0dvh;
  color: white;
  right: 0;
  overflow: scroll;
  scrollbar-width: none;
  will-change: transform;

  &.hide-cart {
    animation: ${slideOut} 250ms ease forwards;
  }

  @media ${media.mobile} {
    width: 275px;
    animation: ${slideInMobile} 500ms ease forwards;

    &.hide-cart {
      animation: ${slideOutMobile} 250ms ease forwards;
    }
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

  @media ${media.mobile} {
    padding: 1rem 2rem;

    h2 {
      font-size: 1.5rem;
    }
  }
`;

const Checkout = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  p {
    align-self: start;
    font-size: 1.15rem;
    display: flex;
    gap: 0.25rem;
    color: rgb(153, 153, 153);
  }

  @media ${media.mobile} {
    gap: 0.5rem;

    p {
      font-size: 1rem;
    }
  }
`;

export const shine = keyframes`
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

  @media ${media.mobile} {
    font-size: 1rem;
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 0 2rem;

  a {
    text-decoration: none;
    color: white;
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
  user-select: none;
  transition: all 0.3s ease;
  opacity: 1;

  &.hide-cart {
    display: none;
  }

  &.delete {
    opacity: 0;
    transform: translateX(-350px);
  }

  @media ${media.mobile} {
    transition: all 0.35s ease;

    &.delete {
      transform: translateX(-250px);
    }
  }

  & > a {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: end;
    gap: 1rem;
    cursor: pointer;
    line-height: 1.15;
  }

  & > a > div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  @media ${media.mobile} {
    gap: 0.75rem;

    & > a {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: end;
      text-align: end;
      gap: 0.75rem;
      cursor: pointer;
      line-height: 1.15;
    }

    & > a > div {
      gap: 0.5rem;
    }
  }
`;

const GameImage = styled.img`
  width: 150px;
  height: 100px;
  border-radius: 10px;

  @media ${media.mobile} {
    width: 100%;
  }
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

  @media ${media.mobile} {
    width: 20px;
  }
`;

class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideCart: false,
      isDeleted: null,
    };
    this.cartRef = createRef(null);
    this.callBackRef = createRef(null);
    this.callBackRef.current = this.props.setCart;
    this.handleAnimationEnd = this.handleAnimationEnd.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.clearCart = this.clearCart.bind(this);
    this.getTotal = this.getTotal.bind(this);
    this.cartClickRef = createRef(null);
  }

  static contextType = CartContext;

  handleAnimationEnd() {
    this.state.hideCart && this.callBackRef.current();
  }

  removeItem(gameId) {
    const { cart, setCart, theme, setTheme } = this.context;
    this.setState((state) => ({
      ...state,
      isDeleted: gameId,
    }));

    setTimeout(() => {
      setCart(cart.filter((item) => item.id !== gameId));
    }, 450);
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

    this.cartClickRef.current = handleClickOutside;

    document.addEventListener("click", this.cartClickRef.current, true);
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.cartClickRef.current, true);

    this.setState((state) => ({
      ...state,
      isDeleted: null,
    }));
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
              <CartItem
                key={game.id}
                className={this.state.isDeleted === game.id ? "delete" : ""}
              >
                <RemoveButton
                  data-testid="remove"
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
                <Link
                  to={
                    this.props.isInShop
                      ? `game/${String(game.id)}`
                      : `/shop/game/${String(game.id)}`
                  }
                  state={{
                    currentPath: !this.props.isInShop ? "home" : "shop",
                  }}
                  replace={!this.props.isInShop && true}
                >
                  <GameImage
                    src={game.image !== null ? game.image : placeHolderImage}
                  />
                  <div>
                    <GameName data-testid="game-cart-name">
                      {game.name}
                    </GameName>
                    <GamePrice data-testid="game-cart-price">
                      ${game.price}
                    </GamePrice>
                  </div>
                </Link>
              </CartItem>
            ))}
          </CartItems>
          <Checkout>
            <p>
              <span>Total:</span>{" "}
              <span data-testid="total">${this.getTotal()}</span>
            </p>
            <Shine>Checkout</Shine>
          </Checkout>
        </StyledCart>
        <CartPage data-testid="cart-page" />
      </>
    );
  }
}

Cart.propTypes = {
  setCart: PropTypes.func,
  isInShop: PropTypes.bool,
};

export default Cart;
