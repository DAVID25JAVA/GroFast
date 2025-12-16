"use client";
import CartProvider from "@/context/cartContext";
import "./globals.css";
import { UserProvider } from "@/context/userContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </UserProvider>
      </body>
    </html>
  );
}
