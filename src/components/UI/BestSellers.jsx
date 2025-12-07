"use client";
import { ShoppingCart, StarHalfIcon, StarIcon } from "lucide-react";
import { dummyProducts } from "../../../public/assets";
import { useState } from "react";
import Link from "next/link";

function BestSellers() {
  const [count, setCount] = useState(0);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="my-20">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-700">
          Best Sellers
        </h1>

        {/* Card code */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5   mt-5">
          {dummyProducts?.slice(0, 6)?.map((product, index) => (
            <div
              key={product?._id}
              className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white  "
            >
              <div className="group cursor-pointer flex items-center  justify-center px-2 ">
                {/* {product?.image?.map((img, index) => ( */}
                <Link href={`/products/details/${product?._id}`}>
                  <img
                     
                    className="group-hover:scale-105 transition max-w-26 md:max-w-28"
                    src={product?.image[0]?.src}
                    alt={product.name}
                  />
                </Link>
                {/* ))} */}
              </div>
              <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">
                  {product.name}
                </p>
                <div className="flex items-center gap-0.5">
                  {Array(5)
                    .fill("")
                    .map((_, i) =>
                      product.rating > i ? (
                        <StarIcon size={15} >{i}</StarIcon>
                      ) : (
                         <StarIcon key={i} size={15} />
                      )
                    )}
                  <p>({product.rating})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                  <p className="md:text-xl text-base font-medium  text-primary">
                    ${product.offerPrice}{" "}
                    <span className="text-red-400 md:text-sm text-xs line-through">
                      ${product.price}
                    </span>
                  </p>
                  <div className="text-primary">
                    {count === 0 ? (
                      <button
                        className="flex items-center justify-center gap-1 bg-primary   md:w-20 w-16 h-[34px] rounded text-white font-medium"
                        onClick={() => setCount(1)}
                      >
                        <ShoppingCart size={15} />
                        Add
                      </button>
                    ) : (
                      <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary rounded select-none">
                        <button
                          onClick={() =>
                            setCount((prev) => Math.max(prev - 1, 0))
                          }
                          className="cursor-pointer text-white text-md px-2 h-full"
                        >
                          -
                        </button>
                        <span className="w-5 text-center text-white">{count}</span>
                        <button
                          onClick={() => setCount((prev) => prev + 1)}
                          className="cursor-pointer text-white text-md px-2 h-full"
                        >
                          +
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
