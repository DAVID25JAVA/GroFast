"use client";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [isUser, setIsUser] = useState(false);
  const [isForm, setIsForm] = useState(false);

  return (
    <UserContext.Provider value={{ isForm, isUser, setIsForm, setIsUser }}>
      {children}
    </UserContext.Provider>
  );
}

// custom hook
export function useUser() {
  return useContext(UserContext);
}
