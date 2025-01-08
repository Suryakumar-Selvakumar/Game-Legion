import { element } from "prop-types";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import { CartProvider } from "./components/CartProvider";
import ShopWrapper from "./pages/ShopWrapper";

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
];
