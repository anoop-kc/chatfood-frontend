import { render, screen, cleanup } from "@testing-library/react";
import { DishPrice } from "../components";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("DishPrice Component", () => {
  afterEach(() => {
    // cleaming up the render residues
    cleanup();
  });

  it("renders both discounted and original price when discountRate is provided", () => {
    render(<DishPrice price={100} discountRate={0.2} currency="$" />);

    // Discounted price should be displayed
    expect(screen.getByText("$ 80")).toBeInTheDocument(); // 100 - 20% discount

    // Original price should also be displayed
    expect(screen.getByText("$ 100")).toBeInTheDocument();
  });

  it("renders only the original price when no discountRate is provided", () => {
    render(<DishPrice price={100} discountRate={0} currency="$" />);

    // Only the original price should be rendered
    expect(screen.getByText("$ 100")).toBeInTheDocument();
    expect(screen.queryByText("$ 80")).toBeNull(); // Discounted price should not exist
  });

  it("applies discounted class to Price component when discountRate is provided", () => {
    render(<DishPrice price={100} discountRate={0.2} currency="$" />);

    const priceElement = screen.getByText("$ 100");
    expect(priceElement).toHaveClass(/discounted/);
  });

  it("does not apply discounted class to Price component when discountRate is 0", () => {
    render(<DishPrice price={100} discountRate={0} currency="$" />);

    const priceElement = screen.getByText("$ 100");
    expect(priceElement).not.toHaveClass(/discounted/);
  });

  it("handles rendering correctly when price is 0", () => {
    render(<DishPrice price={0} discountRate={0} currency="$" />);

    expect(screen.queryByText("$ 0")).toBeNull(); // Should not render anything if price is 0
  });
});
