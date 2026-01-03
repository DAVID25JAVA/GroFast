"use client";
import CartProvider from "@/context/cartContext";
import "./globals.css";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "react-hot-toast";
import { SearchProvider } from "@/context/searchContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Toaster />
        <CartProvider>
          <UserProvider>
            <SearchProvider>{children}</SearchProvider>
          </UserProvider>
        </CartProvider>
      </body>
    </html>
  );
}
