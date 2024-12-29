import { useState } from "react";
import "./App.css";
import { Home } from "./pages/Home";
import { ThemeProvider } from "styled-components";

function App() {
  const [theme, setTheme] = useState({
    currentTheme: "norse",
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <Home setTheme={setTheme} />
      </ThemeProvider>
    </>
  );
}

export default App;
