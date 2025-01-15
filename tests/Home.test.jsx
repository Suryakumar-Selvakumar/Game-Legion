// libs
import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
  createMemoryRouter,
  MemoryRouter,
  Route,
  Routes,
} from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import { routes } from "../src/routes";
import App from "../src/App";
import CartProvider from "../src/components/CartProvider";
import Layout from "../src/pages/Layout";
import GamePage from "../src/pages/GamePage";

function createFetchResponse(data) {
  return { ok: true, json: () => new Promise((resolve) => resolve(data)) };
}

describe("Home", () => {
  describe("Info Card", () => {
    it("suryakumar-selvakumar button takes the user to my GitHub profile", () => {
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
      expect(rawgApiButton).toHaveAttribute(
        "href",
        "https://rawg.io/apidocs"
      );
    });
  });

  describe("Quick Navigation", () => {
    // Mock fetch with global scope
    beforeEach(() => {
      globalThis.fetch = vi.fn();
    });

    // Reset Mocks after each test
    afterEach(() => {
      vi.resetAllMocks();
    });

    it("I'm feeling lucky button takes the user to a random game in GamePage route", async () => {
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
              { percent: 45 },
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
      await user.click(imFeelingLuckyButton);

      // Assert
      // Check that the App goes to GamePage and our dummy data is rendered
      await waitFor(() =>
        expect(screen.getByTestId("game-name").textContent).toMatch("Test Game")
      );
      // screen.debug(); // Visual verification of DOM
    });
  });
});
