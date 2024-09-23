import React from "react";
import styles from "../assets/styles/Price.module.css";

interface PriceProps {
  price: number;
  discounted?: boolean;
  currency: string;
}

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
