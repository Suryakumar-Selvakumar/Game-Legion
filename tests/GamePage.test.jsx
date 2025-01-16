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
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("Drop down", () => {
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

    afterEach(() => {
      cleanup();
    });

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
});
