import { cleanup, render, screen } from "@testing-library/react";
import { Price } from "../components";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("Price Component", () => {
  afterEach(() => {
    // cleaning up the render residues
    cleanup();
  });

  it("renders the price with the correct currency", () => {
    render(<Price price={100} currency="$" />);
    expect(screen.getByText("$ 100")).toBeInTheDocument();
  });

  it("applies the discounted class when the discounted prop is true", () => {
    render(<Price price={100} discounted={true} currency="$" />);
    const priceElement = screen.getByText("$ 100");
    expect(priceElement).toHaveClass(/discounted/);
  });

  it("does not apply the discounted class when the discounted prop is false", () => {
    render(<Price price={100} discounted={false} currency="$" />);
    const priceElement = screen.getByText("$ 100");
    expect(priceElement).not.toHaveClass(/discounted/);
  });

  it("doesn't render when price is 0", () => {
    render(<Price price={0} currency="$" />);
    expect(screen.queryByText("$ 0")).toBeNull();
  });

  it("renders price without discounted class by default", () => {
    render(<Price price={100} currency="$" />);
    const priceElement = screen.getByText("$ 100");
    expect(priceElement).not.toHaveClass(/discounted/);
  });
});
