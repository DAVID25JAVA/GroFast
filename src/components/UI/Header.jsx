"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import { assets, menuItems } from "../../../public/assets";
import Link from "next/link";
import { CircleUser, MenuIcon, ShoppingCart, User } from "lucide-react";
import { useUser } from "@/context/userContext";

function Header() {
  const { isForm, setIsForm, isUser, isSeller } = useUser();

  return (
    <div className=" backdrop-blur-2xl z-40 shadow-md fixed top-0 mx-auto w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div>
            <Link href={"/"}>
              <Image alt="logo" src={assets?.logo} className="" />
            </Link>
          </div>

          {/* Menu items */}
          <div className="sm:flex gap-5 hidden items-center">
            {isUser && <Link href={"/seller"} className="hover:bg-gray-50 text-sm border px-3 sm:block font-normal rounded-full mt-2">Seller Dashboard</Link>}
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
              <Link href={"/cart"}>
                <ShoppingCart className="" />
              </Link>
              <div className="absolute w-4 h-4 bg-green-500 rounded-full text-center top-1 text-white -right-2 text-xs">
                0
              </div>
            </div>
            {/* Login Button for large sc */}
            <div className="">
              {isUser ? (
                <div className="relative group hidden sm:block">
                  <CircleUser
                    size={25}
                    className="cursor-pointer hover:bg-green-500 w-9 h-9 hover:text-white p-1 rounded-full transition duration-200"
                  />

                  {/* Dropdown */}
                  <div
                    className="absolute min-w-[155px] right-0 mt-2 px-5  py-2 text-gray-700 text-base bg-white shadow-lg rounded-md 
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                  >
                    <ul className=" space-y-2 space-x-5  ">
                      <li className="cursor-pointer hover:text-green-600">
                        <Link href={"/my-order"}>My Order</Link>
                      </li>
                      <li className="cursor-pointer hover:text-red-600 ">
                        Sign Out
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <Button
                  variant={"primary"}
                  className={"cursor-pointer pt-2 sm:block hidden"}
                  onClick={() => setIsForm(!isForm)}
                >
                  Login
                </Button>
              )}
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
