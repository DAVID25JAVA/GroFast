"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);

  useEffect(() => {
    isUserStatus();
  }, []);

  const isUserStatus = async () => {
    try {
      const res = await Api("get", "/user/is-auth");
      console.log("user--->", res);
      if (res?.success) {
        setUser(res.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

   // Add this function to refresh user status
  const refreshUserStatus = () => {
    isUserStatus();
  };

  const addToCart = (productId) => {
    if (user == null) {
      toast.error("Please Login !");
      return;
    }
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
    toast.success("Cart updated");
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeToCart,
        updateQuantity,
        refreshUserStatus
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
