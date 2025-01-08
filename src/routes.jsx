import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { CartProvider } from "./components/CartProvider";
import ShopWrapper from "./pages/ShopWrapper";
import { GamePage } from "./pages/GamePage";

export const routes = [
  {
    path: "/",
    element: (
      <CartProvider>
        <App />
      </CartProvider>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "shop",
    element: (
      <CartProvider>
        <ShopWrapper />
      </CartProvider>
    ),
  },
  {
    path: "shop/game/:gameId",
    element: (
      <CartProvider>
        <GamePage />
      </CartProvider>
    ),
  },
];
