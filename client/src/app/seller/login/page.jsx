"use client";
import { Api } from "@/components/API/Api";
import { useUser } from "@/context/userContext";
import { Check, Copy } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { assets } from "../../../../public/assets";
import Link from "next/link";

function page() {
  const { isSeller, setIsSeller, setIsLoading, authLoading } = useUser();
  const [copiedField, setCopiedField] = useState("");
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();

  useEffect(() => {
    if (authLoading) return;  
    if (isSeller) {
      router.push("/seller");
    }
  }, [isSeller, authLoading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    // setIsLoading(true);
    const payload = {
      email: formdata.email,
      password: formdata.password,
    };
    // console.log("Payload-->", payload);

    try {
      setIsLoading(true);

      const data = await Api("post", "/seller/login", payload);
      // console.log("Seller login--->", data);
      setIsLoading(false);
      if (data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("isSeller", "true");
        }
        setIsSeller(true);
        router.push("/seller");
      }else {
        toast.error(data.message || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setIsSeller(false);
      toast.error(error?.message);
    }
  };

  const handleCopy = (e) => {
    const text = e.currentTarget.dataset.copy;
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(text);
    setTimeout(() => setCopiedField(""), 2000);
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }


  return (
    <>
      <Link href={"/"}>
        <Image
          src={assets?.logo}
          alt="logo"
          width={120}
          className="mx-5 sm:mx-8 md:mx-10 cursor-pointer"
        />
      </Link>
      <div className="md:min-h-screen mt-20 md:mt-0 flex justify-center items-center px-4 sm:px-6 md:px-8">
        <div className="w-full max-w-md flex flex-col gap-5 p-5 border rounded-md shadow-md bg-white">
          <p className="text-2xl md:text-3xl font-semibold text-gray-700 text-center pt-5">
            Seller <span className="text-primary">Login </span>
          </p>
          <form action="" className="" onSubmit={handleLogin}>
            <div>
              <label htmlFor="" className="text-gray-600 text-base">
                Email
              </label>
              <input
                type="email"
                value={formdata?.email}
                onChange={(e) =>
                  setFormData({ ...formdata, email: e.target.value })
                }
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
                value={formdata?.password}
                onChange={(e) =>
                  setFormData({ ...formdata, password: e.target.value })
                }
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

            {/* Login Credentials */}
            <div className="mt-5 border border-gray-200 flex flex-col gap-1 px-2 py-1">
              <div
                data-copy="seller12@gmail.com"
                onClick={handleCopy}
                className="   flex justify-between border-b py-1"
              >
                <p className="text-md text-gray-700 font-semibold">
                  Email:{" "}
                  <span className="copy-text text-base font-normal text-primary">
                    seller12@gmail.com
                  </span>
                </p>
                <div className="cursor-pointer">
                  {copiedField === "seller12@gmail.com" ? (
                    <Check size={20} />
                  ) : (
                    <Copy size={20} />
                  )}
                </div>
              </div>

              <div
                data-copy="seller123"
                onClick={handleCopy}
                className=" flex justify-between"
              >
                <p className="text-md text-gray-700 font-semibold">
                  Password:{" "}
                  <span className="copy-text text-base font-normal text-primary">
                    seller123
                  </span>
                </p>

                <div className="cursor-pointer">
                  {copiedField === "seller123" ? (
                    <Check size={20} />
                  ) : (
                    <Copy size={20} />
                  )}
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default page;
