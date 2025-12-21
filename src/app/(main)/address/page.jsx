"use client";
import React, { useState } from "react";
import Image from "next/image";
import { assets } from "../../../../public/assets";
import { useRouter } from "next/navigation";

function page() {
  const router = useRouter();
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    phone: 0,
    zipCode: "",
    country: "",
  });

  const handleForm = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
      <p className="text-lg sm:text-2xl md:text-3xl font-semibold text-gray-700 pb-5">
        Add Shipping <span className="text-primary">Address</span>
      </p>
      <form className="grid grid-cols-1 sm:grid-cols-2 mt-5">
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
              value={address?.firstName}
              onChange={(e) =>
                setAddress({ ...address, firstName: e.target.value })
              }
              placeholder="First name"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="lastName"
              value={address?.lastName}
              onChange={(e) =>
                setAddress({ ...address, lastName: e.target.value })
              }
              placeholder="Last name"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex flex-col gap-3">
            <input
              type="email"
              name="email"
              value={address?.email}
              onChange={(e) =>
                setAddress({ ...address, email: e.target.value })
              }
              placeholder="Email address"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="street"
              value={address?.street}
              onChange={(e) =>
                setAddress({ ...address, street: e.target.value })
              }
              placeholder="Street"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="city"
              value={address?.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              placeholder="City"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="state"
              value={address?.state}
              onChange={(e) =>
                setAddress({ ...address, state: e.target.value })
              }
              placeholder="State"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              name="zipCode"
              value={address?.zipCode}
              onChange={(e) =>
                setAddress({ ...address, zipCode: e.target.value })
              }
              placeholder="Zip code"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
            <input
              type="text"
              name="country"
              value={address?.country}
              onChange={(e) =>
                setAddress({ ...address, country: e.target.value })
              }
              placeholder="Country"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>

          <div>
            <input
              type="number"
              name="phone"
              value={address?.phone}
              onChange={(e) =>
                setAddress({ ...address, phone: e.target.value })
              }
              placeholder="Phone"
              className="border border-primary mt-1 p-2 focus:outline-none   w-full placeholder:text-primary"
            />
          </div>

          <button className="w-full bg-primary text-white py-2 cursor-pointer">
            Add Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
