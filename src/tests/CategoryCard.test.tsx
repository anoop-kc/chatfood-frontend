import { render, screen, cleanup } from "@testing-library/react";
import { CategoryCard } from "../components";
import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { CategoryWithDish } from "../interfaces";
import "@testing-library/jest-dom/vitest";

// Mock the DishCard component to simplify the test
vi.mock("../components/DishCard", () => ({
  default: vi.fn(() => <div>Mock DishCard</div>),
}));

describe("CategoryCard Component", () => {
  afterEach(() => {
    cleanup();
  });
  const mockCategory: CategoryWithDish = {
    id: "category1",
    name: "Main Course",
    items: [
      {
        id: "dish1",
        name: "Grilled Chicken",
        description: "A delicious grilled chicken dish.",
        price: 20,
        discount_rate: 0.1,
        stock: { availability: 10 },
        photo: "https://example.com/chicken.jpg",
        category_id: "",
      },
      {
        id: "dish2",
        name: "Pasta",
        description: "Creamy Alfredo pasta.",
        price: 15,
        discount_rate: 0.05,
        stock: { availability: 5 },
        photo: "https://example.com/pasta.jpg",
        category_id: "",
      },
    ],
  };

  it("renders the category name", () => {
    render(<CategoryCard category={mockCategory} />);

    // Check if the category name is rendered
    const categoryTitle = screen.getByText("Main Course");
    expect(categoryTitle).toBeInTheDocument();
  });

  it("renders DishCard components for each dish in the category", () => {
    render(<CategoryCard category={mockCategory} />);

    // Ensure DishCard components are rendered for each dish
    const dishCards = screen.getAllByText("Mock DishCard");
    expect(dishCards).toHaveLength(2);
  });

  it("renders no DishCard if category items are empty", () => {
    const emptyCategory = { ...mockCategory, items: [] };
    render(<CategoryCard category={emptyCategory} />);

    // Check that no DishCard is rendered
    const dishCards = screen.queryByText("Mock DishCard");
    expect(dishCards).not.toBeInTheDocument();
  });
});
