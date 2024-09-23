import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DishList } from "../components";
import React from "react";
import "@testing-library/jest-dom/vitest";

import useDishlist from "../features/dishlist/hooks/use-dishlist";
import { CartContext } from "../App";
import { mockedCartContextValue, useDishListMock } from "./mocks";

vi.mock("../features/dishlist/hooks/use-dishlist", () => {
  return {
    default: vi.fn(() => ({
      dishList: [],
      getDishList: vi.fn(),
    })),
  };
});

vi.mock("../features/cart/hooks/use-cart", () => {
  return {
    default: vi.fn(() => ({
      cart: [],
      addToCart: vi.fn(),
      clearCart: vi.fn(),
      getTotalItemCount: vi.fn(),
      getItemCountByItemId: vi.fn(),
    })),
  };
});

describe("DishList component", () => {
  beforeEach(() => {
    (useDishlist as vi.Mock).mockReturnValue(useDishListMock);
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should call getDishList on mount", () => {
    render(
      <CartContext.Provider value={mockedCartContextValue}>
        <DishList />
      </CartContext.Provider>
    );
    expect(useDishListMock.getDishList).toHaveBeenCalledTimes(1);
  });

  it("should render dish categories and dishes correctly", () => {
    render(
      <CartContext.Provider value={mockedCartContextValue}>
        <DishList />
      </CartContext.Provider>
    );

    // Check if the category titles are rendered
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });
});
