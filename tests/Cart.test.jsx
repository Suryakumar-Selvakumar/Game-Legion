// libs
import { describe, it, expect } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

// components
import App from "../src/App";
import CartProvider from "../src/components/CartProvider";
import Cart from "../src/components/Cart";
import { CartContext } from "../src/components/CartContext";

describe("Cart", () => {
  it("opens when the cart button is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);

    // Assert
    await screen.findByText("Total:");
  });

  it("closes when area outside cart is clicked", async () => {
    // Arrange
    const user = userEvent.setup();
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);
    await user.click(screen.getByTestId("cart-page"));

    // Assert
    waitFor(() => expect(screen.queryByText("Total:")).not.toBeInTheDocument());
  });

  it("indicates when there are items in the cart using a dot icon", () => {
    // Arrange
    const user = userEvent.setup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Test Game 1",
          image: "dummyUrl",
          price: 39.99,
        },
        {
          id: 2,
          name: "Test Game 2",
          image: "dummyUrl",
          price: 29.99,
        },
      ])
    );
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const dotIcon = screen.getByTestId("dot-icon");

    // Assert
    expect(dotIcon).toBeInTheDocument();
  });

  it("displays the count of the items correctly", async () => {
    // Arrange
    const user = userEvent.setup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Test Game 1",
          image: "dummyUrl",
          price: 39.99,
        },
        {
          id: 2,
          name: "Test Game 2",
          image: "dummyUrl",
          price: 29.99,
        },
      ])
    );
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);

    // Assert
    // Check that the count of the items matches the dummy data provided
    await waitFor(() => {
      const gamesCount = screen.getByRole("heading", { name: "2 Games" });
      expect(gamesCount).toBeInTheDocument();
    });
  });

  it("displays the total price of the items correctly", async () => {
    // Arrange
    const user = userEvent.setup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Test Game 1",
          image: "dummyUrl",
          price: 30,
        },
        {
          id: 2,
          name: "Test Game 2",
          image: "dummyUrl",
          price: 20,
        },
      ])
    );
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);

    // Assert
    // Check that the count of the items matches the dummy data provided
    await waitFor(() => {
      const total = screen.getByTestId("total");
      expect(total.textContent).toMatch("$50");
    });
  });

  it("deletes an item when its remove button is pressed", async () => {
    // Arrange
    const user = userEvent.setup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Test Game 1",
          image: "dummyUrl",
          price: 39.99,
        },
      ])
    );
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);

    // Assert
    // Check that the dummy item exists
    await waitFor(() => {
      const dummyItem = screen.getByText("Test Game 1");
      expect(dummyItem).toBeInTheDocument();
    });
    // Click its remove button
    await user.click(screen.getByTestId("remove"));
    // Check that the game is gone
    await waitFor(() => {
      const gamesCount = screen.getByRole("heading", { name: "0 Games" });
      expect(gamesCount).toBeInTheDocument();
    });
  });

  it("clears all items when the clear button is pressed", async () => {
    // Arrange
    const user = userEvent.setup();
    localStorage.setItem(
      "cart",
      JSON.stringify([
        {
          id: 1,
          name: "Test Game 1",
          image: "dummyUrl",
          price: 39.99,
        },
        {
          id: 2,
          name: "Test Game 2",
          image: "dummyUrl",
          price: 29.99,
        },
      ])
    );
    render(
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    );
    const cartButton = screen.getByAltText("a cart icon");

    // Act
    await user.click(cartButton);

    // Assert
    // Check that the games exist
    await waitFor(() => {
      const gamesCount = screen.getByRole("heading", { name: "2 Games" });
      expect(gamesCount).toBeInTheDocument();
    });
    // Click the Clear button
    await user.click(screen.getByRole("button", { name: "Clear" }));
    // Check that the games are gone
    await waitFor(() => {
      const gamesCount = screen.getByRole("heading", { name: "0 Games" });
      expect(gamesCount).toBeInTheDocument();
    });
  });
});
