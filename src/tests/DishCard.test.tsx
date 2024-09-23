import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { DishCard } from "../components";
import { CartContext } from "../App";
import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { mockedCartContextValue } from "./mocks";
import { Dishitem } from "../interfaces";

describe("DishCard Component", () => {
  afterEach(() => {
    // cleaming up the render residues
    cleanup();
    // cleaning up the mocked events
    mockAddToCart.mockReset();
  });

  const mockDishItem: Dishitem = {
    id: "dish1",
    name: "Delicious Dish",
    description: "This is a test description for a delicious dish.",
    price: 50,
    discount_rate: 0.1,
    stock: {
      availability: 5,
    },
    photo: "https://example.com/dish-image.jpg",
    url: "",
    category_id: "",
  };

  const mockAddToCart = vi.fn();
  const mockGetItemCountByItemId = vi.fn().mockReturnValue(0);

  const renderWithContext = (dishItem: Dishitem) =>
    render(
      <CartContext.Provider
        value={{
          addToCart: mockAddToCart,
          getItemCountByItemId: mockGetItemCountByItemId,
        }}
      >
        <DishCard dish_item={dishItem} />
      </CartContext.Provider>
    );

  it("renders the dish details", () => {
    renderWithContext(mockDishItem);

    // Check if the dish title is rendered
    expect(screen.getByText("Delicious Dish")).toBeInTheDocument();

    // Check if the dish description is rendered
    expect(
      screen.getByText("This is a test description for a delicious dish.")
    ).toBeInTheDocument();

    // Check if the price is rendered correctly
    expect(screen.getByText("AED 50")).toBeInTheDocument();

    // Check if the dish image is rendered
    const imgElement = screen.getByRole("img");
    expect(imgElement).toHaveAttribute(
      "src",
      "https://example.com/dish-image.jpg"
    );
  });

  it("calls addToCart when dish is clicked and available in stock", () => {
    renderWithContext(mockDishItem);

    // Simulate clicking the dish card
    const dishCard = screen.getByText(/Delicious Dish/);
    fireEvent.click(dishCard);

    // Verify addToCart is called
    expect(mockAddToCart).toHaveBeenCalledWith(mockDishItem.id);
  });

  it("does not call addToCart when stock is unavailable", () => {
    mockGetItemCountByItemId.mockReturnValue(5); // Simulate stock limit reached
    renderWithContext(mockDishItem);

    // Simulate clicking the dish card
    const dishCard = screen.getByText(/Delicious Dish/);
    fireEvent.click(dishCard);

    // Verify addToCart is NOT called when sold out
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("displays 'Sold out' message when stock is unavailable", () => {
    mockGetItemCountByItemId.mockReturnValue(5); // Simulate stock limit reached
    renderWithContext(mockDishItem);

    // Check if the "Sold out" message is displayed
    expect(screen.getByText("Sold out")).toBeInTheDocument();
  });

  it("displays item count next to the dish title if added to cart", () => {
    mockGetItemCountByItemId.mockReturnValue(2); // Simulate 2 items in the cart
    renderWithContext(mockDishItem);

    // Check if the item count is displayed next to the dish title
    expect(screen.getByText(/2 x Delicious Dish/)).toBeInTheDocument();
  });
});
