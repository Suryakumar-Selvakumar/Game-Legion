import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { ThemeProvider } from "styled-components";

const CartProvider = ({ children }) => {
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const [cart, setCart] = useState(storedCart !== undefined ? storedCart : []);

  const storedTheme = JSON.parse(localStorage.getItem("theme"));
  const [theme, setTheme] = useState(
    storedTheme !== undefined
      ? storedTheme
      : {
          currentTheme: "norse",
        }
  );

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(theme));
  }, [theme]);

  return (
    <CartContext.Provider value={{ cart, setCart, theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any,
};

export default CartProvider;
