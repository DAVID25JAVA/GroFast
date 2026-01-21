"use client";
import React, { useEffect, useState } from "react";
import ProductCard from "@/components/UI/Card";
import Loader from "@/components/UI/Loader";
import { useUser } from "@/context/userContext";
import { Api } from "@/components/API/Api";
import ReactPaginate from "react-paginate";

function Page() {
  const { isLoading, setIsLoading } = useUser();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(0);  
  const [totalPages, setTotalPages] = useState(0);

   
  useEffect(() => {
    fetchProducts(page + 1);  
  }, [page]);

  const fetchProducts = async (pageNumber) => {
    try {
      setIsLoading(true);
      const res = await Api("get", `/product/get?page=${pageNumber}`);
      setIsLoading(false);

      if (res?.success) {
        setProducts(res.product);
        setTotalPages(res.totalPages);
      }
    } catch (err) {
      setIsLoading(false);
      console.log(err.message);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-20">
      <h1 className="font-semibold uppercase text-2xl text-gray-700">
        All Products
      </h1>

      {/* Products */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        {products.map((item) => (
          <ProductCard key={item._id} productData={item} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-12">
        <ReactPaginate
          forcePage={page}                
          pageCount={totalPages}
          onPageChange={(e) => setPage(e.selected)}
          previousLabel="‹ Prev"
          nextLabel="Next ›"
          breakLabel="..."

          containerClassName="flex items-center gap-2"
          
          pageClassName="border rounded"
          pageLinkClassName="px-3 py-1 cursor-pointer"

          activeClassName="bg-black"
          activeLinkClassName="text-white font-semibold bg-primary"

          previousClassName="border rounded"
          previousLinkClassName="px-3 py-1 cursor-pointer"

          nextClassName="border rounded"
          nextLinkClassName="px-3 py-1 cursor-pointer"

          disabledClassName="opacity-40 cursor-not-allowed"
        />
      </div>
    </div>
  );
}

export default Page;
