"use client";
import { dummyProducts } from "../../../public/assets";
import ProductCard from "./Card";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useUser } from "@/context/userContext";
import { Api } from "../API/Api";

function BestSellers() {
  const { setIsLoading, isLoading } = useUser();
  const [product, setProduct] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      setIsLoading(true);
      const data = await Api("get", "/product/get");
      console.log(data);
      
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

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="my-20">
        <h1 className="text-2xl sm:text-3xl md:text-3xl font-semibold text-gray-700">
          Best Sellers
        </h1>

        {/* Card code */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-5   mt-5">
          {product.map((product) => (
                <ProductCard productData={product} key={product?._id} />
              ))}
        </div>
      </div>
    </div>
  );
}

export default BestSellers;
