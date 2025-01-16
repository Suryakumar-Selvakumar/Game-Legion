// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import { act } from "@testing-library/react";

// components
import App from "../src/App";
import CartProvider from "../src/components/CartProvider";
import Layout from "../src/pages/Layout";
import GamePage from "../src/pages/GamePage";
import ShopWrapper from "../src/pages/ShopWrapper";

// utils
import assertShopItems from "../src/utils/assertShopItems";
import createFetchResponse from "../src/utils/createFetchResponse";

describe("Home", () => {
  describe("Header", () => {
    beforeEach(() => {
      globalThis.fetch = vi.fn();
    });

    it("logo brings the user back home when clicked", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const logo = screen.getByTestId("logo");

      // Act
      user.click(logo);

      // Assert
      await screen.findByText("Quick Navigation");
    });

    it("search preview shows a preview of items related to search input", async () => {
      // Arrange
      const user = userEvent.setup();
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              name: "Preview Game 1",
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
              name: "Preview Game 2",
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
      );
      render(
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      );
      const searchInput = screen.getByTestId("search-input");

      // Act
      await user.type(searchInput, "preview");

      // Assert
      expect(searchInput).toHaveValue("preview");
      await screen.findByText("Preview Game 1");
      await screen.findByText("Preview Game 2");
    });

    it("search icon leads to items related to search input", async () => {
      // Arrange
      const user = userEvent.setup();
      fetch.mockResolvedValueOnce(
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
      );
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const searchInput = screen.getByTestId("search-input");
      const searchIcon = screen.getByTestId("search-icon-link");

      // Act
      await user.type(searchInput, "search");

      // Assert
      await expect(searchInput).toHaveValue("search");
      await user.click(searchIcon);
      await waitFor(() =>
        assertShopItems("", ["Search Game 1", "Search Game 2"])
      );
    });

    it("cart opens when the cart button is clicked", async () => {
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

    it("cart closes when area outside cart is clicked", async () => {
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
      waitFor(() =>
        expect(screen.queryByText("Total:")).not.toBeInTheDocument()
      );
    });
  });

  describe("Info Card", () => {
    it("Suryakumar-Selvakumar button takes the user to my GitHub profile", () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      );

      // Act
      const githubButton = screen.getByTestId("github");

      // Assert

      expect(githubButton).toHaveAttribute(
        "href",
        "https://github.com/Suryakumar-Selvakumar"
      );
    });

    it("RAWG API button takes the user to its documentation", () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      );

      // Act
      const rawgApiButton = screen.getByTestId("rawg-api");

      // Assert
      expect(rawgApiButton).toHaveAttribute("href", "https://rawg.io/apidocs");
    });
  });

  describe("Quick Navigation", () => {
    // Mock fetch with global scope
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

    // Reset Mocks after each test
    afterEach(() => {
      vi.resetAllMocks();
    });

    it("I'm feeling lucky button takes the user to a random game's page", async () => {
      // Arrange
      // Setup dummy data for all three fetches
      fetch
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                games: [{ id: 1 }],
              },
            ],
          })
        )
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
            esrb_rating: "M1",
            id: 1,
          })
        )
        .mockResolvedValueOnce(
          createFetchResponse({
            results: [
              {
                image: "dummyUrl",
              },
            ],
          })
        );
      const user = userEvent.setup();
      // Render app with routes
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
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
      const imFeelingLuckyButton = screen.getByTestId("im-feeling-lucky");

      // Act
      user.click(imFeelingLuckyButton);

      // Assert
      // Check that the App goes to GamePage and our dummy random game is rendered
      await waitFor(() =>
        expect(screen.getByTestId("game-name").textContent).toMatch("Test Game")
      );
    });

    it("New this week button shows games released this week to user", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy new game this week - 1",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
            {
              id: 2,
              name: "Dummy new game this week - 2",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
          ],
        })
      );
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const newThisWeekButton = screen.getByTestId("new-this-week");

      // Act
      user.click(newThisWeekButton);

      // Assert
      // Check that the App goes to Shop and our dummy new week data is rendered
      await waitFor(() =>
        assertShopItems("This week", [
          "Dummy new game this week - 1",
          "Dummy new game this week - 2",
        ])
      );
    });

    it("Last 30 days button shows games released in the last 30 days", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy new game in last 30 days - 1",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
            {
              id: 2,
              name: "Dummy new game in last 30 days - 2",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
          ],
        })
      );
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const last30DaysButton = screen.getByTestId("last-30-days");

      // Act
      user.click(last30DaysButton);

      // Assert
      // Check that the App goes to Shop and our dummy last 30 days data is rendered
      await waitFor(() =>
        assertShopItems("Last 30 days", [
          "Dummy new game in last 30 days - 1",
          "Dummy new game in last 30 days - 2",
        ])
      );
    });

    it("Best of the year button shows the best games released this year", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy best game of the year - 1",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
            {
              id: 2,
              name: "Dummy best game of the year - 2",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
          ],
        })
      );
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const bestOfTheYearButton = screen.getByTestId("best-of-the-year");

      // Act
      user.click(bestOfTheYearButton);

      // Assert
      // Check that the App goes to Shop and our dummy best game of the year data is rendered
      await waitFor(() =>
        assertShopItems("Best of the year", [
          "Dummy best game of the year - 1",
          "Dummy best game of the year - 2",
        ])
      );
    });

    it("Popular in 2026 button shows popular games to release in 2026", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy popular game in 2026 - 1",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
            {
              id: 2,
              name: "Dummy popular game in 2026 - 2",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
          ],
        })
      );
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const popularIn2026Button = screen.getByTestId("popular-in-2026");

      // Act
      user.click(popularIn2026Button);

      // Assert
      // Check that the App goes to Shop and our dummy popular game in 2026 data is rendered
      await waitFor(() =>
        assertShopItems("Popular in 2026", [
          "Dummy popular game in 2026 - 1",
          "Dummy popular game in 2026 - 2",
        ])
      );
    });

    it("All time top button shows top games of all time", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy top game of all time - 1",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
            {
              id: 2,
              name: "Dummy top game of all time - 2",
              image: "dummyUrl",
              parent_platforms: [
                { platform: { name: "PF1" } },
                { platform: { name: "PF2" } },
                { platform: { name: "PF3" } },
              ],
              ratings: [
                { percent: 30 },
                { percent: 40 },
                { percent: 10 },
                { percent: 20 },
              ],
            },
          ],
        })
      );
      const user = userEvent.setup();
      render(
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route
              path="/"
              element={
                <CartProvider>
                  <Layout>
                    <App />
                  </Layout>
                </CartProvider>
              }
            />
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
          </Routes>
        </MemoryRouter>
      );
      const allTimeTopButton = screen.getByTestId("all-time-top");

      // Act
      user.click(allTimeTopButton);

      // Assert
      // Check that the App goes to Shop and our dummy top game of all time data is rendered
      await waitFor(() =>
        assertShopItems("All time top", [
          "Dummy top game of all time - 1",
          "Dummy top game of all time - 2",
        ])
      );
    });
  });

  describe("Footer", () => {
    beforeEach(() => {
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

    it("Checkbox changes the theme of the app", async () => {
      // Arrange
      const user = userEvent.setup();
      render(
        <BrowserRouter>
          <CartProvider>
            <App />
          </CartProvider>
        </BrowserRouter>
      );
      const themeSwitcher = screen.getByTestId("theme-switcher");
      const logoIcon = screen.getByTestId("logo-icon");

      // Assert
      await waitFor(() => {
        expect(logoIcon).toHaveAttribute(
          "src",
          "/src/assets/icons/omega-norse.png"
        );
        expect(logoIcon).toHaveAttribute("alt", "Jormungandur icon");
      });
      user.click(themeSwitcher);
      await waitFor(() => {
        expect(logoIcon).toHaveAttribute(
          "src",
          "/src/assets/icons/omega-greek.png"
        );
        expect(logoIcon).toHaveAttribute("alt", "omega icon");
      });
    });
  });
});
