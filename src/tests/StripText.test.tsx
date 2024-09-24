import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { StripText } from "../components";
import React from "react";
import { describe, it, expect, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";

describe("StripText Component", () => {
  afterEach(() => {
    // clean up the render residues
    cleanup();
  });
  const longText = "This is a very long text for testing purposes.";
  const shortText = "Short text";

  it("renders shortened text with ellipsis when text exceeds limit", () => {
    render(<StripText text={longText} limit={10} />);

    // Ensure the shortened text is displayed with ellipsis
    expect(screen.getByText("This is a ...")).toBeInTheDocument();

    // Check that the "View more" link is displayed
    expect(screen.getByText("View more")).toBeInTheDocument();
  });

  it("renders full text when text is shorter than the limit", () => {
    render(<StripText text={shortText} limit={20} />);

    // Ensure the full text is displayed as it's shorter than the limit
    expect(screen.getByText(shortText)).toBeInTheDocument();

    // "View more" link should not be displayed
    expect(screen.queryByText("View more")).toBeNull();
  });

  it("toggles between 'View more' and 'View less' when clicked", () => {
    render(<StripText text={longText} limit={10} />);

    // Check initial state: shortened text with "View more"
    expect(screen.getByText("This is a ...")).toBeInTheDocument();
    const viewMoreLink = screen.getByText("View more");

    // Simulate clicking "View more"
    fireEvent.click(viewMoreLink);

    // After clicking, the full text should be displayed, and "View less" link should appear
    expect(screen.getByText(longText)).toBeInTheDocument();
    expect(screen.getByText("View less")).toBeInTheDocument();

    // Simulate clicking "View less"
    fireEvent.click(screen.getByText("View less"));

    // Back to shortened text and "View more" link
    expect(screen.getByText("This is a ...")).toBeInTheDocument();
    expect(screen.getByText("View more")).toBeInTheDocument();
  });

  it("renders without the 'View more' link if text length is equal to the limit", () => {
    render(<StripText text={longText} limit={longText.length} />);

    // The full text should be displayed, no ellipsis
    expect(screen.getByText(longText)).toBeInTheDocument();

    // "View more" link should not be displayed since the text fits within the limit
    expect(screen.queryByText("View more")).toBeNull();
  });
});
