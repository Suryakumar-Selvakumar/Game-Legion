import { Route } from "react-router-dom";
import CartProvider from "../components/CartProvider";
import Layout from "../pages/Layout";
import App from "../App";
import ShopWrapper from "../pages/ShopWrapper";
import GamePage from "../pages/GamePage";

// routes.js
export const HomeRoute = (
  <Route
    path="/"
    element={
      <CartProvider>
        <Layout>
          <App />
        </Layout>
      </CartProvider>
    }
  />
);

export const ShopRoute = (
  <Route
    path="shop"
    element={
      <CartProvider>
        <Layout>
          <ShopWrapper />
        </Layout>
      </CartProvider>
    }
  />
);

export const GamePageRoute = (
  <Route
    path="shop/game/:gameId"
    element={
      <CartProvider>
        <Layout>
          <GamePage />
        </Layout>
      </CartProvider>
    }
  />
);
