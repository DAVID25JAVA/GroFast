"use client";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";
import React from "react";

function page() {
  const { isSeller, setIsSeller } = useUser();
  const router = useRouter();

  console.log(isSeller);

  const handleLogin = (e) => {
    e.preventDefault();
    setIsSeller(true);
    router.push("/seller")
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-4 sm:px-6 md:px-8">
      <div className="w-full max-w-md flex flex-col gap-5 p-5 border rounded-md shadow-md bg-white">
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 text-center pt-5">
          Seller <span className="text-primary">Login </span>
        </p>
        <form action="" className=""  onSubmit={handleLogin}>
          <div>
            <label htmlFor="" className="text-gray-600 text-base">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="border border-primary mt-1 p-2 focus:outline-none w-full mb-6"
            />
          </div>
          <div>
            <label htmlFor="" className="text-gray-600 text-base">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="border border-primary mt-1 p-2 focus:outline-none w-full"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white w-full p-2 cursor-pointer mt-10"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default page;
