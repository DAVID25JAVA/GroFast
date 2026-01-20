"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import ProductCard from "@/components/UI/Card";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";
import { useUser } from "@/context/userContext";
import Loader from "@/components/UI/Loader";
import Link from "next/link";
import { MoveLeft } from "lucide-react";

function Page() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { setIsLoading, isLoading } = useUser();

  useEffect(() => {
    if (id) fetchProducts(id);
  }, [id]);

  const fetchProducts = async (category) => {
    try {
      setIsLoading(true);
      const res = await Api("get", `/product/category/${category}`);
      setProducts(res?.products || []);
    } catch (error) {
      toast.error(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  // 1️⃣ Loader first
  if (isLoading) return <Loader />;

  // 2️⃣ No products found
  if (!isLoading && products.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center md:h-screen h-96">
        <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600">
          No product found in this category
        </p>
        <Link href="/">
          <button className="text-white mt-5 bg-primary px-4 py-2 rounded-md">
            Back To Home
          </button>
        </Link>
      </div>
    );
  }

  // 3️⃣ Products exist
  return (
    <div className="py-28 max-w-6xl mx-auto px-4">
      <Link href="/">
        <div className="text-white bg-primary w-36 text-center py-1 rounded-full text-xs flex items-center justify-center gap-1">
          <MoveLeft size={14} />
          <p>Back To Home</p>
        </div>
      </Link>

      <p className="text-gray-700 font-semibold text-base pt-3 sm:text-lg uppercase">
        Filter By{" "}
        <span className="border-b-2 border-primary text-primary">
          {id.toUpperCase()}
        </span>
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-5">
        {products.map((product) => (
          <ProductCard productData={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
}

export default Page;
