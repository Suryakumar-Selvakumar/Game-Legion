// styles
import "./App.css";

// pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";

// components
import { CartProvider } from "./components/CartProvider";

function App() {
  return (
    <CartProvider>
      {/* <Home /> */}
      <Shop />
    </CartProvider>
  );
}

export default App;
