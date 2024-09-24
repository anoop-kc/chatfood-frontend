import React, { createContext, useEffect } from "react";
import { useCart, useDishList } from "../features";
import DishCard from "./DishCard";
import CategoryCard from "./CategoryCard";
import { SearchBox } from "./";

export const CartContext = createContext({});

export default function DishList() {
  // initialises a useDishList object
  const { dishList, getDishList } = useDishList();

  // the search trigger, this will be called when the searchbox loads for the first time
  const handleSearch = (searchText: string) => {
    getDishList(searchText);
  };

  return (
    <>
      <SearchBox search={(searchText: string) => handleSearch(searchText)} />
      <div className="category-list">
        {/* categories loop */}
        {dishList.map((category) => (
          <CategoryCard category={category} key={`category-${category.id}`} />
        ))}
        {/* End. categories loop */}
      </div>
    </>
  );
}
