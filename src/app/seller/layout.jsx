"use client";
import React from "react";
import { useUser } from "@/context/userContext";
import SellerNavbar from "@/components/seller/Navbar";
import SellerSidebar from "@/components/seller/SideBar";

function layout({ children }) {
  const { isSeller } = useUser();

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {isSeller&& <SellerNavbar />
}
      
      {/* Sidebar + Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {isSeller&& <SellerSidebar />}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}

export default layout;
