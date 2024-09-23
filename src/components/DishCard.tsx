import { CartContext } from "../App";
import { Dishitem } from "../interfaces";
import DishPrice from "./DishPrice";
import React, { useContext, useState } from "react";
import styles from "../assets/styles/DishCard.module.css";
import StripText from "./StripText";

interface DishCardProps {
  dish_item: Dishitem;
}

export default function DishCard({ dish_item }: DishCardProps) {
  const { addToCart, getItemCountByItemId }: any = useContext(CartContext);

  const [dish, setDish] = useState<Dishitem>(dish_item);
  const [currency, setCurrency] = useState<string>("AED");

  const addItemToCart = (dish: Dishitem) => {
    // ensure that the item is availablein stock
    if (getItemCountByItemId(dish.id) < (dish.stock?.availability || 0)) {
      addToCart(dish.id);
    }
  };

  return (
    <div className={styles.dish_card} onClick={() => addItemToCart(dish)}>
      <div className={styles.dish_details}>
        <h4 className={styles.dish_title}>
          {getItemCountByItemId(dish.id)
            ? `${getItemCountByItemId(dish.id)} x `
            : ""}
          {dish.name}
        </h4>
        <div className={styles.dish_description}>
          <StripText text={dish.description} limit={60} />
        </div>
        {(dish.stock?.availability || 0) <= getItemCountByItemId(dish.id) && (
          <p className={styles.sold_out_text}>Sold out</p>
        )}
        <DishPrice
          price={dish.price}
          discountRate={dish.discount_rate}
          currency={currency}
        />
      </div>

      {dish?.photo && (
        <div className={styles.dish_image_container}>
          <img
            className={styles.dish_image}
            src={dish.photo}
            alt=""
            role="img"
          />
        </div>
      )}
    </div>
  );
}
