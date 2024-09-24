import { getDishItems } from "./dishitem";
import { vi, describe, it, expect } from "vitest";
import "@testing-library/jest-dom/vitest";
import { GET_DISH_ITEMS } from "../constants/";

// Mock the fetch API globally
global.fetch = vi.fn();

vi.mock("../constants/GET_DISH_ITEMS", () => ({
  default: () => "get_dish_item_url",
}));

describe("getDishItems API call", () => {
  it("should fetch data from the API and return the JSON response", async () => {
    const mockResponse = { dishes: ["Dish 1", "Dish 2"] };

    // Mock fetch implementation to return the mockResponse
    (fetch as vi.Mock).mockResolvedValue({
      json: vi.fn().mockResolvedValue(mockResponse),
    });

    const data = await getDishItems();

    // Assert that fetch was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(GET_DISH_ITEMS);

    // Assert that the data matches the mockResponse
    expect(data).toEqual(mockResponse);
  });

  it("should throw an error when the fetch fails", async () => {
    // Mock fetch to throw an error
    (fetch as vi.Mock).mockRejectedValue(new Error("API Error"));

    await expect(getDishItems()).rejects.toThrow("API Error");
  });
});
