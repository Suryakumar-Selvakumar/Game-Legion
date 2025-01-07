import PropTypes from "prop-types";
import { useState } from "react";
import { CartContext } from "./CartContext";
import { ThemeProvider } from "styled-components";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [theme, setTheme] = useState({
    currentTheme: "norse",
  });

  return (
    <CartContext.Provider value={{ cart, setCart, theme, setTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.any,
};
