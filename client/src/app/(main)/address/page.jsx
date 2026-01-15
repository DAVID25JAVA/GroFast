"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "../../../../public/assets";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";
import toast from "react-hot-toast";

function page() {
  const router = useRouter();
  const { setIsLoading, setUser, user } = useUser();
  const [userAddress, setUserAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: "",
    zipCode: "",
    country: "",
  });

  const handleForm = async (e) => {
    e.preventDefault();
    const address = {
      firstName: userAddress?.firstName,
      lastName: userAddress?.lastName,
      email: userAddress?.email,
      street: userAddress?.street,
      city: userAddress?.city,
      state: userAddress?.state,
      phone: userAddress?.phone,
      zipCode: userAddress?.zipCode,
      country: userAddress?.country,
    };
    try {
      setIsLoading(true);
      const data = await Api("post", "/user/address/add", {
        address,
        userId: user?._id,
      });
      if (data?.success) {
        setIsLoading(false);
        toast.success(data?.message);
        setUserAddress({
          firstName: "",
          lastName: "",
          email: "",
          street: "",
          city: "",
          state: "",
          phone: "",
          zipCode: "",
          country: "",
        });
         router.push("/cart")
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log("Address error--->", error?.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
      <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-700 pb-5">
        Add Shipping <span className="text-primary">Address</span>
      </p>
      <form
        onSubmit={handleForm}
        className="grid grid-cols-1 sm:grid-cols-2 mt-5"
      >
        {/* image */}
        <div className="hidden sm:block md:block">
          <Image
            alt="Sipping address image"
            src={assets?.add_address_iamge?.src}
            width={400}
            height={500}
          />
        </div>
        {/* address form */}
        <div className="flex flex-col gap-3 w-full">
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="firstName"
              value={userAddress?.firstName}
              onChange={(e) =>
                setUserAddress({ ...userAddress, firstName: e.target.value })
              }
              placeholder="First name"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="lastName"
              value={userAddress?.lastName}
              onChange={(e) =>
                setUserAddress({ ...userAddress, lastName: e.target.value })
              }
              placeholder="Last name"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              value={userAddress?.email}
              onChange={(e) =>
                setUserAddress({ ...userAddress, email: e.target.value })
              }
              placeholder="Email address"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="street"
              value={userAddress?.street}
              onChange={(e) =>
                setUserAddress({ ...userAddress, street: e.target.value })
              }
              placeholder="Street"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="city"
              value={userAddress?.city}
              onChange={(e) =>
                setUserAddress({ ...userAddress, city: e.target.value })
              }
              placeholder="City"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="state"
              value={userAddress?.state}
              onChange={(e) =>
                setUserAddress({ ...userAddress, state: e.target.value })
              }
              placeholder="State"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              name="zipCode"
              value={userAddress?.zipCode}
              onChange={(e) =>
                setUserAddress({ ...userAddress, zipCode: e.target.value })
              }
              placeholder="Zip code"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="country"
              value={userAddress?.country}
              onChange={(e) =>
                setUserAddress({ ...userAddress, country: e.target.value })
              }
              placeholder="Country"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>

          <div>
            <input
              type="number"
              name="phone"
              value={userAddress?.phone}
              onChange={(e) =>
                setUserAddress({ ...userAddress, phone: e.target.value })
              }
              placeholder="Phone"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 cursor-pointer"
          >
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
