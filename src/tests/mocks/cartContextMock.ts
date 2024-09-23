import { vi } from "vitest";

// mocked cart value
const mockCart = [
  { itemId: 1, itemCount: 7 },
  { itemId: 2, itemCount: 1 },
  { itemId: 4, itemCount: 3 },
  { itemId: 13, itemCount: 1 },
  { itemId: 10, itemCount: 6 },
];

// mocked addToCart function
const mockedAddToCart = vi.fn();

// mocked getItemCountByItemId function
const mockedGetItemCountByItemId = vi.fn();

export const mockedCartContextValue = {
  cart: mockCart,
  addToCart: mockedAddToCart,
  getItemCountByItemId: mockedGetItemCountByItemId,
};
