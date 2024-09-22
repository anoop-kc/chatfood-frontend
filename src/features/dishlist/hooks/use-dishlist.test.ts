import { it, expect, describe, vi, beforeEach } from "vitest";
import { renderHook, act, cleanup } from "@testing-library/react";
import useDishList from "./use-dishlist";
import * as dishService from "../../../services/dishitem";

const mockDishItemData = {
  categories: [
    { id: 1, name: "Category 1" },
    { id: 2, name: "Category 2" },
  ],
  items: [
    { id: 101, name: "Dish 1", category_id: 1 },
    { id: 102, name: "Dish 2", category_id: 1 },
    { id: 201, name: "Dish 3", category_id: 2 },
  ],
};

// Mocking the getDishItems service
vi.spyOn(dishService, "getDishItems").mockImplementation(() =>
  Promise.resolve({})
);

describe("useDishList hook", () => {
  beforeEach(() => {
    // Reset the mock before each test
    vi.clearAllMocks();
    cleanup();
  });

  it("should initialize with an empty dish list", () => {
    const { result } = renderHook(() => useDishList());
    expect(result.current.dishList).toEqual([]);
  });

  it("should fetch and set dish list correctly without search text", async () => {
    // Mock the getDishItems to return sample data
    vi.spyOn(dishService, "getDishItems").mockResolvedValue(mockDishItemData);

    const { result } = renderHook(() => useDishList());

    await act(async () => {
      await result.current.getDishList();
    });

    // Check that dishList state is updated correctly
    expect(result.current.dishList).toEqual([
      {
        id: 1,
        name: "Category 1",
        items: [
          { id: 101, name: "Dish 1", category_id: 1 },
          { id: 102, name: "Dish 2", category_id: 1 },
        ],
      },
      {
        id: 2,
        name: "Category 2",
        items: [{ id: 201, name: "Dish 3", category_id: 2 }],
      },
    ]);
  });

  it("should filter dish list based on search text", async () => {
    // Mock the getDishItems to return sample data
    vi.spyOn(dishService, "getDishItems").mockResolvedValue(mockDishItemData);

    const { result } = renderHook(() => useDishList());

    await act(async () => {
      await result.current.getDishList("Dish 1");
    });

    // Check that only "Dish 1" is returned in the result
    expect(result.current.dishList).toEqual([
      {
        id: 1,
        name: "Category 1",
        items: [{ id: 101, name: "Dish 1", category_id: 1 }],
      },
      {
        id: 2,
        name: "Category 2",
        items: [],
      },
    ]);
  });

  it("should return an empty list if no categories or items are returned", async () => {
    // Mock the getDishItems to return sample data
    vi.spyOn(dishService, "getDishItems").mockResolvedValue({
      categories: [],
      items: [],
    });

    const { result } = renderHook(() => useDishList());

    await act(async () => {
      await result.current.getDishList();
    });

    // Check that dishList state is still empty
    expect(result.current.dishList).toEqual([]);
  });
});
