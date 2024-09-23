import React, { createContext, useEffect } from "react";
import { useCart, useDishList } from "../features";
import DishCard from "./DishCard";

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
        <div className="category-card" key={`category-${category.id}`}>
          <h4 className="category-title">{category?.name}</h4>
          {/* dish card loop  */}
          {category?.items?.map((dish) => (
            <DishCard key={`dish-${dish.id}`} dish_item={dish} />
          ))}
          {/* End. dish card loop  */}
        </div>
      ))}
      {/* End. categories loop */}
    </div>
  );
}
