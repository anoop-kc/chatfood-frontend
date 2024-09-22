import { act, renderHook } from "@testing-library/react";
import { describe, it, expect, beforeEach, afterEach } from "vitest";
import useCart from "./use-cart";

describe("useCart Hook", () => {
  // Mock localStorage
  beforeEach(() => {
    const mockLocalStorage = (function () {
      let store: { [key: string]: string } = {};
      return {
        getItem: function (key: string) {
          return store[key] || null;
        },
        setItem: function (key: string, value: string) {
          store[key] = value;
        },
        removeItem: function (key: string) {
          delete store[key];
        },
        clear: function () {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, "localStorage", {
      value: mockLocalStorage,
      writable: true,
    });
  });

  afterEach(() => {
    window.localStorage.clear();
  });

  it("should initialize with an empty cart if localStorage is empty", () => {
    const { result } = renderHook(() => useCart());
    expect(result.current.cart).toEqual([]);
  });

  it("should initialize with items from localStorage if available", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([{ itemId: "1", itemCount: 2 }])
    );
    const { result } = renderHook(() => useCart());
    expect(result.current.cart).toEqual([{ itemId: "1", itemCount: 2 }]);
  });

  it("should add a new item to the cart", () => {
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart("1");
    });

    expect(result.current.cart).toEqual([{ itemId: "1", itemCount: 1 }]);
    expect(window.localStorage.getItem("cart")).toEqual(
      JSON.stringify([{ itemId: "1", itemCount: 1 }])
    );
  });

  it("should increment item count if item already exists in the cart", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([{ itemId: "1", itemCount: 2 }])
    );
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.addToCart("1");
    });

    expect(result.current.cart).toEqual([{ itemId: "1", itemCount: 3 }]);
    expect(window.localStorage.getItem("cart")).toEqual(
      JSON.stringify([{ itemId: "1", itemCount: 3 }])
    );
  });

  it("should clear the cart", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([{ itemId: "1", itemCount: 2 }])
    );
    const { result } = renderHook(() => useCart());

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.cart).toEqual([]);
    expect(window.localStorage.getItem("cart")).toBeNull();
  });

  it("should return total item count in the cart", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([
        { itemId: "1", itemCount: 2 },
        { itemId: "2", itemCount: 3 },
      ])
    );
    const { result } = renderHook(() => useCart());

    const totalItemCount = result.current.getTotalItemCount();
    expect(totalItemCount).toEqual(5);
  });

  it("should return the count of a specific item in the cart", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([
        { itemId: "1", itemCount: 2 },
        { itemId: "2", itemCount: 3 },
      ])
    );
    const { result } = renderHook(() => useCart());

    const itemCount = result.current.getItemCountByItemId("2");
    expect(itemCount).toEqual(3);
  });

  it("should return 0 if item is not found in the cart", () => {
    window.localStorage.setItem(
      "cart",
      JSON.stringify([{ itemId: "1", itemCount: 2 }])
    );
    const { result } = renderHook(() => useCart());

    const itemCount = result.current.getItemCountByItemId("3");
    expect(itemCount).toEqual(0);
  });
});
