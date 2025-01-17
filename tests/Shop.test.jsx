// libs
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import { ShopRoute, GamePageRoute } from "../src/utils/routes";

// utils
import assertShopItems from "../src/utils/assertShopItems";
import setFakeShopData from "../src/utils/setFakeShopData";
import setFakeGamePageData from "../src/utils/setFakeGamePageData";
import setFakeImageData from "../src/utils/setFakeImageData";

describe("Shop", () => {
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
    it("Search operation updates the shop with results related to search", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Search"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const searchInput = screen.getByTestId("search-input");
      const searchIcon = screen.getByTestId("search-icon-link");

      // Act
      await user.type(searchInput, `search`);
      await expect(searchInput).toHaveValue("search");

      // Assert
      await user.click(searchIcon);
      await waitFor(() =>
        assertShopItems("", ["Dummy Search Game - 1", "Dummy Search Game - 2"])
      );
    });

    describe("Cart", () => {
      it("opens when the cart button is clicked", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartButton = screen.getByAltText("a cart icon");

        // Act
        await user.click(cartButton);

        // Assert
        await screen.findByText("Total:");
      });

      it("closes when area outside cart is clicked", async () => {
        // Arrange
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartButton = screen.getByAltText("a cart icon");

        // Act
        await user.click(cartButton);
        await user.click(screen.getByTestId("cart-page"));

        // Assert
        waitFor(() => {
          expect(screen.queryByText("Total:")).not.toBeInTheDocument();
          screen.findByText("Your Games");
        });
      });

      it("indicates when there are items in the cart using a dot icon", async () => {
        // Arrange
        fetch.mockResolvedValue(setFakeShopData("Cart"));
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const dotIcon = screen.getByTestId("dot-icon");

        // Act
        await waitFor(() =>
          assertShopItems("", ["Dummy Cart Game - 1", "Dummy Cart Game - 2"])
        );
        const addToCartButton = screen.getAllByTestId("add-to-cart");
        await addToCartButton.forEach((button) => user.click(button));

        // Assert
        expect(dotIcon).toBeInTheDocument();
      });

      it("displays the count of the items correctly", async () => {
        // Arrange
        fetch.mockResolvedValue(setFakeShopData("Cart"));
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartIcon = screen.getByAltText("a cart icon");

        // Act
        await waitFor(() =>
          assertShopItems("", ["Dummy Cart Game - 1", "Dummy Cart Game - 2"])
        );
        const addToCartButton = screen.getAllByTestId("add-to-cart");
        await addToCartButton.forEach((button) => user.click(button));

        await user.click(cartIcon);

        // Assert
        // Check that the count of the items matches the dummy data provided
        await waitFor(() => {
          const gamesCount = screen.getByRole("heading", { name: "2 Games" });
          expect(gamesCount).toBeInTheDocument();
        });
      });

      it("displays the total price of the items correctly", async () => {
        // Arrange
        fetch.mockResolvedValue(setFakeShopData("Cart"));
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartIcon = screen.getByAltText("a cart icon");

        // Act
        await waitFor(() =>
          assertShopItems("", ["Dummy Cart Game - 1", "Dummy Cart Game - 2"])
        );
        const addToCartButton = screen.getAllByTestId("add-to-cart");
        await addToCartButton.forEach((button) => user.click(button));
        await user.click(cartIcon);

        // Assert
        // Check that the count of the items matches the dummy data provided
        await waitFor(() => {
          const total = screen.getByTestId("total");
          expect(total.textContent).toMatch("$110");
        });
      });

      it("deletes an item when its remove button is pressed", async () => {
        // Arrange
        fetch.mockResolvedValue(setFakeShopData("Cart"));
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartIcon = screen.getByAltText("a cart icon");

        // Act
        await waitFor(() =>
          assertShopItems("", ["Dummy Cart Game - 1", "Dummy Cart Game - 2"])
        );
        const addToCartButtons = screen.getAllByTestId("add-to-cart");
        await addToCartButtons.forEach((button) => user.click(button));
        await user.click(cartIcon);

        // Assert
        await waitFor(() => {
          const gamesCount = screen.getByRole("heading", { name: "2 Games" });
          expect(gamesCount).toBeInTheDocument();
        });
        await user.click(screen.getAllByTestId("remove")[0]);
        await waitFor(() => {
          const gamesCount = screen.getByRole("heading", { name: "1 Games" });
          expect(gamesCount).toBeInTheDocument();
        });
      });

      it("clears all items when the clear button is pressed", async () => {
        // Arrange
        fetch.mockResolvedValue(setFakeShopData("Cart"));
        render(
          <MemoryRouter initialEntries={["/shop"]}>
            <Routes>{ShopRoute}</Routes>
          </MemoryRouter>
        );
        const cartIcon = screen.getByAltText("a cart icon");

        // Act
        await waitFor(() =>
          assertShopItems("", ["Dummy Cart Game - 1", "Dummy Cart Game - 2"])
        );
        const addToCartButtons = screen.getAllByTestId("add-to-cart");
        await addToCartButtons.forEach((button) => user.click(button));
        await user.click(cartIcon);

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
  });

  describe("Dropdown", () => {
    it("Order by dropdown opens when clicked", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const dropDownMenu = screen.getByTestId("order-by-menu");

      // Act
      await waitFor(() => expect(dropDownMenu).not.toHaveClass("open"));
      const menuOpener = screen.getByTestId("order-by");
      await user.click(menuOpener);

      // Assert
      await waitFor(() => expect(dropDownMenu).toHaveClass("open"));
    });

    it("Sort by dropdown opens when clicked", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const dropDownMenu = screen.getByTestId("sort-by-menu");

      // Act
      await waitFor(() => expect(dropDownMenu).not.toHaveClass("open"));
      const menuOpener = screen.getByTestId("sort-by");
      await user.click(menuOpener);

      // Assert
      await waitFor(() => expect(dropDownMenu).toHaveClass("open"));
    });

    it("Order by options close the dropdown & update the opener", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const orderByOptions = screen.getAllByTestId("order-by-options");
      const orderByMenu = screen.getByTestId("order-by-menu");

      // Act
      const menuOpener = screen.getByTestId("order-by");
      await user.click(menuOpener);
      expect(orderByMenu).toHaveClass("open");
      await user.click(orderByOptions[0]);

      // Assert
      await waitFor(() => {
        expect(orderByMenu).toHaveClass("close");
        expect(screen.getByTestId("order-by-block").textContent).toEqual(
          "Name"
        );
      });
    });

    it("Sort by options close the dropdown & update the opener", async () => {
      // Arrange
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const sortByOptions = screen.getAllByTestId("sort-by-options");
      const orderByOptions = screen.getAllByTestId("order-by-options");
      const sortByMenu = screen.getByTestId("sort-by-menu");

      // Act
      await user.click(screen.getByTestId("order-by"));
      await user.click(orderByOptions[2]);
      await user.click(screen.getByTestId("sort-by"));
      expect(sortByMenu).toHaveClass("open");
      await user.click(sortByOptions[0]);

      // Assert
      await waitFor(() => {
        expect(sortByMenu).toHaveClass("close");
        expect(screen.getByTestId("sort-by-block").textContent).toEqual(
          "Low to High"
        );
      });
    });

    it("Order by options update the shop items according to their order", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Name"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const orderByOptions = screen.getAllByTestId("order-by-options");

      // Act
      await user.click(screen.getByTestId("order-by"));
      await user.click(orderByOptions[0]);

      // Assert
      await waitFor(() =>
        assertShopItems(
          "Name",
          ["Dummy Name Game - 1", "Dummy Name Game - 2"],
          true
        )
      );
    });

    it("Sort by options update the shop items according to their sort order", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Z to A"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );
      const sortByOptions = screen.getAllByTestId("sort-by-options");

      // Act
      await user.click(screen.getByTestId("sort-by"));
      await user.click(sortByOptions[1]);

      // Assert
      await waitFor(() =>
        assertShopItems(
          "Z to A",
          ["Dummy Z to A Game - 1", "Dummy Z to A Game - 2"],
          true
        )
      );
    });
  });

  describe("Sidebar", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("Wishlist button shows games added to wishlist", async () => {
      // Arrange
      fetch.mockResolvedValueOnce(setFakeShopData("Wishlist"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Wishlist Game - 1", "Dummy Wishlist Game - 2"],
          true
        )
      );
      const wishListCardIcons = screen.getAllByTestId("wishlist-card-icon");
      wishListCardIcons.forEach((icon) => user.click(icon));
      await user.click(screen.getByTestId("wishlist"));

      // Assert
      await waitFor(() =>
        assertShopItems("Wishlist", [
          "Dummy Wishlist Game - 1",
          "Dummy Wishlist Game - 2",
        ])
      );
    });

    it("Last 30 days button shows games released in last 30 days", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Last 30 days"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await user.click(screen.getByTestId("last-30-days"));

      // Assert
      await waitFor(() =>
        assertShopItems("Last 30 days", [
          "Dummy Last 30 days Game - 1",
          "Dummy Last 30 days Game - 2",
        ])
      );
    });

    it("This week button shows games released this week", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("This week"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await user.click(screen.getByTestId("this-week"));

      // Assert
      await waitFor(
        () =>
          assertShopItems("This week", [
            "Dummy This week Game - 1",
            "Dummy This week Game - 2",
          ]),
        1000
      );
    });

    it("Next week button shows games releasing next week", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Next week"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("next-week"));

      // Assert
      await waitFor(() =>
        assertShopItems("Next week", [
          "Dummy Next week Game - 1",
          "Dummy Next week Game - 2",
        ])
      );
    });

    it("Best of the year button shows best games released this year", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Best of the year"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("best-of-the-year"));

      // Assert
      await waitFor(() =>
        assertShopItems("Best of the year", [
          "Dummy Best of the year Game - 1",
          "Dummy Best of the year Game - 2",
        ])
      );
    });

    it("Popular in 2026 button shows popular games releasing in 2026", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Popular in 2026"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("popular-in-2026"));

      // Assert
      await waitFor(() =>
        assertShopItems("Popular in 2026", [
          "Dummy Popular in 2026 Game - 1",
          "Dummy Popular in 2026 Game - 2",
        ])
      );
    });

    it("All time top button shows top games of all time", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("All time top"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("all-time-top"));

      // Assert
      await waitFor(() =>
        assertShopItems("All time top", [
          "Dummy All time top Game - 1",
          "Dummy All time top Game - 2",
        ])
      );
    });

    it("PC button shows games released on PC", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("PC"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("pc"));

      // Assert
      await waitFor(() =>
        assertShopItems("PC", ["Dummy PC Game - 1", "Dummy PC Game - 2"])
      );
    });

    it("PlayStation button shows games released on PlayStation", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("PlayStation"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("playstation"));

      // Assert
      await waitFor(() =>
        assertShopItems("PlayStation", [
          "Dummy PlayStation Game - 1",
          "Dummy PlayStation Game - 2",
        ])
      );
    });

    it("Xbox button shows games released on Xbox", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Xbox"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("xbox"));

      // Assert
      await waitFor(() =>
        assertShopItems("Xbox", ["Dummy Xbox Game - 1", "Dummy Xbox Game - 2"])
      );
    });

    it("Nintendo Switch button shows games released on Nintendo Switch", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Nintendo Switch"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("nintendo-switch"));

      // Assert
      await waitFor(() =>
        assertShopItems("Nintendo Switch", [
          "Dummy Nintendo Switch Game - 1",
          "Dummy Nintendo Switch Game - 2",
        ])
      );
    });

    it("MacOS button shows games released on MacOS", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("MacOS"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("mac-os"));

      // Assert
      await waitFor(() =>
        assertShopItems("MacOS", [
          "Dummy MacOS Game - 1",
          "Dummy MacOS Game - 2",
        ])
      );
    });

    it("Android button shows games released on Android", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Android"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("android"));

      // Assert
      await waitFor(() =>
        assertShopItems("Android", [
          "Dummy Android Game - 1",
          "Dummy Android Game - 2",
        ])
      );
    });

    it("Action button shows Action games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Action"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("action"));

      // Assert
      await waitFor(() =>
        assertShopItems("Action", [
          "Dummy Action Game - 1",
          "Dummy Action Game - 2",
        ])
      );
    });

    it("Strategy button shows Strategy games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Strategy"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("strategy"));

      // Assert
      await waitFor(() =>
        assertShopItems("Strategy", [
          "Dummy Strategy Game - 1",
          "Dummy Strategy Game - 2",
        ])
      );
    });

    it("RPG button shows RPG games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("RPG"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("rpg"));

      // Assert
      await waitFor(() =>
        assertShopItems("RPG", ["Dummy RPG Game - 1", "Dummy RPG Game - 2"])
      );
    });

    it("Shooter button shows Shooter games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Shooter"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("shooter"));

      // Assert
      await waitFor(() =>
        assertShopItems("Shooter", [
          "Dummy Shooter Game - 1",
          "Dummy Shooter Game - 2",
        ])
      );
    });

    it("Adventure button shows Adventure games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Adventure"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("adventure"));

      // Assert
      await waitFor(() =>
        assertShopItems("Adventure", [
          "Dummy Adventure Game - 1",
          "Dummy Adventure Game - 2",
        ])
      );
    });

    it("Puzzle button shows Puzzle games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Puzzle"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("puzzle"));

      // Assert
      await waitFor(() =>
        assertShopItems("Puzzle", [
          "Dummy Puzzle Game - 1",
          "Dummy Puzzle Game - 2",
        ])
      );
    });

    it("Racing button shows Racing games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Racing"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("racing"));

      // Assert
      await waitFor(() =>
        assertShopItems("Racing", [
          "Dummy Racing Game - 1",
          "Dummy Racing Game - 2",
        ])
      );
    });

    it("Sports button shows Sports games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Sports"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("sports"));

      // Assert
      await waitFor(() =>
        assertShopItems("Sports", [
          "Dummy Sports Game - 1",
          "Dummy Sports Game - 2",
        ])
      );
    });

    it("Indie button shows Indie games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Indie"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("indie"));

      // Assert
      await waitFor(() =>
        assertShopItems("Indie", [
          "Dummy Indie Game - 1",
          "Dummy Indie Game - 2",
        ])
      );
    });

    it("Casual button shows Casual games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Casual"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("casual"));

      // Assert
      await waitFor(() =>
        assertShopItems("Casual", [
          "Dummy Casual Game - 1",
          "Dummy Casual Game - 2",
        ])
      );
    });

    it("Simulation button shows Simulation games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Simulation"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("simulation"));

      // Assert
      await waitFor(() =>
        assertShopItems("Simulation", [
          "Dummy Simulation Game - 1",
          "Dummy Simulation Game - 2",
        ])
      );
    });

    it("Arcade button shows Arcade games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Arcade"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("arcade"));

      // Assert
      await waitFor(() =>
        assertShopItems("Arcade", [
          "Dummy Arcade Game - 1",
          "Dummy Arcade Game - 2",
        ])
      );
    });

    it("Platformer button shows Platformer games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Platformer"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("platformer"));

      // Assert
      await waitFor(() =>
        assertShopItems("Platformer", [
          "Dummy Platformer Game - 1",
          "Dummy Platformer Game - 2",
        ])
      );
    });

    it("Multiplayer button shows Multiplayer games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Multiplayer"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("multiplayer"));

      // Assert
      await waitFor(() =>
        assertShopItems("Multiplayer", [
          "Dummy Multiplayer Game - 1",
          "Dummy Multiplayer Game - 2",
        ])
      );
    });

    it("Fighting button shows Fighting games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Fighting"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("fighting"));

      // Assert
      await waitFor(() =>
        assertShopItems("Fighting", [
          "Dummy Fighting Game - 1",
          "Dummy Fighting Game - 2",
        ])
      );
    });

    it("Family button shows Family games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Family"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("family"));

      // Assert
      await waitFor(() =>
        assertShopItems("Family", [
          "Dummy Family Game - 1",
          "Dummy Family Game - 2",
        ])
      );
    });

    it("Board Games button shows Board Games games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Board Games"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("board-games"));

      // Assert
      await waitFor(() =>
        assertShopItems("Board Games", [
          "Dummy Board Games Game - 1",
          "Dummy Board Games Game - 2",
        ])
      );
    });

    it("Educational button shows Educational games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Educational"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("educational"));

      // Assert
      await waitFor(() =>
        assertShopItems("Educational", [
          "Dummy Educational Game - 1",
          "Dummy Educational Game - 2",
        ])
      );
    });

    it("Card button shows Card games", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Card"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("New Releases");
      await user.click(screen.getByTestId("card"));

      // Assert
      await waitFor(() =>
        assertShopItems("Card", ["Dummy Card Game - 1", "Dummy Card Game - 2"])
      );
    });
  });

  describe("GameCard", () => {
    afterEach(() => {
      localStorage.clear();
    });

    it("Wishlist button adds games to the wishlist", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Wishlist"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Wishlist Game - 1", "Dummy Wishlist Game - 2"],
          true
        )
      );
      const wishListCardIcons = screen.getAllByTestId("wishlist-card-icon");
      await wishListCardIcons.forEach((icon) => user.click(icon));
      user.click(screen.getByTestId("wishlist"));

      // Assert
      await screen.findByTestId("games");

      await waitFor(() =>
        assertShopItems("Wishlist", [
          "Dummy Wishlist Game - 1",
          "Dummy Wishlist Game - 2",
        ])
      );
    });

    it("Wishlist button removes games from the wishlist", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Wishlist"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Wishlist Game - 1", "Dummy Wishlist Game - 2"],
          true
        )
      );
      const wishListCardIcons = screen.getAllByTestId("wishlist-card-icon");
      await wishListCardIcons.forEach((icon) => user.click(icon));
      user.click(screen.getByTestId("wishlist"));
      await screen.findByTestId("games");
      await waitFor(() =>
        assertShopItems("Wishlist", [
          "Dummy Wishlist Game - 1",
          "Dummy Wishlist Game - 2",
        ])
      );

      // Assert
      await waitFor(() =>
        expect(screen.queryByTestId("games").children).toHaveLength(2)
      );
      await wishListCardIcons.forEach((icon) => user.click(icon));
      await waitFor(() =>
        expect(screen.queryByTestId("games").children).toHaveLength(0)
      );
    });
    it("Add to cart button adds games to the cart", async () => {
      // Arrange
      fetch.mockResolvedValue(setFakeShopData("Cart"));
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      await screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Cart Game - 1", "Dummy Cart Game - 2"],
          true
        )
      );
      const addToCartButton = screen.getAllByTestId("add-to-cart");
      await addToCartButton.forEach((button) => user.click(button));
      const cartIcon = screen.getByAltText("a cart icon");
      await user.click(cartIcon);

      // Assert
      await screen.findByText("2 Games");
      const gameCartNames = screen.getAllByTestId("game-cart-name");
      expect(gameCartNames[0].textContent).toEqual("Dummy Cart Game - 1");
      expect(gameCartNames[1].textContent).toEqual("Dummy Cart Game - 2");
    });
    it("Game name leads to the game's page", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeShopData("Page"))
        .mockResolvedValueOnce(
          setFakeGamePageData(2, "Dummy Page", [25, 35, 25, 15])
        )
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Page Game - 1", "Dummy Page Game - 2"],
          true
        )
      );
      const GameNames = screen.getAllByTestId("game-card-name");
      user.click(GameNames[1]);

      // Assert
      await screen.findByText("Dummy Page Game - 2");
      await screen.findByText("$35");
    });
    it("Game image leads to the game's page", async () => {
      // Arrange
      fetch
        .mockResolvedValueOnce(setFakeShopData("Page"))
        .mockResolvedValueOnce(
          setFakeGamePageData(1, "Dummy Page", [10, 70, 10, 10])
        )
        .mockResolvedValueOnce(setFakeImageData());
      render(
        <MemoryRouter initialEntries={["/shop"]}>
          <Routes>{ShopRoute}</Routes>
          <Routes>{GamePageRoute}</Routes>
        </MemoryRouter>
      );

      // Act
      screen.findByText("Your Games");
      await waitFor(() =>
        assertShopItems(
          "",
          ["Dummy Page Game - 1", "Dummy Page Game - 2"],
          true
        )
      );
      const GameImages = screen.getAllByTestId("game-card-image");
      user.click(GameImages[0]);

      // Assert
      await screen.findByText("Dummy Page Game - 1");
      await screen.findByText("$70");
    });
  });
});
