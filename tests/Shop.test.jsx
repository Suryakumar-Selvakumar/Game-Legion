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

// utils
import assertShopItems from "../src/utils/assertShopItems";
import createFetchResponse from "../src/utils/createFetchResponse";

describe("Shop", () => {
  describe("Sidebar", () => {
    
  });
});
