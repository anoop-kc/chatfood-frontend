import { it, expect, describe, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { Price } from "../components";
import "@testing-library/jest-dom/vitest";
import React from "react";

describe("Price Component", () => {
  // cleanup the rendered elements after each test
  afterEach(() => {
    cleanup();
  });
  it("should render the price without an additional class", () => {
    // Render the component with a price
    render(<Price price={100} />);

    // Check if the element with the price is in the document
    const priceElement = screen.getByText("100");

    // Assert that the price element exists and has only the default class
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price");
  });

  it("should render the price with an additional class", () => {
    // Render the component with a price and additional className
    render(<Price price={200} className="special-price" />);

    // Check if the element with the price is in the document
    const priceElement = screen.getByText("200");

    // Assert that the price element exists and has both 'price' and 'special-price' classes
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price special-price");
  });

  it("should correctly render large prices", () => {
    // Render the component with a large price value
    render(<Price price={999999} />);

    // Check if the element with the large price is in the document
    const priceElement = screen.getByText("999999");

    // Assert that the price element exists
    expect(priceElement).toBeInTheDocument();
    expect(priceElement).toHaveClass("price");
  });
});
