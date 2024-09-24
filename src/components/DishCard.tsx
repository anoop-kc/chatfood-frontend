import { CartContext } from "./Menu";
import { Dishitem } from "../interfaces";
import DishPrice from "./DishPrice";
import React, { useContext, useState } from "react";
import styles from "../assets/styles/DishCard.module.css";
import StripText from "./StripText";

interface DishCardProps {
  dish_item: Dishitem;
}

/* this component displays the details of single dish */
export default function DishCard({ dish_item }: DishCardProps) {
  // getting the needed data and functions from the context
  const { addToCart, getItemCountByItemId }: any = useContext(CartContext);

  // getting the dish_item prop to a state variable
  const [dish, setDish] = useState<Dishitem>(dish_item);

  // a variable for the currency and setting it to "AED" initially, if we have multiple currencies, this value can be used to handle that
  const [currency, setCurrency] = useState<string>("AED");

  // the handler function for the click event on a single item line, this calls the addToCart function onlyif there are items left in the stock
  const addItemToCart = (dish: Dishitem) => {
    // ensure that the item is availablein stock by comparing the count for the dish in the cart and the stock availability on the dish object
    if (getItemCountByItemId(dish.id) < (dish.stock?.availability || 0)) {
      addToCart(dish.id);
    }
  };

  return (
    <div
      className={styles.dish_card}
      onClick={() => addItemToCart(dish)}
      title="Click to add to cart"
    >
      <div className={styles.dish_details}>
        <h4 className={styles.dish_title}>
          {/* if the dish is already added to the cart, the order quantity is displayed here */}
          {getItemCountByItemId(dish.id)
            ? `${getItemCountByItemId(dish.id)} x `
            : ""}
          {dish.name}
        </h4>
        <div className={styles.dish_description}>
          {/* the description for the dish, the text is stripped when the length is greater than the supplied limit */}
          <StripText text={dish.description} limit={60} />
        </div>
        {/* if the stock for dish item is 0 / not defied, this section shows a "Sold out" warning */}
        {(dish.stock?.availability || 0) <= getItemCountByItemId(dish.id) && (
          <p className={styles.sold_out_text}>Sold out</p>
        )}
        {/* the dish price component takes into account the discount rate and shows both the actual and discounted price and wraps the actual price in a special class to emphasis the discount */}
        <DishPrice
          price={dish.price}
          discountRate={dish.discount_rate || 0}
          currency={currency}
        />
      </div>

      {/* this section renders the dish image if it is available  */}
      {dish?.photo && (
        <div className={styles.dish_image_container}>
          <img
            className={styles.dish_image}
            src={dish.photo}
            alt={dish.name}
            role="img"
          />
        </div>
      )}
    </div>
  );
}
