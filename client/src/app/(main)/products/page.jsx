'use client'
import React from "react";
import { useState, useEffect } from "react";
import { dummyProducts } from "../../../../public/assets";
import ProductCard from "@/components/UI/Card";
import Loader from "@/components/UI/Loader";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";

function page() {
   
   const { setIsLoading, isLoading } = useUser();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await Api("get", "/product/get");
      setIsLoading(false);
      if (data?.success) {
        setProduct(data?.product);
      } else {
        toast.error(data?.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error?.message);
      setIsLoading(false);
    }
  };

  if(isLoading) return <Loader/>

  return (
    <div className=" max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20 h-screen">
      <p className="font-semibold uppercase text-xl sm:text-2xl md:text-2xl text-gray-700">
        all products
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5 mt-5">
        {product?.map((item) => (
          <ProductCard productData={item} key={item?._id} />
        ))}
      </div>
    </div>
  );
}

export default page;
