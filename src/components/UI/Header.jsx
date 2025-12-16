"use client";
import React, { useState } from "react";
import { Button } from "./button";
import Image from "next/image";
import { assets, menuItems } from "../../../public/assets";
import Link from "next/link";
import { CircleUser, MenuIcon, Search, ShoppingCart, User, X } from "lucide-react";
import { useUser } from "@/context/userContext";
import { useCart } from "@/context/cartContext";

function Header() {
  const { isForm, setIsForm, isUser, isSeller } = useUser();
  const { cart, updateQuantity } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cartQunatity = Object.values(cart).reduce(
    (items, qty) => items + qty,
    0
  );
  

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when a link is clicked
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <div className="backdrop-blur-2xl z-40 shadow-md fixed top-0 mx-auto w-full">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div>
              <Link href={"/"}>
                <Image alt="logo" src={assets?.logo} className="" />
              </Link>
            </div>

            {/* Menu items - Desktop */}
            <div className="sm:flex gap-5 hidden items-center">
              {isUser && (
                <Link
                  href={"/seller"}
                  className="hover:bg-gray-50 text-gray-800 text-sm border px-3 font-normal rounded-full mt-2"
                >
                  Seller Dashboard
                </Link>
              )}
              {menuItems?.map((items) => (
                <div key={items?.id} className="pt-2">
                  <Link
                    href={items?.path}
                    className="text-gray-800 cursor-pointer text-lg"
                  >
                    {items?.name}
                  </Link>
                </div>
              ))}
            </div>

            <div className="flex gap-5 items-center">
              {/* Search bar */}
              <div><Search className="cursor-pointer" /></div>

              {/* Cart icon */}
              <div className="relative cursor-pointer pt-2">
                <Link href={"/cart"}>
                  <ShoppingCart className="" />
                </Link>
                <div className="absolute w-4 h-4 bg-green-500 rounded-full text-center top-1 text-white -right-2 text-xs">
                  {cartQunatity || 0}
                </div>
              </div>

              {/* Login Button for large screen */}
              <div className="">
                {isUser ? (
                  <div className="relative group hidden sm:block">
                    <CircleUser
                      size={25}
                      className="cursor-pointer hover:bg-green-500 w-9 h-9 hover:text-white p-1 rounded-full transition duration-200"
                    />

                    {/* Dropdown */}
                    <div
                      className="absolute min-w-[155px] right-0 mt-2 px-5 py-2 text-gray-700 text-base bg-white shadow-lg rounded-md 
                      opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200"
                    >
                      <ul className="space-y-2 space-x-5">
                        <li className="cursor-pointer hover:text-green-600">
                          <Link href={"/my-order"}>My Order</Link>
                        </li>
                        <li className="cursor-pointer hover:text-red-600">
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

                {/* Menu icon for small screen */}
                <div className="pt-2 sm:hidden block">
                  <button onClick={toggleMobileMenu} aria-label="Toggle menu">
                    {isMobileMenuOpen ? (
                      <X className="w-6 h-6" />
                    ) : (
                      <MenuIcon className="w-6 h-6" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0  backdrop-blur-2xl bg-opacity-50 z-30 sm:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out sm:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-800">Menu</h2>
            <button onClick={closeMobileMenu} aria-label="Close menu">
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Mobile Menu Items */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-4">
              {/* User Profile Section */}
              {isUser ? (
                <div className="pb-4 border-b">
                  <div className="flex items-center gap-3 mb-3">
                    <CircleUser size={40} className="text-gray-600" />
                    <div>
                      <p className="font-semibold text-gray-800">Welcome!</p>
                      <p className="text-sm text-gray-500">User Account</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Link
                      href={"/my-order"}
                      onClick={closeMobileMenu}
                      className="block py-2 px-3 text-gray-700 hover:bg-gray-100 rounded-md"
                    >
                      My Orders
                    </Link>
                    <button
                      onClick={() => {
                        closeMobileMenu();
                        // Add your sign out logic here
                      }}
                      className="block w-full text-left py-2 px-3 text-red-600 hover:bg-red-50 rounded-md"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pb-4 border-b">
                  <Button
                    variant={"primary"}
                    className={"w-full"}
                    onClick={() => {
                      setIsForm(!isForm);
                      closeMobileMenu();
                    }}
                  >
                    Login
                  </Button>
                </div>
              )}

              {/* Seller Dashboard Link */}
              {isUser && (
                <Link
                  href={"/seller"}
                  onClick={closeMobileMenu}
                  className="block py-3 px-3 text-gray-800 font-medium hover:bg-green-50 rounded-md border border-green-200"
                >
                  Seller Dashboard
                </Link>
              )}

              {/* Menu Items */}
              {menuItems?.map((items) => (
                <Link
                  key={items?.id}
                  href={items?.path}
                  onClick={closeMobileMenu}
                  className="block py-3 px-3 text-gray-800 text-lg hover:bg-gray-100 rounded-md"
                >
                  {items?.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
