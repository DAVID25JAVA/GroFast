'use client'
import Navbar from "@/components/seller/Navbar";
import SideBar from "@/components/seller/SideBar";
import React from "react";
import { useUser } from "@/context/userContext";
import { usePathname } from "next/navigation";
import { redirect } from "next/navigation";

function layout({ children }) {
  
    

  return (
    <div className="flex min-h-screen">
      <SideBar />
      <div className="flex-1">
        <Navbar />
        <main className="p-6  ">{children}</main>
      </div>
    </div>
  );
}

export default layout;
