import { renderHook, act } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import useDebounce from "./use-debounce";
import React from "react";

describe("useDebounce", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  it("should return the initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("test", 500));
    expect(result.current.debouncedValue).toBe("test");
  });

  it("should update the debounced value after the delay", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Initial value should be immediately available
    expect(result.current.debouncedValue).toBe("initial");

    // Update the value
    rerender({ value: "updated", delay: 500 });

    // Debounced value shouldn't update immediately
    expect(result.current.debouncedValue).toBe("initial");

    // Fast-forward time to simulate delay passing
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // Debounced value should now update
    expect(result.current.debouncedValue).toBe("updated");
  });

  it("should clear the previous timeout when the value changes", () => {
    const { result, rerender } = renderHook(
      ({ value, delay }) => useDebounce(value, delay),
      {
        initialProps: { value: "initial", delay: 500 },
      }
    );

    // Update the value multiple times within the delay period
    rerender({ value: "update1", delay: 500 });
    rerender({ value: "update2", delay: 500 });

    // The debounced value shouldn't change yet
    expect(result.current.debouncedValue).toBe("initial");

    // Fast-forward time to simulate delay passing
    act(() => {
      vi.advanceTimersByTime(500);
    });

    // The last value should be set as the debounced value
    expect(result.current.debouncedValue).toBe("update2");
  });
});
