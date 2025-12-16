"use client";
import { useCart } from "@/context/cartContext";
import { MoveLeft, StarIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

function page() {
  const { addToCart } = useCart();
  const product = {
    name: "Nike Pegasus 41 shoes",
    category: "Sports",
    price: 189,
    offerPrice: 159,
    rating: 4,
    images: [
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage2.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage3.png",
      "https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage4.png",
    ],
    description: [
      "High-quality material",
      "Comfortable for everyday use",
      "Available in different sizes",
    ],
  };

  const [thumbnail, setThumbnail] = React.useState(product.images[0]);

  return (
    product && (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-28">
        <Link href={'/products'} className="flex items-center gap-2 bg-primary w-44 h-6 text-sm text-white text-center rounded-full"> <MoveLeft size={18} className="text-sm ml-2 text-white text-center" /> Back To Products</Link>
        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {product.images.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
            </div>

            <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
              <img
                src={thumbnail}
                alt="Selected product"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium">{product.name}</h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  product.rating > i ? (
                    <StarIcon key={i} size={15} />
                  ) : (
                    <StarIcon key={i} size={20} />
                  )
                )}
              <p className="text-base ml-2">({product.rating})</p>
            </div>

            <div className="mt-6">
              <p className="text-gray-500/70 line-through">
                MRP: ${product.price}
              </p>
              <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
              <span className="text-gray-500/70">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6">About Product</p>
            <ul className="list-disc ml-4 text-gray-500/70">
              {product.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => addToCart(product?.name)}
                className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition"
              >
                Add to Cart
              </button>

              <Link
                href={"/cart"}
                className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white   transition text-center"
              >
                Buy now
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default page;
