import { vi } from "vitest";

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

export const useDishListMock = {
  dishList: mockDishList,
  getDishList: mockGetDishList,
};
