import React from "react";
import { categories } from "../../../public/assets";
import Image from "next/image";
import Link from "next/link";

function Category() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="my-20">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-700">
          Categories
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-5   place-items-center">
          {categories?.map((item, index) => (
            <div key={index} className="bg relat ive">
              <div
                className={`bg-indigo-200   flex flex-col-reverse items-center   rounded-lg`}
                style={{ backgroundColor: item?.bgColor }}
              >
                <Link
                  href={`/products/category/${item?.path?.toLowerCase()}`}
                  className="flex items-center justify-center"
                >
                  <Image
                    alt="product img"
                    src={item?.image}
                    className={`bg-[${item?.bgColor}] md:w-36 w-full   cursor-pointer md:p-5 p-7  transition-transform duration-300 hover:scale-110`}
                  />
                </Link>
              </div>
              <p className="text-gray-700 text-center   text-sm  abso lute bottom-2 ">
                {item?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
