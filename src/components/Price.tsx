import React from "react";
import styles from "../assets/styles/Price.module.css";

interface PriceProps {
  price: number;
  discounted?: boolean;
  currency: string;
}

/* This renders the price card with the currency info. If there is a discounted prop supplied, this will attach a spcial class to the card to emphasis the discount */
export default function Price({ price, discounted, currency }: PriceProps) {
  return (
    <>
      {price > 0 && (
        <div
          className={`${styles.price} ${discounted ? styles.discounted : ""}`}
        >
          {currency} {price}
        </div>
      )}
    </>
  );
}
