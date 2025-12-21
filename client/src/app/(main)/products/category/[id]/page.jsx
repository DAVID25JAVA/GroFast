"use client";
import React, { useEffect, useState } from "react";
import { dummyProducts } from "../../../../../../public/assets";
import { useParams } from "next/navigation";
import ProductCard from "@/components/UI/Card";

function page() {
  const { id } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts(id);
  }, [id]);

  const fetchProducts = (id) => {
    const data = dummyProducts.filter(
      (data) => data.category.toLowerCase() == id
    );
    setProducts(data);
  };

  return (
    <div className="h-screen py-28 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <p className="text-gray-700 font-semibold text-base sm:text-lg md:text-xl uppercase">
        Filter By{" "}
        <span className="border-b-2 border-primary text-primary">
          {id.toUpperCase()}
        </span>
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5   mt-5">
        {products?.slice(0, 6)?.map((product) => (
          <ProductCard productData={product} key={product?._id} />
        ))}
      </div>
    </div>
  );
}

export default page;
