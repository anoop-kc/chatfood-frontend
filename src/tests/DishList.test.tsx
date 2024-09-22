import { it, expect, describe, vi, beforeEach, afterEach } from "vitest";
import { cleanup, render, screen } from "@testing-library/react";
import { DishList } from "../components";
import React from "react";
import "@testing-library/jest-dom/vitest";

import useDishlist from "../features/dishlist/hooks/use-dishlist";

vi.mock("../features/dishlist/hooks/use-dishlist", () => {
  return {
    default: vi.fn(() => ({
      dishList: [],
      getDishList: vi.fn(),
    })),
  };
});

describe("DishList component", () => {
  // Mock data for dish categories and dishes
  const mockDishList = [
    {
      id: 1,
      name: "Category 1",
      items: [
        {
          id: 101,
          name: "Dish 1",
          description: "Description of Dish 1",
          price: "$10",
          photo: "photo1.jpg",
        },
        {
          id: 102,
          name: "Dish 2",
          description: "Description of Dish 2",
          price: "$15",
        },
      ],
    },
    {
      id: 2,
      name: "Category 2",
      items: [
        {
          id: 201,
          name: "Dish 3",
          description: "Description of Dish 3",
          price: "$12",
          photo: "photo2.jpg",
        },
      ],
    },
  ];

  // Mock the getDishList function
  const mockGetDishList = vi.fn();

  beforeEach(() => {
    (useDishlist as vi.Mock).mockReturnValue({
      dishList: mockDishList,
      getDishList: mockGetDishList,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });

  it("should call getDishList on mount", () => {
    render(<DishList />);
    expect(mockGetDishList).toHaveBeenCalledTimes(1);
  });

  it("should render dish categories and dishes correctly", () => {
    render(<DishList />);

    // Check if the category titles are rendered
    expect(screen.getByText("Category 1")).toBeInTheDocument();
    expect(screen.getByText("Category 2")).toBeInTheDocument();
  });
});
