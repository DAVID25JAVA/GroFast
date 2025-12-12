import React from "react";
import { UserProvider } from "@/context/userContext";
import Header from "@/components/UI/Header";
import Footer from "@/components/UI/Footer";

function layout({ children }) {
  return (
     
      <UserProvider>
        <Header />
        <main> {children}</main>
        <Footer />
      </UserProvider>
    
  );
}

export default layout;
