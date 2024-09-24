import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Header } from "../components";
import { CartContext } from "../components/Menu";
import { vi, describe, it, afterEach, expect } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Mocking BackButton and Cart components
vi.mock("../components/BackButton", () => ({
  default: ({ click }: { click: () => void }) => (
    <button data-testid="back-button" onClick={click}>
      Back Button
    </button>
  ),
}));

vi.mock("../components/Cart", () => ({
  default: () => <div data-testid="cart">Cart Component</div>,
}));

describe("Header Component", () => {
  const clearCart = vi.fn();

  afterEach(() => {
    // cleaming up the render residues
    cleanup();
    // cleaning up the mocked event handlers
    clearCart.mockReset();
  });

  it("should render the BackButton", () => {
    render(
      <CartContext.Provider value={{ clearCart }}>
        <Header />
      </CartContext.Provider>
    );

    const backButton = screen.getByTestId("back-button");
    expect(backButton).toBeInTheDocument();
  });

  it("should call clearCart when backButtonBehaviour is 'clearCart'", () => {
    render(
      <CartContext.Provider value={{ clearCart }}>
        <Header backButtonBehaviour="clearCart" />
      </CartContext.Provider>
    );

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    // Ensure clearCart is called when backButton is clicked
    expect(clearCart).toHaveBeenCalledTimes(1);
  });

  it("should not call clearCart when backButtonBehaviour is not 'clearCart'", () => {
    render(
      <CartContext.Provider value={{ clearCart }}>
        <Header />
      </CartContext.Provider>
    );

    const backButton = screen.getByTestId("back-button");
    fireEvent.click(backButton);

    // Ensure clearCart is not called
    expect(clearCart).toHaveBeenCalledTimes(0);
  });

  it("should render the Cart component if showCart is true", () => {
    render(
      <CartContext.Provider value={{ clearCart }}>
        <Header showCart={true} />
      </CartContext.Provider>
    );

    const cart = screen.getByTestId("cart");
    expect(cart).toBeInTheDocument();
  });

  it("should not render the Cart component if showCart is false", () => {
    const clearCart = vi.fn();
    render(
      <CartContext.Provider value={{ clearCart }}>
        <Header showCart={false} />
      </CartContext.Provider>
    );

    const cart = screen.queryByTestId("cart");
    expect(cart).toBeNull();
  });
});
