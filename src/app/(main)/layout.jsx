import React from "react";
import { UserProvider } from "@/context/userContext";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import CartProvider from "@/context/cartContext";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "@/context/searchContext";
import Search from "@/components/UI/Search";

function layout({ children }) {
  return (
    <div>
      <Toaster />
      <UserProvider>
        <CartProvider>
          <SearchProvider>
            <Header />
            <Search/>
            <main>{children}</main>
            <Footer />
          </SearchProvider>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default layout;
