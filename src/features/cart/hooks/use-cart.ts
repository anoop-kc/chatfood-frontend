import { useState } from "react";

interface CartItem {
  itemId: string;
  itemCount: number;
}

/*
This hook provides methods for 
1. seting the cart
2. add an item to the cart (if the item already eists, it simply increments its count)
3. clear the cart
4. Get the total no. of items in the cart
5. Get the no. of a particular item in the cart
*/
const useCart = () => {
  //  define a state variable to hold the cart array
  const [cart, setCart] = useState<CartItem[]>(
    // if the cart is already persisted in localStorage
    JSON.parse(localStorage.getItem("cart") ?? "[]")
  );
  //   function for adding an item to the cart
  const addToCart = (itemId: string) => {
    setCart((previouscart: CartItem[]) => {
      //    if the cart contains an item with the supplied item IdleDeadline, take that item into a variable
      const existingItem = previouscart.find((item) => {
        return item.itemId === itemId;
      });

      //   initialising the cart to an empty array of cart items
      let cartItems: CartItem[] = [];

      if (existingItem) {
        // if the item already exists in the cart only the count of the item is incremented
        cartItems = previouscart.map((item) => {
          return item.itemId === itemId
            ? { ...existingItem, itemCount: existingItem.itemCount + 1 }
            : item;
        });
      } else {
        // else, the item is simply added to the array
        cartItems = [...previouscart, { itemId, itemCount: 1 }];
      }
      //   sets the cart to the localStorage for persistence
      localStorage.setItem("cart", JSON.stringify(cartItems));
      return cartItems;
    });
  };

  //   function to clear all items from the cart
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  //   function to get the total no. of items in the cart
  const getTotalItemCount = () => {
    return cart.reduce((total, item) => total + item.itemCount, 0);
  };

  //   function to get the no. of a particular item in the cart
  const getItemCountByItemId = (itemId: string) => {
    const selectedItem = cart.find((item) => item.itemId === itemId);
    return selectedItem?.itemCount ?? 0;
  };

  return {
    cart,
    addToCart,
    clearCart,
    getTotalItemCount,
    getItemCountByItemId,
  };
};

export default useCart;
