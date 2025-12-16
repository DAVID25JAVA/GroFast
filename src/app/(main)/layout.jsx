import React from "react";
import { UserProvider } from "@/context/userContext";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import CartProvider from "@/context/cartContext";

function layout({ children }) {
  return (
    <UserProvider>
      <CartProvider>
        <Header />
        <main> {children}</main>
        <Footer />
      </CartProvider>
    </UserProvider>
  );
}

export default layout;
