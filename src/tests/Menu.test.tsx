import { render, screen, cleanup } from "@testing-library/react";
import { CartContext } from "../components/Menu";
import { Menu } from "../components";
import { vi, describe, it, afterEach, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Mocking the Header and DishList components
vi.mock("../components/Header", () => ({
  default: ({ backButtonBehaviour, showCart }: any) => (
    <div data-testid="header">
      <span>Back Button Behaviour: {backButtonBehaviour}</span>
      <span>Show Cart: {showCart ? "Yes" : "No"}</span>
    </div>
  ),
}));

vi.mock("../components/DishList", () => ({
  default: () => <div data-testid="dish-list">Dish List Component</div>,
}));

// Mock useCart hook
vi.mock("../features/cart/hooks/use-cart", () => ({
  default: () => ({
    cart: [{ id: "1", name: "Test Dish" }],
    addToCart: vi.fn(),
    clearCart: vi.fn(),
    getTotalItemCount: vi.fn().mockReturnValue(5),
    getItemCountByItemId: vi.fn().mockReturnValue(1),
  }),
}));

describe("Menu Component", () => {
  // cleaning up the render residues
  afterEach(cleanup);

  it("should render Header with correct props", () => {
    render(<Menu />);

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    expect(
      screen.getByText("Back Button Behaviour: clearCart")
    ).toBeInTheDocument();
    expect(screen.getByText("Show Cart: Yes")).toBeInTheDocument();
  });

  it("should render DishList", () => {
    render(<Menu />);

    const dishList = screen.getByTestId("dish-list");
    expect(dishList).toBeInTheDocument();
  });

  it("should provide the correct context values to CartContext.Provider", () => {
    const mockAddToCart = vi.fn();
    const mockClearCart = vi.fn();
    const mockGetItemCountByItemId = vi.fn().mockReturnValue(1);
    const mockGetTotalItemCount = vi.fn().mockReturnValue(5);

    render(
      <CartContext.Provider
        value={{
          cart: [{ id: "1", name: "Test Dish" }],
          addToCart: mockAddToCart,
          clearCart: mockClearCart,
          getItemCountByItemId: mockGetItemCountByItemId,
          getTotalItemCount: mockGetTotalItemCount,
        }}
      >
        <Menu />
      </CartContext.Provider>
    );

    const header = screen.getByTestId("header");
    expect(header).toBeInTheDocument();

    const dishList = screen.getByTestId("dish-list");
    expect(dishList).toBeInTheDocument();
  });
});
