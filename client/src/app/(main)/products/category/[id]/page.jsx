"use client";
import React, { useEffect, useState } from "react";
import { dummyProducts } from "../../../../../../public/assets";
import { useParams } from "next/navigation";
import ProductCard from "@/components/UI/Card";
import toast from "react-hot-toast";
import { Api } from "@/components/API/Api";
import { useUser } from "@/context/userContext";
import Loader from "@/components/UI/Loader";

function page() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const { setIsLoading, isLoading } = useUser();
  console.log(id);

  useEffect(() => {
    if (id) {
      fetchProducts(id);
    }
  }, [id]);

  const fetchProducts = async (category) => {
    try {
      setIsLoading(true);
      const res = await Api("get", `/product/category/${category}`);
      if (res?.success) {
        setIsLoading(false);
        setProducts(res?.products);
      }
      console.log(res);
    } catch (error) {
      setIsLoading(false);
      toast.error(error?.message);
    }
  };

  if (products.length == 0) {
    return (
      <>
        {products.length == 0 && (
          <div className="flex justify-center items-center md:h-screen h-96 ">
            <p className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-600">
              No product found in this category
            </p>
          </div>
        )}
      </>
    );
  }

  if(isLoading) return <Loader/>

  return (
    <div className="h-screen py-28 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <p className="text-gray-700 font-semibold text-base sm:text-lg md:text-xl uppercase">
        Filter By{" "}
        <span className="border-b-2 border-primary text-primary">
          {id.toUpperCase()}
        </span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5   mt-5">
        {products?.length > 0 &&
          products
            ?.slice(0, 6)
            ?.map((product) => (
              <ProductCard productData={product} key={product?._id} />
            ))}
      </div>
    </div>
  );
}

export default page;
