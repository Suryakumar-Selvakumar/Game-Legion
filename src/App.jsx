// libs
import { useState } from "react";
import { ThemeProvider } from "styled-components";

// styles
import "./App.css";

// pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";

function App() {
  const [theme, setTheme] = useState({
    currentTheme: "norse",
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <Home setTheme={setTheme} /> */}
        <Shop />
      </ThemeProvider>
    </>
  );
}

export default App;
