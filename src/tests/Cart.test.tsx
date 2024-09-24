import { render, screen, cleanup } from "@testing-library/react";
import { Cart } from "../components";
import { CartContext } from "../components/Menu";
import { vi, afterEach, describe, it, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { CartItem } from "../features";

describe("Cart Component", () => {
  afterEach(() => {
    // cleaning up the render residues
    cleanup();
  });

  // Mock data for cart context
  const mockCart = [{ itemId: "1", itemCount: 2 }];

  // mock the get total item count function
  const mockGetTotalItemCount = vi
    .fn()
    .mockReturnValue(
      mockCart.reduce((total, item) => total + item.itemCount, 0)
    );

  it("should render the cart image", () => {
    render(
      <CartContext.Provider
        value={{ cart: mockCart, getTotalItemCount: mockGetTotalItemCount }}
      >
        <Cart />
      </CartContext.Provider>
    );
    const cartImage = screen.getByAltText("Cart");
    expect(cartImage).toBeInTheDocument();
  });

  it("should display total item count when there are items in the cart", () => {
    render(
      <CartContext.Provider
        value={{ cart: mockCart, getTotalItemCount: mockGetTotalItemCount }}
      >
        <Cart />
      </CartContext.Provider>
    );
    const itemCount = screen.getByText(mockGetTotalItemCount());
    expect(itemCount).toBeInTheDocument();
  });

  it("should not display item count when the cart is empty", () => {
    const emptyCart: CartItem[] = [];
    const emptyGetTotalItemCount = vi.fn().mockReturnValue(0);

    render(
      <CartContext.Provider
        value={{ cart: emptyCart, getTotalItemCount: emptyGetTotalItemCount }}
      >
        <Cart />
      </CartContext.Provider>
    );

    expect(screen.queryByText("0")).toBeNull();
  });

  it("should update the item count when the cart is updated", () => {
    const updatedCart = [...mockCart, { itemId: "2", itemCount: 3 }];
    console.log(updatedCart);
    const updatedGetTotalItemCount = vi
      .fn()
      .mockReturnValue(
        mockCart.reduce((total, item) => total + item.itemCount, 0)
      );

    render(
      <CartContext.Provider
        value={{
          cart: updatedCart,
          getTotalItemCount: updatedGetTotalItemCount,
        }}
      >
        <Cart />
      </CartContext.Provider>
    );

    const updatedItemCount = screen.getByText(updatedGetTotalItemCount());
    expect(updatedItemCount).toBeInTheDocument();
  });
});
