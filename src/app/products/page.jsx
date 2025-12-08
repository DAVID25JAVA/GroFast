import React from "react";
import { dummyProducts } from "../../../public/assets";
import ProductCard from "@/components/UI/Card";

function page() {
  return (
    <div className=" max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
      <p className="font-semibold uppercase text-xl sm:text-2xl md:text-2xl text-gray-700">
        all products
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5 mt-5">
        {dummyProducts?.map((item) => (
          <ProductCard productData={item} key={item?._id} />
        ))}
      </div>
    </div>
  );
}

export default page;
