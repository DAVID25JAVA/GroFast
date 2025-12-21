"use client";
import React, { useContext, useState } from "react";
import { createContext } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState({});

  console.log(cart);

  const addToCart = (productId) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    toast.success("Item added to cart");
  };

  const removeToCart = (productId) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      delete newCart[productId];
      return newCart;
    });
    toast.success("Item remove from cart");
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
    toast.success("Item remove from cart");
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        addToCart,
        removeToCart,
        updateQuantity,
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
