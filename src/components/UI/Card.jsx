"use client";
import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, StarIcon } from "lucide-react";
import { useCart } from "@/context/cartContext";

function ProductCard({ productData }) {
  const [count, setCount] = useState(0);
  const { addToCart, cart, updateQuantity } = useCart();

  const { _id, name, category, image, rating, offerPrice, price } =
    productData || {};

  return (
    <div className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white">
      <div className="group cursor-pointer flex items-center justify-center px-2">
        <Link href={`/products/details/${_id}`}>
          <img
            className="group-hover:scale-105 transition max-w-26 md:max-w-28"
            src={image?.[0]?.src}
            alt={productData?.name}
          />
        </Link>
      </div>

      <div className="text-gray-500/60 text-sm">
        <p>{category}</p>
        <p className="text-gray-700 font-medium text-lg truncate w-full">
          {name}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-0.5">
          {Array(5)
            .fill("")
            .map((_, i) =>
              rating > i ? (
                <StarIcon key={i} size={15} />
              ) : (
                <StarIcon key={i} size={15} />
              )
            )}
          <p>({rating})</p>
        </div>

        {/* Price + Add to cart */}
        <div className="flex items-end justify-between mt-3">
          <p className="md:text-xl text-base font-medium text-primary">
            ${offerPrice}{" "}
            <span className="text-red-400 md:text-sm text-xs line-through">
              ${price}
            </span>
          </p>

          <div className="text-primary">
            {count === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary md:w-20 w-16 h-[34px] rounded text-white font-medium"
                onClick={() => {
                  addToCart(productData?._id), setCount(count + 1);
                }}
              >
                <ShoppingCart size={15} />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary rounded select-none">
                <button
                  onClick={() => {
                    updateQuantity(_id, cart[_id] - 1), setCount(count - 1);
                  }}
                  className="cursor-pointer text-white text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center text-white">
                  {cart[_id] || 0}
                </span>
                <button
                  onClick={() => {
                    addToCart(productData?._id), setCount(count + 1);
                  }}
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
  );
}

export default ProductCard;
