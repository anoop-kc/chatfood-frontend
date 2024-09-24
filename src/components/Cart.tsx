import { useContext, useEffect, useState } from "react";
import styles from "../assets/styles/Cart.module.css";
import cartImage from "../assets/images/cart.svg";
import { CartContext } from "./Menu";
import React from "react";

export default function Cart() {
  // getting the needed data/functions from the context
  const { cart, getTotalItemCount }: any = useContext(CartContext);

  // setting the initial value of totalCartItemCount variable as 0 as this will be updated when the useEffect hook is called
  const [totalCartItemCount, setTotalCartItemCount] = useState<number>(0);

  // when there are changes in the cart, the totalCartItemCount variable is updated
  useEffect(() => {
    setTotalCartItemCount(getTotalItemCount());
  }, [cart]);

  return (
    <div className={styles.cart_container}>
      {/* The total item count is displayed only when there are items in the cart */}
      {totalCartItemCount > 0 && (
        <span className={styles.cart_item_count}>{totalCartItemCount}</span>
      )}
      <img className={styles.cart_image} src={cartImage} alt="Cart" />
    </div>
  );
}
