"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import { assets, menuItems } from "../../../public/assets";
import Link from "next/link";
import { MenuIcon, ShoppingCart } from "lucide-react";
import { useUser } from "@/context/userContext";

function Header() {
  const { isForm, setIsForm } = useUser();

  return (
    <div className=" backdrop-blur-2xl shadow-md fixed top-0 mx-auto w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <Image alt="logo" src={assets?.logo} className="" />
            </Link>
          </div>

          {/* Menu items */}
          <div className="sm:flex gap-5 hidden">
            {menuItems?.map((items) => (
              <div key={items?.id} className="pt-2">
                <Link
                  href={items?.path}
                  className="text-black cursor-pointer text-lg "
                >
                  {items?.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="flex gap-5 items-center ">
            {/* Search bar */}
            <div></div>
            <div className="relative cursor-pointer pt-2">
              {/* cart icons */}
              <ShoppingCart className="" />
              <div className="absolute w-4 h-4 bg-green-500 rounded-full text-center top-1 text-white -right-2 text-xs">
                0
              </div>
            </div>
            {/* Login Button for large sc */}
            <div className="">
              <Button
                variant={"primary"}
                className={"cursor-pointer pt-2 sm:block hidden"}
                onClick={() => setIsForm(!isForm)}
              >
                Login
              </Button>
              {/* Menu icon for small sc */}
              <div className="pt-2 sm:hidden block">
                <MenuIcon />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
