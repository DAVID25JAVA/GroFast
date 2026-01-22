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
  const [isUserLogin, setIsUserLogin] = useState(false);
  const { cartItems, setCartItems } = useCart();

  //  Prevent API call on first cart load
  const isFirstRender = useRef(true);

  //  CHECK AUTH ONLY ONCE (on refresh)
  useEffect(() => {
    //  if (typeof window !== "undefined") {
    //   const storedSeller = localStorage.getItem("isSeller");
    //   if (storedSeller === "true") {
    //     setIsSeller(true);
    //   }
    // }
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      await Promise.all([isSellerStatus(), isUserStatus()]);
    } finally {
      setAuthLoading(false);
    }
  };

  const isSellerStatus = async () => {
    try {
      const res = await Api("get", "/seller/is-auth");
      if (res?.success) {
        setIsSeller(true);
        // Persist to localStorage for faster initial load
        localStorage.setItem("isSeller", "true");
      } else {
        setIsSeller(false);
         localStorage.removeItem("isSeller");
      }
    } catch {
      setIsSeller(false);
      localStorage.removeItem("isSeller");
    }
  };

  const isUserStatus = async () => {
    try {
      setIsUserLogin(true);
      const res = await Api("get", "/user/is-auth");
      if (res?.success) {
        setIsUserLogin(false);
        setIsUser(true);
        setUser(res.user);
        setCartItems(res.user.cartItems || {});
      } else {
        setIsUser(false);
        setIsUserLogin(false);
        setUser(null);
      }
    } catch {
      setIsUserLogin(false);
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

  // Seller logout function
  const sellerLogout = () => {
    setIsSeller(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("isSeller");
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
        sellerLogout,
        setUser,
        isUserLogin,
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
