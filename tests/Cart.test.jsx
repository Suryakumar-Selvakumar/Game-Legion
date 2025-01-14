import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

// components
import App from "../src/App";
import CartProvider from "../src/components/CartProvider";

describe("Cart testing", () => {
  it("opens when the Cart button is clicked", async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    await user.click(cartButton);

    waitFor(() => expect(screen.findByText("Total")).toBeInTheDocument());
  });
});
