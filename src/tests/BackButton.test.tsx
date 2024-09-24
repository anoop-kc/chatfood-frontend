import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { BackButton } from "../components";
import { vi, expect, it, afterEach, describe } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";

// Mock the back button image import
vi.mock("../assets/images/back-button.svg", () => {
  return {
    default: "mock-back-button.svg",
  };
});

describe("BackButton Component", () => {
  const mockClick = vi.fn();

  afterEach(() => {
    // cleaming up the render residues
    cleanup();
    // cleaning up the mocked event handlers
    mockClick.mockReset();
  });

  it("should render the back button image", () => {
    render(<BackButton click={vi.fn()} />);

    // Check if the image with alt text 'Back button' is rendered
    const backButton = screen.getByAltText("Back button");
    expect(backButton).toBeInTheDocument();
    expect(backButton).toHaveAttribute("src", "mock-back-button.svg");
  });

  it("should call the click function when the image is clicked", () => {
    render(<BackButton click={mockClick} />);

    // Simulate clicking the back button image
    const backButton = screen.getByAltText("Back button");
    fireEvent.click(backButton);

    // Ensure the click function was called once
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
