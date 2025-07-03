import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import CartProvider from "./components/CartProvider";
import ShopWrapper from "./pages/ShopWrapper";
import GamePage from "./pages/GamePage";
import Layout from "./pages/Layout";
import { element } from "prop-types";

export const routes = [
  {
    path: "/",
    element: (
      <CartProvider>
        <Layout>
          <App />
        </Layout>
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: (
      <CartProvider>
        <Layout>
          <ShopWrapper />
        </Layout>
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "shop/game/:gameId",
    element: (
      <CartProvider>
        <Layout>
          <GamePage />
        </Layout>
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "*",
    element: (
      <CartProvider>
        <Layout>
          <ErrorPage />
        </Layout>
      </CartProvider>
    ),
  },
];
