import React, { useContext } from "react";
import styles from "../assets/styles/Header.module.css";
import BackButton from "./BackButton";
import { CartContext } from "./Menu";
import { Cart } from "./";

interface HeaderProps {
  backButtonBehaviour?: string;
  showCart?: boolean;
}

/* The header component displays the headed with a back button and an optional cart component  */
export default function Header({ backButtonBehaviour, showCart }: HeaderProps) {
  // getting the clearCart function from the CartContext
  const { clearCart }: any = useContext(CartContext);

  // The click of the back button should reset the app state, since the only persisted app state is the cart, resetting cart will set the app to its initial state
  const handleBackButtonCLick = () => {
    // The behaviour of the back botton can change in accordance with context
    // calling the clearCart function if the supplied behaviour is clearCart
    if (backButtonBehaviour === "clearCart") {
      clearCart();
    }
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.back_button}>
        <BackButton click={handleBackButtonCLick} />
      </div>
      {/* The cart is hown if the showCart prop is true */}
      {showCart && <Cart />}
    </div>
  );
}
