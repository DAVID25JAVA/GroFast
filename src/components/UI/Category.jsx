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
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-5 place-content-center place-items-center">
          {categories?.map((item, index) => (
            <div key={index} className="bg">
              <div
                className={`bg-indigo-200  md:h-48 h-44 flex flex-col-reverse items-center rounded-lg`}
                style={{ backgroundColor: item?.bgColor }}
              >
                <p className="text-gray-700 font-semibold text-sm p-3">
                  {item?.text}
                </p>
                <Link href={`/products/category/${item?.path?.toLowerCase()}`}>
                  <Image
                    alt="product img"
                    src={item?.image}
                    className={`bg-[${item?.bgColor}] md:w-36  cursor-pointer p-2 transition-transform duration-300 hover:scale-110`}
                  />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Category;
