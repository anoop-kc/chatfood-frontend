import { useEffect } from "react";
import { useDishList } from "../features";

export default function DishList() {
  // initialises a useDishList object
  const { dishList, getDishList } = useDishList();

  //   call the function to set data to dishList in a use effect hook
  useEffect(() => {
    getDishList();
    console.log(dishList);
  }, []);
  return (
    <div className="category-list">
      {/* categories loop */}
      {dishList.map((category) => (
        <div className="category-card" key={`category-${category.id}`}>
          <h4 className="category-title">{category?.name}</h4>
          {/* dish card loop  */}
          {category?.items?.map((dish) => (
            <div className="dish-card" key={`dish-${dish.id}`}>
              <div className="dish-details">
                <div className="dish-title">{dish.name}</div>
                <div className="dish-description">{dish.description}</div>
                <div>{dish.price}</div>
                {dish?.photo && (
                  <div className="dish-image">
                    <img src={dish.photo} alt="" />
                  </div>
                )}
              </div>
            </div>
          ))}
          {/* End. dish card loop  */}
        </div>
      ))}
      {/* End. categories loop */}
    </div>
  );
}
