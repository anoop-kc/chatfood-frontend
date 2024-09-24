import Price from "./Price";
import React from "react";
import styles from "../assets/styles/DishPrice.module.css";

interface DishPriceProps {
  price: number;
  discountRate: number;
  currency: string;
}

/* this components takes in a price, discount rate and currency as props  and displays the price value with currency, if there is a discount rate which is greater than 0, the component renders another price card wrapped up in a "discounted" class */
export default function DishPrice({
  price,
  discountRate,
  currency,
}: DishPriceProps) {
  return (
    <div className={styles.dish_price}>
      {/* Renders a discounted price if the discount rate > 0 */}
      {discountRate ? (
        <Price price={price - price * discountRate} currency={currency} />
      ) : (
        <></>
      )}

      {/* renders the original price, the discount rate is passed in as prop to decide on the wrapper css class needed to apply if discount rate is > 0 */}
      <Price
        discounted={discountRate ? true : false}
        price={price}
        currency={currency}
      />
    </div>
  );
}
