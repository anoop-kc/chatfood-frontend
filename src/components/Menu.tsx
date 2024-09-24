import { createContext, useState } from "react";
import { useCart } from "../features";
import { Header, DishList } from "./";
import React from "react";

export const CartContext = createContext({});

export default function Menu() {
  const {
    cart,
    addToCart,
    clearCart,
    getTotalItemCount,
    getItemCountByItemId,
  } = useCart();

  const [backButtonBehaviour, setBackButtonBehaviour] =
    useState<string>("clearCart");

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          getItemCountByItemId,
          clearCart,
          getTotalItemCount,
        }}
      >
        <Header backButtonBehaviour={backButtonBehaviour} showCart={true} />
        <DishList />
      </CartContext.Provider>
    </>
  );
}
