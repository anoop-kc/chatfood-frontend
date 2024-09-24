import React from "react";
import { useDishList } from "../features";
import CategoryCard from "./CategoryCard";
import { SearchBox } from "./";

/* this component displays the list of dishes in a specific category */
export default function DishList() {
  // initialises a useDishList object, this is a hook which contains the data & functions needed to manage dishList
  const { dishList, getDishList } = useDishList();

  // the search trigger, this will be called when the searchbox loads for the first time and when ever the search text is changed subsequently
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
