import { createContext, useState } from "react";
import { useCart } from "../features";
import { Header, DishList } from "./";
import React from "react";

// creating a context to share the cart details (data & functionsa) across all child components
export const CartContext = createContext({});

/* This component wraps up all the components needed to render the list of dishes with the search box */
export default function Menu() {
  // getting all the data/functions needed from the useCart hook to pass as value to the CartCOntext
  const {
    cart,
    addToCart,
    clearCart,
    getTotalItemCount,
    getItemCountByItemId,
  } = useCart();

  // Setting a variable for the back button behaviour, this can change in accordance with the context
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
