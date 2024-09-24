import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
  act,
} from "@testing-library/react";
import { vi, describe, it, expect, afterEach, beforeEach } from "vitest";
import { SearchBox } from "../components";
import React from "react";
import "@testing-library/jest-dom/vitest";

describe("SearchBox", () => {
  const mockSearch = vi.fn();
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    cleanup();
    mockSearch.mockReset();
    vi.clearAllTimers();
  });
  it("renders correctly", () => {
    render(<SearchBox search={vi.fn()} />);
    expect(
      screen.getByPlaceholderText("Search for dishes...")
    ).toBeInTheDocument();
    expect(screen.getByText("Search")).toBeInTheDocument();
  });

  it("calls search function with the debounced value only after the supplied delay", async () => {
    render(<SearchBox search={mockSearch} />);

    const input = screen.getByPlaceholderText("Search for dishes...");

    // Simulate user typing in the search box
    fireEvent.change(input, { target: { value: "Pizza" } });

    //ensure that search is not immediately called
    expect(mockSearch).not.toHaveBeenCalledWith("Pizza");

    // Advance timers to trigger debounce effect
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Wait for the search function to be called with the debounced value
    expect(mockSearch).toHaveBeenCalledWith("Pizza");
  });

  it("debounces search input changes", async () => {
    render(<SearchBox search={mockSearch} />);

    // to reset the inital search call on render
    mockSearch.mockReset();

    const input = screen.getByPlaceholderText("Search for dishes...");

    // Simulate rapid changes in the search box
    fireEvent.change(input, { target: { value: "P" } });
    fireEvent.change(input, { target: { value: "Pi" } });
    fireEvent.change(input, { target: { value: "Piz" } });
    fireEvent.change(input, { target: { value: "Pizza" } });

    // Only the last value should trigger the search function after debounce
    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(mockSearch).toHaveBeenCalledTimes(1);
    expect(mockSearch).toHaveBeenCalledWith("Pizza");
  });
});
