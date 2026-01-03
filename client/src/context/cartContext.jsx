"use client";
import React, { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});

  const addToCart = (productId) => {
    setCartItems((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1,
    }));
    toast.success("Item added to cart");
  };

  const removeToCart = (productId) => {
    setCartItems((prev) => {
      const copy = { ...prev };
      delete copy[productId];
      return copy;
    });
    toast.success("Item removed");
  };

  const updateQuantity = (productId, quantity) => {
    setCartItems((prev) => {
      if (quantity <= 0) {
        const copy = { ...prev };
        delete copy[productId];
        return copy;
      }
      return { ...prev, [productId]: quantity };
    });
  };

  return (
    <CartContext.Provider
      value={{ cartItems, setCartItems, addToCart, removeToCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}
