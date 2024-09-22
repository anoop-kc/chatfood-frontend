import { cleanup, render, screen } from "@testing-library/react";
import { it, expect, describe, afterEach } from "vitest";
import { DishPrice } from "../components";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("DishPrice Component", () => {
  // cleanup the rendered screens after each test
  afterEach(() => {
    cleanup();
  });
  it("should render the original price without discount", () => {
    // Render the component without discountRate
    render(<DishPrice price={100} discountRate={0} />);

    // Check that the Price component renders the correct price without discount
    const priceElement = screen.getByText("100");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price-card");
  });

  it("should apply discount and render both original and discounted prices", () => {
    // Render the component with a discountRate
    render(<DishPrice price={200} discountRate={0.2} />); // 20% discount

    // Check that the discounted price is calculated correctly and displayed
    const discountedPriceElement = screen.getByText("160"); // 20% off 200
    expect(discountedPriceElement).toBeInTheDocument();

    // Check that the original price is still rendered with the "discounted" class
    const originalPriceElement = screen.getByText("200");
    expect(originalPriceElement).toBeInTheDocument();
    expect(originalPriceElement).toHaveClass("discounted");
  });

  it("should not render discounted price when discountRate is 0", () => {
    // Render the component with a discountRate of 0 (no discount)
    render(<DishPrice price={300} discountRate={0} />);

    // Check that only the original price is rendered
    const priceElement = screen.getByText("300");
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price-card");

    // Check that no discounted price is rendered
    const discountedPriceElements = screen.queryByText("240"); // 20% off 300
    expect(discountedPriceElements).toBeNull();
  });

  it("should handle edge case of no price correctly", () => {
    // Render the component with a price of 0
    render(<DishPrice price={0} discountRate={0.5} />);

    // Check that 0 is displayed as the price
    const priceElement = screen.queryByText("0");
    expect(priceElement).not.toBeInTheDocument();

    // Check that 0 is also displayed as the discounted price
    const discountedPriceElement = screen.queryByText("0");
    expect(discountedPriceElement).not.toBeInTheDocument();
  });
});
