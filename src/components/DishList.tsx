import React, { createContext, useEffect } from "react";
import { useCart, useDishList } from "../features";
import DishCard from "./DishCard";
import CategoryCard from "./CategoryCard";

export const CartContext = createContext({});

export default function DishList() {
  // initialises a useDishList object
  const { dishList, getDishList } = useDishList();

  //   call the function to set data to dishList in a use effect hook
  useEffect(() => {
    getDishList();
  }, []);

  return (
    <div className="category-list">
      {/* categories loop */}
      {dishList.map((category) => (
        <CategoryCard category={category} key={`category-${category.id}`} />
      ))}
      {/* End. categories loop */}
    </div>
  );
}
