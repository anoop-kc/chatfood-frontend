import { GET_DISH_ITEMS } from "../constants";

// The API call to fetch the raw data in the external source
async function getDishItems() {
  const getDishItemsdata = await fetch(GET_DISH_ITEMS);
  return getDishItemsdata.json();
}

export { getDishItems };
