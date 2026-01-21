"use client";
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState({});
  const [user, setUser] = useState(null);
  const [isCartLoaded, setIsCartLoaded] = useState(false); 
  const isInitialMount = useRef(true);

  useEffect(() => {
    initializeCart();
  }, []);

  const initializeCart = async () => {
    try {
      const res = await Api("get", "/user/is-auth");
      if (res?.success) {
        setUser(res.user);
        // Load cart from user data
        if (res.user?.cartItems) {
          setCartItems(res.user.cartItems);
        } else {
          setCartItems({});  
        }
      } else {
        setUser(null);
        setCartItems({});
      }
    } catch (error) {
      console.error("Init cart error:", error);
      setUser(null);
      setCartItems({});
    } finally {
      setIsCartLoaded(true);  
    }
  };

  
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    if (user && isCartLoaded) {
      const timer = setTimeout(() => {
        syncCartToBackend();
      }, 500);  

      return () => clearTimeout(timer);
    }
  }, [cartItems]);

  const syncCartToBackend = async () => {
    if (!user?._id) return;
    
    try {
      await Api("post", "/cart/update", {
        userId: user._id,
        cartItems: cartItems,
      });
      console.log("Cart synced to backend");
    } catch (error) {
      console.error("Failed to sync cart:", error);
    }
  };

  const refreshUserStatus = async () => {
    isInitialMount.current = true;
    setIsCartLoaded(false);
    await initializeCart();
  };

  const addToCart = (productId) => {
    if (user == null) {
      toast.error("Please Login!");
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
        refreshUserStatus,
        isCartLoaded, 
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