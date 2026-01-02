"use client";

import { useCart } from "@/context/cartContext";
import { MoveLeft } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Api } from "@/components/API/Api";
import { useUser } from "@/context/userContext";
import { useParams } from "next/navigation";
import Loader from "@/components/UI/Loader";

function Page() {
  const [product, setProduct] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);

  const { id } = useParams();
  const { addToCart } = useCart();
  const { setIsLoading, isLoading } = useUser();

  useEffect(() => {
    if (id) fetchProduct(id);
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      setIsLoading(true);
      const res = await Api("get", `/product/${id}`);
      if (res?.success) {
        setProduct(res.data);
        setThumbnail(res.data?.image?.[0] || null);
      }
    } catch (error) {
      console.log(error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <Loader />;
  if (!product) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-28">
      <Link
        href="/products"
        className="flex items-center gap-2 bg-primary w-44 h-6 text-sm text-white rounded-full px-3"
      >
        <MoveLeft size={16} />
        Back To Products
      </Link>

      <div className="flex flex-col md:flex-row gap-16 mt-6">
        {/* Image Section */}
        <div className="flex gap-3">
          {/* Thumbnails */}
          <div className="flex flex-col gap-3">
            {product?.image?.map((img, index) => (
              <div
                key={index}
                onClick={() => setThumbnail(img)}
                className="border w-24 h-24 border-gray-300 rounded overflow-hidden cursor-pointer"
              >
                <img
                  src={img}
                  alt="thumbnail"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Main Image */}
          <div className="border border-gray-300 rounded w-[400px] h-[400px] overflow-hidden">
            <img
              src={thumbnail || "/placeholder.png"}
              alt={product.tittle}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-semibold">{product.tittle}</h1>

          <div className="mt-6">
            <p className="text-gray-500 line-through">MRP: ₹{product.price}</p>
            <p className="text-2xl font-medium">₹{product.offerPrice}</p>
            <span className="text-gray-500 text-sm">
              (inclusive of all taxes)
            </span>
          </div>

          <p className="text-lg font-medium mt-6">About Product</p>
          <p className="text-gray-600 mt-2 text-sm">{product.description}</p>

          <div className="flex gap-4 mt-10">
            <button
              onClick={() => addToCart(product)}
              className="w-full py-3 font-medium cursor-pointer bg-gray-100 hover:bg-gray-200"
            >
              Add to Cart
            </button>

            <Link
              href="/cart"
              className="w-full py-3 text-center font-medium bg-primary text-white"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
