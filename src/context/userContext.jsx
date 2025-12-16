"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(true);
  const [isSeller, setIsSeller] = useState(false);
  const [isForm, setIsForm] = useState(false);
  const [isSearch, setIsSearch] = useState(true);

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
        setIsSearch
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
