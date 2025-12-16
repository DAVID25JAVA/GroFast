"use client";
import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <SearchContext.Provider value={{ openSearch, setOpenSearch }}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  return useContext(SearchContext);
}
