"use client";
import "./globals.css";
// import Footer from "@/components/UI/Footer";
// import Header from "@/components/UI/Header";
import { UserProvider } from "@/context/userContext";
 

export default function RootLayout({ children }) {
   

  return (
    <html lang="en">
      <body className={`antialiased`}>
        <UserProvider>
          {/* <Header /> */}
          {children}
          {/* <Footer /> */}
        </UserProvider>
      </body>
    </html>
  );
}
