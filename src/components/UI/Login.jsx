"use client";
import { useUser } from "@/context/userContext";
import { X } from "lucide-react";
import React, { useState } from "react";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { setIsForm } = useUser();

  return (
    <div className=" backdrop-blur-sm h-full mx-auto px-4 sm:px-6 md:px-8 mb-10 fixed inset-0   flex justify-center items-center z-50">
      <div className="bg-gray-50 max-w-md mx-auto p-4 rounded shadow-lg relative  w-full ">
        <X
          onClick={() => setIsForm(false)}
          className="absolute right-2 top-2 cursor-pointer"
        />
        <p className="text-2xl md:text-3xl font-semibold text-gray-700 text-center pt-5">
          User{" "}
          <span className="text-primary">{isLogin ? "Login" : "Sign Up"}</span>
        </p>

        {/* Login */}
        {isLogin && (
          <div className="md:px-8 pb-5 flex flex-col gap-5">
            <div>
              <label htmlFor="" className="text-gray-600 text-base ">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-primary mt-1 p-2 focus:outline-none   w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-600 text-base ">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-primary mt-1 p-2 focus:outline-none   w-full"
              />
            </div>
          </div>
        )}

        {/* Sign up */}
        {!isLogin && (
          <div className="md:p-8 flex flex-col gap-5">
            <div>
              <label htmlFor="" className="text-gray-600 text-base ">
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="border border-primary mt-1 p-2 focus:outline-none   w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-600 text-base ">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="border border-primary mt-1 p-2 focus:outline-none   w-full"
              />
            </div>
            <div>
              <label htmlFor="" className="text-gray-600 text-base ">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="border border-primary mt-1 p-2 focus:outline-none   w-full"
              />
            </div>
          </div>
        )}
        <div className="md:px-8 pb-5">
          <p>
            {isLogin ? "Create an account" : "Already have account?"}{" "}
            <span
              onClick={() => setIsLogin(!isLogin)}
              className="text-base text-primary cursor-pointer hover:underline"
            >
              click here
            </span>
          </p>
          {/* button */}
          <button className="bg-primary text-white w-full p-2 cursor-pointer mt-5">
            {isLogin ? "Login" : "Create account"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
