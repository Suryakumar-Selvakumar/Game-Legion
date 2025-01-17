// libs
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import { ShopRoute, GamePageRoute } from "../src/utils/routes";

// utils
import setFakeGamePageData from "../src/utils/setFakeGamePageData";
import setFakeImageData from "../src/utils/setFakeImageData";
import setFakeShopData from "../src/utils/setFakeShopData";

describe("GamePage", () => {
  beforeEach(() => {
    globalThis.user = userEvent.setup();
    globalThis.fetch = vi.fn();
    Object.defineProperty(window, "matchMedia", {
      writable: true,
      value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
  });

  afterEach(() => {
    vi.resetAllMocks();
    cleanup();
  });

  describe("Header", () => {
    it("search preview of a game leads to that game's page", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(
          setFakeGamePageData(1, "Dummy Search", [25, 35, 25, 15])
        )
        .mockResolvedValueOnce(setFakeImageData())
        .mockResolvedValueOnce(setFakeShopData("Search"))
        .mockResolvedValueOnce(
          setFakeGamePageData(2, "Dummy Search", [10, 70, 10, 10])
        )
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );
      const searchInput = screen.getByTestId("search-input");

      // Act
      await waitFor(() => {
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Dummy Search Game - 1"
        );
        expect(screen.queryByTestId("game-price").textContent).toEqual("$35");
      });
      await user.type(searchInput, "search");

      // Assert
      expect(searchInput).toHaveValue("search");
      await screen.findByText("Dummy Search Game - 1");
      await screen.findByText("Dummy Search Game - 2");
      const searchCards = screen.getAllByTestId("search-card");

      await user.click(searchCards[1]);

      await waitFor(() => {
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Dummy Search Game - 2"
        );
        expect(screen.queryByTestId("game-price").textContent).toEqual("$70");
      });
    });
  });

  describe("First Row", () => {
    it("legion button leads to the shop", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            {ShopRoute}
            {GamePageRoute}
          </Routes>
        </MemoryRouter>
      );
      const legionButton = screen.getByRole("link", { name: "Legion" });

      // Act
      await user.click(legionButton);

      // Assert
      // Shop-specific text
      await screen.findByText("Your Games");
      await screen.findByText("New Releases");
      await screen.findByText("Top");
      await screen.findByText("Platforms");
      await screen.findByText("Genres");
    });

    it("renders the game name correctly", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeGamePageData(1, "Test", [25, 35, 25, 15]))
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );

      // Assert
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Test Game - 1"
        )
      );
    });
  });

  describe("Drop down", () => {
    it("more button opens the dropdown with game details", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeGamePageData(1, "Test", [25, 35, 25, 15]))
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );
      const opener = screen.getByTestId("opener");
      const details = screen.getByTestId("details");

      // Act
      expect(
        window.getComputedStyle(details).getPropertyValue("max-height")
      ).toBe("0");
      await user.click(opener);

      // Assert
      expect(
        window.getComputedStyle(details).getPropertyValue("max-height")
      ).toBe("500px");
    });
  });

  describe("Cart", () => {
    it("add to cart button adds the game to the cart", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeGamePageData(1, "Test", [25, 35, 25, 15]))
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );
      const addToCartButton = screen.getByRole("button", {
        name: "Add to cart +",
      });
      const cartIcon = screen.getByAltText("a cart icon");

      // Act
      await user.click(addToCartButton);
      await user.click(cartIcon);

      // Assert
      await waitFor(() => {
        expect(screen.queryByTestId("game-cart-name").textContent).toEqual(
          "Test Game - 1"
        );
        expect(screen.queryByTestId("game-cart-price").textContent).toEqual(
          "$35"
        );
      });
    });

    it("add to cart button text changes to added after adding the game to cart", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeGamePageData(1, "Test", [25, 35, 25, 15]))
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );
      const addToCartButton = screen.getByRole("button", {
        name: "Add to cart +",
      });

      // Act
      await user.click(addToCartButton);

      // Assert
      await screen.findByText("Added");
    });
  });

  describe("Wishlist", () => {
    afterEach(() => {
      cleanup();
    });

    it("wishlist icon adds the game to the wishlist", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(
          setFakeGamePageData(1, "Wishlist", [25, 35, 25, 15])
        )
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            {ShopRoute}
            {GamePageRoute}
          </Routes>
        </MemoryRouter>
      );
      const legionButton = screen.getByRole("link", { name: "Legion" });

      // Act
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Wishlist Game - 1"
        )
      );
      await user.click(screen.getByTestId("wishlist-icon"));
      await user.click(legionButton);
      await screen.findByText("Your Games");
      const wishlistNavLink = screen.getByTestId("wishlist");
      await user.click(wishlistNavLink);

      // Assert
      await waitFor(() =>
        expect(screen.queryByTestId("game-card-name").textContent).toEqual(
          "Wishlist Game - 1"
        )
      );
    });

    it("wishlist icon removes the added game from the wishlist", async () => {
      // Arrange
      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          {
            id: 1,
            name: "Wishlist Game - 1",
            image: "dummyUrl",
            price: 35,
          },
        ])
      );
      fetch
        .mockResolvedValueOnce(
          setFakeGamePageData(1, "Wishlist", [25, 35, 25, 15])
        )
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            {ShopRoute}
            {GamePageRoute}
          </Routes>
        </MemoryRouter>
      );
      const legionButton = screen.getByRole("link", { name: "Legion" });

      // Act
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Wishlist Game - 1"
        )
      );
      await user.click(screen.getByTestId("wishlist-icon"));
      await user.click(legionButton);
      await screen.findByText("Your Games");
      const wishlistNavLink = screen.getByTestId("wishlist");
      await user.click(wishlistNavLink);

      // Assert
      await waitFor(() =>
        expect(screen.queryByTestId("games").children).toHaveLength(0)
      );
    });
  });
});
