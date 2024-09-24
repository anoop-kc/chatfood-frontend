import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { DishCard } from "../components";
import { CartContext } from "../components/Menu";
import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import "@testing-library/jest-dom/vitest";
import { Dishitem } from "../interfaces";

const mockAddToCart = vi.fn();
const mockGetItemCountByItemId = vi.fn();

// Mock data for testing
const dishItem: Dishitem = {
  id: "1",
  name: "Pizza",
  description: "Delicious cheese pizza",
  price: 10,
  discount_rate: 0.2,
  stock: { availability: 5 },
  photo: "pizza.jpg",
  category_id: "1",
};

const renderDishCard = (dish_item: Dishitem) => {
  return render(
    <CartContext.Provider
      value={{
        addToCart: mockAddToCart,
        getItemCountByItemId: mockGetItemCountByItemId,
      }}
    >
      <DishCard dish_item={dish_item} />
    </CartContext.Provider>
  );
};

describe("DishCard", () => {
  afterEach(() => {
    cleanup();
    mockAddToCart.mockReset();
  });

  it("renders the dish card with the dish name and description", () => {
    mockGetItemCountByItemId.mockReturnValue(0);

    renderDishCard(dishItem);

    expect(screen.getByText("Pizza")).toBeInTheDocument();
    expect(screen.getByText("Delicious cheese pizza")).toBeInTheDocument();
  });

  it("displays the item count if it's greater than 0", () => {
    mockGetItemCountByItemId.mockReturnValue(2); // Item count > 0

    renderDishCard(dishItem);

    expect(screen.getByText("2 x Pizza")).toBeInTheDocument();
  });

  it("does not display the item count if it's 0", () => {
    mockGetItemCountByItemId.mockReturnValue(0); // Item count = 0

    renderDishCard(dishItem);

    expect(screen.queryByText("0 x Pizza")).not.toBeInTheDocument();
  });

  it("calls addToCart when there is stock available", () => {
    mockGetItemCountByItemId.mockReturnValue(1); // Item count < availability

    renderDishCard(dishItem);

    fireEvent.click(screen.getByText(/Pizza/)); // Click on the dish card to add to cart
    expect(mockAddToCart).toHaveBeenCalledWith("1");
  });

  it("does not call addToCart when stock is unavailable", () => {
    mockGetItemCountByItemId.mockReturnValue(5); // Item count == availability

    renderDishCard(dishItem);

    fireEvent.click(screen.getByText(/Pizza/));
    expect(mockAddToCart).not.toHaveBeenCalled();
  });

  it("displays 'Sold out' when stock is unavailable", () => {
    mockGetItemCountByItemId.mockReturnValue(5); // Item count == availability

    renderDishCard(dishItem);

    expect(screen.getByText("Sold out")).toBeInTheDocument();
  });

  it("does not display 'Sold out' when stock is available", () => {
    mockGetItemCountByItemId.mockReturnValue(2); // Item count < availability

    renderDishCard(dishItem);

    expect(screen.queryByText("Sold out")).not.toBeInTheDocument();
  });

  it("displays the discounted price and original price with required class when a discount is available", () => {
    mockGetItemCountByItemId.mockReturnValue(0);

    renderDishCard(dishItem);

    expect(screen.getByText("AED 8")).toBeInTheDocument(); // Discounted price (10 - 10 * 0.2)
    expect(screen.getByText("AED 10")).toBeInTheDocument(); // original price
    expect(screen.getByText("AED 10")).toHaveClass(/discounted/); // original price displayed in the discounted class
  });

  it("displays the original price when no discount is available", () => {
    const noDiscountDish = { ...dishItem, discount_rate: 0 };

    mockGetItemCountByItemId.mockReturnValue(0);

    renderDishCard(noDiscountDish);

    expect(screen.getByText("AED 10")).toBeInTheDocument(); // Original price
    expect(screen.getByText("AED 10")).not.toHaveClass(/discounted/); // original price displayed when there is no discount
  });

  it("renders the dish image when a photo is provided", () => {
    mockGetItemCountByItemId.mockReturnValue(0);

    renderDishCard(dishItem);

    const img = screen.getByRole("img");
    expect(img).toHaveAttribute("src", "pizza.jpg");
    expect(img).toHaveAttribute("alt", "Pizza");
  });

  it("does not render the dish image when no photo is provided", () => {
    const noPhotoDish = { ...dishItem, photo: undefined };

    mockGetItemCountByItemId.mockReturnValue(0);

    renderDishCard(noPhotoDish);

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("prevents adding to cart when stock key is unavailable (stock availability does not exist in the dish item)", () => {
    const zeroStockDish: Dishitem = {
      id: "1",
      name: "Pizza",
      description: "Delicious cheese pizza",
      price: 10,
      discount_rate: 0.2,
      photo: "pizza.jpg",
      category_id: "1",
    };
    mockGetItemCountByItemId.mockReturnValue(0); // Item count < availability but stock is 0

    renderDishCard(zeroStockDish);

    fireEvent.click(screen.getByText("Pizza"));
    expect(mockAddToCart).not.toHaveBeenCalled();
  });
});
