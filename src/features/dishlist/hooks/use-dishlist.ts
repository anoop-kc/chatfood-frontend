import { useState } from "react";
import { CategoryWithDish } from "../../../interfaces";
import { getDishItems } from "../../../services/dishitem";

/* 
This hook wraps the logic for setting the dish list data along with categories.
The interfaces for the iterating category list is defined in ../../../interfaces/CategoryWithDish
 */
function useDishList() {
  // defining a state variable for the dishList which is an array of CategoryWithDish, and initialising it to an empty array
  const [dishList, setDishList] = useState<CategoryWithDish[]>([]);

  /*
  defining a method to populate the data into the dishList array. 
    1. The method calls the getDishItems service which gets the data for the dish items along with their categories from an external source.
    2. loops through the data and formats the data to match the CategoryWithDish interface
    3. sets the dishList 
    4. This also accepts an optional variable "serchText", which when supplied will set dishList only with data that matches the searchText
  */
  const getDishList = async (searchText?: string) => {
    // get the raw data from the external source
    const dishItemData: any = await getDishItems();

    // initialise a variable to hold the formated dataset of dishes with categories
    const dishListData: CategoryWithDish[] = [];

    // loop through the raw data to build an array of formatted  CategoryWithDish items
    for (let index = 0; index < dishItemData?.categories.length; index++) {
      const category = dishItemData?.categories[index];
      const dishItems = dishItemData?.items.filter((dishItem: any) => {
        // gets the items related to the iterating category and if the searchText argument is present filters the matches with the searchText
        return (
          dishItem["category_id"] == category["id"] &&
          (searchText
            ? dishItem["name"].toLowerCase().includes(searchText.toLowerCase())
            : true)
        );
      });
      //   appends the formatted category item to the dishListData array
      if (dishItems.length) {
        dishListData.push({
          id: category.id,
          name: category.name,
          items: dishItems,
        });
      }
    }
    //  .End for loop

    // sets the dishList state
    setDishList(dishListData);
  };

  return { dishList, getDishList };
}

export default useDishList;
