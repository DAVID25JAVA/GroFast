"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(true);
  const [isForm, setIsForm] = useState(false);

  const handleUser = () => {
   setIsUser(true)
 }

  return (
    <UserContext.Provider value={{ isForm, isUser, setIsForm, setIsUser, handleUser }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook
export function useUser() {
  return useContext(UserContext);
}
