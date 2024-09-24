import { render, screen, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import React from "react";
import { useDishList } from "../features";
import { DishList } from "../components";
import "@testing-library/jest-dom/vitest";

// Mock the `useDishList` hook

// vi.mock("../features/dishlist/hooks/use-dishlist", () => {
//   return {
//     default: vi.fn(() => ({
//       dishList: [],
//       getDishList: vi.fn(),
//     })),
//   };
// });
vi.mock("../features/dishlist/hooks/use-dishList", () => {
  return {
    default: vi.fn(() => {}),
  };
});

// Mock the CategoryCard component
vi.mock("../components/CategoryCard", () => ({
  default: vi.fn(({ category }) => <div>{category.name}</div>),
}));

describe("DishList Component", () => {
  afterEach(() => {
    cleanup();
    mockGetDishList.mockReset();
  });

  const mockDishList = [
    {
      id: "category1",
      name: "Appetizers",
      items: [
        { id: "dish1", name: "Spring Rolls", description: "", price: 5 },
        { id: "dish2", name: "Dumplings", description: "", price: 8 },
      ],
    },
    {
      id: "category2",
      name: "Main Course",
      items: [
        { id: "dish3", name: "Grilled Chicken", description: "", price: 20 },
        { id: "dish4", name: "Pasta", description: "", price: 15 },
      ],
    },
  ];

  // Mock the hook behavior
  beforeEach(() => {
    (useDishList as vi.Mock).mockReturnValue({
      dishList: mockDishList,
      getDishList: vi.fn(),
    });
  });
  const mockGetDishList = vi.fn();

  it("calls getDishList on component mount", () => {
    (useDishList as vi.Mock).mockReturnValue({
      dishList: mockDishList,
      getDishList: mockGetDishList,
    });

    render(<DishList />);

    expect(mockGetDishList).toHaveBeenCalledTimes(1);
  });

  it("renders CategoryCard components for each category", () => {
    render(<DishList />);

    // Check if the category names are rendered
    const categoryNames = screen.getAllByText(/Appetizers|Main Course/);
    expect(categoryNames).toHaveLength(2);
    expect(screen.getByText("Appetizers")).toBeInTheDocument();
    expect(screen.getByText("Main Course")).toBeInTheDocument();
  });

  it("renders no CategoryCard if dishList is empty", () => {
    (useDishList as vi.Mock).mockReturnValue({
      dishList: [],
      getDishList: vi.fn(),
    });

    render(<DishList />);

    // Check that no CategoryCard is rendered
    const categoryCards = screen.queryByText(/Appetizers|Main Course/);
    expect(categoryCards).not.toBeInTheDocument();
  });
});
