// libs
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeAll, beforeEach, describe, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import CartProvider from "../src/components/CartProvider";
import Layout from "../src/pages/Layout";
import GamePage from "../src/pages/GamePage";
import ShopWrapper from "../src/pages/ShopWrapper";

// utils
import assertShopItems from "../src/utils/assertShopItems";
import createFetchResponse from "../src/utils/createFetchResponse";

describe("GamePage", () => {
  beforeEach(() => {
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
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Search Game 1",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                name: "Search Game 1",
                background_image: "dummyUrl",
                id: 1,
                parent_platforms: [
                  { platform: { name: "PF1" } },
                  { platform: { name: "PF2" } },
                  { platform: { name: "PF3" } },
                ],
                ratings: [
                  { percent: 25 },
                  { percent: 35 },
                  { percent: 25 },
                  { percent: 15 },
                ],
              },
              {
                name: "Search Game 2",
                background_image: "dummyUrl",
                id: 2,
                parent_platforms: [
                  { platform: { name: "PF1" } },
                  { platform: { name: "PF2" } },
                  { platform: { name: "PF3" } },
                ],
                ratings: [
                  { percent: 25 },
                  { percent: 35 },
                  { percent: 25 },
                  { percent: 15 },
                ],
              },
            ],
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Search Game 2",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 10 },
              { percent: 70 },
              { percent: 10 },
              { percent: 10 },
            ],
            esrb_rating: { name: "M1" },
            id: 2,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
      const searchInput = screen.getByTestId("search-input");

      // Act
      await waitFor(() => {
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Search Game 1"
        );
        expect(screen.queryByTestId("game-price").textContent).toEqual("$35");
      });
      await user.type(searchInput, "search");

      // Assert
      expect(searchInput).toHaveValue("search");
      await screen.findByText("Search Game 1");
      await screen.findByText("Search Game 2");
      const searchCards = screen.getAllByTestId("search-card");

      await user.click(searchCards[1]);

      await waitFor(() => {
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Search Game 2"
        );
        expect(screen.queryByTestId("game-price").textContent).toEqual("$70");
      });
    });
  });

  describe("First Row", () => {
    it("legion button leads to the shop", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop"
              element={
                <CartProvider>
                  <Layout>
                    <ShopWrapper />
                  </Layout>
                </CartProvider>
              }
            />
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
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
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Test Game",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );

      // Assert
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Test Game"
        )
      );
    });
  });

  describe("Drop down", () => {
    it("more button opens the dropdown with game details", async () => {
      // Arrange
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Test Game",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
      const opener = screen.getByTestId("opener");

      // Act
      await user.click(opener);

      // Assert
      await screen.findByText("PF1,");
      await screen.findByText("G1,");
      await screen.findByText("Jan 15, 2025");
      await screen.findByText("D1,");
      await screen.findByText("PB1,");
      await screen.findByText("M1");
      await screen.findByText("dummy.com");
    });
  });

  describe("Cart", () => {
    it("add to cart button adds the game to the cart", async () => {
      // Arrange
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Test Game",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
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
          "Test Game"
        );
        expect(screen.queryByTestId("game-cart-price").textContent).toEqual(
          "$35"
        );
      });
    });

    it("add to cart button text changes to added after adding the game to cart", async () => {
      // Arrange
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Test Game",
            description_raw: "Dummy Game added for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
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
      const user = userEvent.setup();
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Wishlist Game",
            description_raw: "Dummy Game added to Wishlist for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop"
              element={
                <CartProvider>
                  <Layout>
                    <ShopWrapper />
                  </Layout>
                </CartProvider>
              }
            />
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
      const legionButton = screen.getByRole("link", { name: "Legion" });

      // Act
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Wishlist Game"
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
          "Wishlist Game"
        )
      );
      screen.debug(undefined, 300000);
    });

    it("wishlist icon removes the added game from the wishlist", async () => {
      // Arrange
      const user = userEvent.setup();
      localStorage.setItem(
        "wishlist",
        JSON.stringify([
          {
            id: 1,
            name: "Wishlist Game",
            image: "dummyUrl",
            price: 39.99,
          },
        ])
      );
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            name: "Wishlist Game",
            description_raw: "Dummy Game added to Wishlist for testing",
            website: "dummy.com",
            released: "2025-01-15",
            genres: [{ name: "G1" }, { name: "G2" }, { name: "G3" }],
            parent_platforms: [
              { platform: { name: "PF1" } },
              { platform: { name: "PF2" } },
              { platform: { name: "PF3" } },
            ],
            developers: [{ name: "D1" }, { name: "D2" }, { name: "D3" }],
            background_image: "dummyUrl",
            publishers: [{ name: "PB1" }, { name: "PB2" }, { name: "PB3" }],
            ratings: [
              { percent: 25 },
              { percent: 35 },
              { percent: 25 },
              { percent: 15 },
            ],
            esrb_rating: { name: "M1" },
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummy url 1",
              },
              {
                image: "dummy url 2",
              },
              {
                image: "dummy url 3",
              },
              {
                image: "dummy url 4",
              },
            ],
          })
        );
      render(
        <MemoryRouter initialEntries={["/shop/game/1"]}>
          <Routes>
            <Route
              path="shop"
              element={
                <CartProvider>
                  <Layout>
                    <ShopWrapper />
                  </Layout>
                </CartProvider>
              }
            />
            <Route
              path="shop/game/:gameId"
              element={
                <CartProvider>
                  <Layout>
                    <GamePage />
                  </Layout>
                </CartProvider>
              }
            />
          </Routes>
        </MemoryRouter>
      );
      const legionButton = screen.getByRole("link", { name: "Legion" });

      // Act
      await waitFor(() =>
        expect(screen.queryByTestId("game-name").textContent).toEqual(
          "Wishlist Game"
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
      screen.debug(undefined, 300000);
    });
  });
});
