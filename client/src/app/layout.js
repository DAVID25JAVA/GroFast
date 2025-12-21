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
        <UserProvider>
          <SearchProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </SearchProvider>
        </UserProvider>
      </body>
    </html>
  );
}
