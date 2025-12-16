"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";

export const CartContext = createContext();

function CartProvider({children}) {
  const [cart, setCart] = useState({});
   
  
  

  console.log(cart);
  

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1
    }))
  };

   const removeToCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
  };

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      if (quantity <= 0) {
        const newCart = { ...prevCart };
        delete newCart[productId];
        return newCart;
      }
      return { ...prevCart, [productId]: quantity };
    });
  };


  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeToCart,
        updateQuantity
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}
