import Price from "./Price";
import React from "react";

interface DishPriceProps {
  price: number;
  discountRate: number;
}

export default function DishPrice({ price, discountRate }: DishPriceProps) {
  return (
    <div className="dish-price">
      {discountRate ? <Price price={price - price * discountRate} /> : <></>}

      <Price
        className={discountRate ? "discounted" : "price-card"}
        price={price}
      />
    </div>
  );
}
