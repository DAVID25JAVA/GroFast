"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isSearch, setIsSearch] = useState(true);

  useEffect(() => {
    isSellerStatus();
  }, []);

  const isSellerStatus = async () => {
    try {
      const data = await Api("get", "/seller/is-auth");
      console.log("seller status", data);
      if (data?.success) {
        setIsSeller(true);
      }
    } catch (error) {
      toast.error(error?.message);
      setIsSeller(false);
    }
  };

  const handleUser = () => {
    setIsUser(true);
  };

  return (
    <UserContext.Provider
      value={{
        isForm,
        isUser,
        setIsForm,
        setIsUser,
        handleUser,
        isSeller,
        setIsSeller,
        isSearch,
        isLoading,
        setIsSearch,
        setIsLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

// custom hook
export function useUser() {
  return useContext(UserContext);
}
