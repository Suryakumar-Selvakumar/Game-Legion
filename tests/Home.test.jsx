// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import App from "../src/App";
import CartProvider from "../src/components/CartProvider";
import Layout from "../src/pages/Layout";
import GamePage from "../src/pages/GamePage";
import ShopWrapper from "../src/pages/ShopWrapper";

function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

describe("Home", () => {
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
              name: "Dummy new game this week",
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
        expect(screen.getByTestId("page-state").textContent).toMatch(
          "This week"
        )
      );
      await waitFor(() =>
        expect(screen.getByTestId("game-card-name").textContent).toEqual(
          "Dummy new game this week"
        )
      );
    });

    it("Last 30 days button shows games released in the last 30 days", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy new game in last 30 days",
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
        expect(screen.getByTestId("page-state").textContent).toMatch(
          "Last 30 days"
        )
      );
      await waitFor(() =>
        expect(screen.getByTestId("game-card-name").textContent).toEqual(
          "Dummy new game in last 30 days"
        )
      );
    });

    it("Best of the year button shows the best games released this year", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy best game of the year",
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
        expect(screen.getByTestId("page-state").textContent).toMatch(
          "Best of the year"
        )
      );
      await waitFor(() =>
        expect(screen.getByTestId("game-card-name").textContent).toEqual(
          "Dummy best game of the year"
        )
      );
    });

    it("Popular in 2026 button shows popular games to release in 2026", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy popular game in 2026",
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
        expect(screen.getByTestId("page-state").textContent).toMatch(
          "Popular in 2026"
        )
      );
      await waitFor(() =>
        expect(screen.getByTestId("game-card-name").textContent).toEqual(
          "Dummy popular game in 2026"
        )
      );
    });

    it("All time top button shows top games of all time", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(
        createFetchResponse({
          results: [
            {
              id: 1,
              name: "Dummy top game of all time",
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
        expect(screen.getByTestId("page-state").textContent).toMatch(
          "All time top"
        )
      );
      await waitFor(() =>
        expect(screen.getByTestId("game-card-name").textContent).toEqual(
          "Dummy top game of all time"
        )
      );
    });
  });
});
