import Price from "./Price";
import React from "react";
import styles from "../assets/styles/DishPrice.module.css";

interface DishPriceProps {
  price: number;
  discountRate: number;
  currency: string;
}

export default function DishPrice({
  price,
  discountRate,
  currency,
}: DishPriceProps) {
  return (
    <div className={styles.dish_price}>
      {discountRate ? (
        <Price price={price - price * discountRate} currency={currency} />
      ) : (
        <></>
      )}

      <Price
        discounted={discountRate ? true : false}
        price={price}
        currency={currency}
      />
    </div>
  );
}
