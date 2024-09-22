import { createContext } from "react";
import "./App.css";
import DishList from "./components/DishList";
import { useCart } from "./features";

export const CartContext = createContext({});

function App() {
  const {
    cart,
    addToCart,
    clearCart,
    getTotalItemCount,
    getItemCountByItemId,
  } = useCart();

  return (
    <div className="outer-container">
      {cart.map((item: any) => {
        return (
          <>
            <span>Item id : {item.itemId}</span>{" "}
            <span>count : {item.itemCount}</span>
          </>
        );
      })}
      <CartContext.Provider
        value={{
          cart,
          addToCart,
          getItemCountByItemId,
        }}
      >
        <DishList />
      </CartContext.Provider>
    </div>
  );
}

export default App;
