"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";
import { useCart } from "./cartContext";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); 
  const [isForm, setIsForm] = useState(false);
  const [user, setUser] = useState(null);

  const { cartItems, setCartItems } = useCart();

  //  Prevent API call on first cart load
  const isFirstRender = useRef(true);

  //  CHECK AUTH ONLY ONCE (on refresh)
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await Promise.all([
        isSellerStatus(),
        isUserStatus(),
      ]);
    } finally {
      setAuthLoading(false);  
    }
  };

  const isSellerStatus = async () => {
    try {
      const res = await Api("get", "/seller/is-auth");
      setIsSeller(!!res?.success);
    } catch {
      setIsSeller(false);
    }
  };

  const isUserStatus = async () => {
    try {
      const res = await Api("get", "/user/is-auth");
      if (res?.success) {
        setIsUser(true);
        setUser(res.user);
        setCartItems(res.user.cartItems || {});
      } else {
        setIsUser(false);
        setUser(null);
      }
    } catch {
      setIsUser(false);
      setUser(null);
    }
  };

  //  Sync cart ONLY when user changes cart
  useEffect(() => {
    if (!user) return;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    updateCart();
  }, [cartItems]);

  const updateCart = async () => {
    try {
      const res = await Api("post", "/cart/update", {
        cartItems,
        userId: user._id,
      });

      if (!res?.success) {
        toast.error(res?.message);
      }
    } catch (error) {
      toast.error(error?.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        isForm,
        isUser,
        isSeller,
        authLoading,  
        setIsForm,
        setIsUser,
        setIsSeller,
        isLoading,
        setIsLoading,
        setUser,
        user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
