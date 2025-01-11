import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { CartProvider } from "./components/CartProvider";
import ShopWrapper from "./pages/ShopWrapper";
import { GamePage } from "./pages/GamePage";
import Layout from "./pages/Layout";

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
  },
];
