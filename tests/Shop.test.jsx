// libs
import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, vi } from "vitest";
import { MemoryRouter, Routes } from "react-router-dom";
import userEvent from "@testing-library/user-event";

// components
import { HomeRoute, ShopRoute, GamePageRoute } from "../src/utils/routes";

// utils
import assertShopItems from "../src/utils/assertShopItems";
import createFetchResponse from "../src/utils/createFetchResponse";
import setFakeShopData from "../src/utils/setFakeShopData";

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

  describe("Sidebar", () => {
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
      fetch.mockResolvedValueOnce(setFakeShopData("Last 30 days"));
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
});
