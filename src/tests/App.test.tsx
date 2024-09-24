import { render, screen, cleanup } from "@testing-library/react";
import App from "../App";
import { vi, describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import React from "react";

// Mock the Menu component
vi.mock("../components/Menu", () => ({
  default: () => <div data-testid="menu-component">Mock Menu Component</div>,
}));

describe("App Component", () => {
  // clean up the render residues
  afterEach(cleanup);

  it("renders the Menu component", () => {
    render(<App />);

    // Check if the Menu component is rendered
    const menuComponent = screen.getByTestId("menu-component");
    expect(menuComponent).toBeInTheDocument();
  });

  it("renders the outer-container div", () => {
    render(<App />);

    // Check if the outer-container div is present
    const outerContainer = screen.getByRole("main");
    expect(outerContainer).toBeInTheDocument();
  });
});
