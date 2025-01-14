import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { ThemeProvider } from "styled-components";

const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(
    storedCart && typeof storedCart === "object" ? storedCart : []
  );

  const storedWishList = JSON.parse(localStorage.getItem("wish-list"));
  const [wishList, setWishList] = useState(
    storedWishList && typeof storedWishList === "object" ? storedWishList : []
  );

  const storedTheme = JSON.parse(localStorage.getItem("theme"));
  const [theme, setTheme] = useState(
    storedTheme && typeof storedTheme === "object"
      ? storedTheme
      : {
          currentTheme: "norse",
        }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("wish-list", JSON.stringify(wishList));
  }, [wishList]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <CartContext.Provider
      value={{ cart, setCart, theme, setTheme, wishList, setWishList }}
    >
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any,
};

export default CartProvider;
