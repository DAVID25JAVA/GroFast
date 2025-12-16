import React from "react";
import { UserProvider } from "@/context/userContext";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";
import CartProvider from "@/context/cartContext";
import { Toaster } from "react-hot-toast";

function layout({ children }) {
  return (
    <div>
      <Toaster />
      <UserProvider>
        <CartProvider>
          <Header />
          <main> {children}</main>
          <Footer />
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default layout;
