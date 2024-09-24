import { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/Cart.module.css";
import cartImage from "../assets/images/cart.svg";
import { CartContext } from "./Menu";
import React from "react";

export default function Cart() {
  const { cart, getTotalItemCount }: any = useContext(CartContext);
  const [totalCartItemCount, setTotalCartItemCount] = useState<number>(
    getTotalItemCount()
  );

  useEffect(() => {
    setTotalCartItemCount(getTotalItemCount());
  }, [cart]);

  return (
    <div className={styles.cart_container}>
      {totalCartItemCount > 0 && (
        <span className={styles.cart_item_count}>{totalCartItemCount}</span>
      )}
      <img className={styles.cart_image} src={cartImage} alt="Cart" />
    </div>
  );
}
