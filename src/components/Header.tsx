import React, { useContext } from "react";
import styles from "../assets/styles/Header.module.css";
import BackButton from "./BackButton";
import { CartContext } from "./Menu";
import { Cart } from "./";

interface HeaderProps {
  backButtonBehaviour?: string;
  showCart?: boolean;
}

export default function Header({ backButtonBehaviour, showCart }: HeaderProps) {
  const { clearCart }: any = useContext(CartContext);

  const handleBackButtonCLick = () => {
    if (backButtonBehaviour === "clearCart") {
      clearCart();
    }
  };

  return (
    <div className={styles.header_container}>
      <div className={styles.back_button}>
        <BackButton click={handleBackButtonCLick} />
      </div>
      {showCart && <Cart />}
    </div>
  );
}
