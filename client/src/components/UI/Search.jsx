"use client";
import { useSearch } from "@/context/searchContext";
import { useUser } from "@/context/userContext";
import { SearchCheck, ShoppingCart, X } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api } from "../API/Api";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Search() {
  const { openSearch, setOpenSearch } = useSearch();
  const { isLoading, setIsLoading } = useUser();
  const [searchProducts, setSearchProducts] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (searchInput.trim() === "") {
      setSearchProducts([]);
      setHasSearched(false);
      return;
    }

    let timer;
    if (searchInput.length > 0) {
      timer = setTimeout(() => {
        search(searchInput);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [searchInput]);

  const search = async (searchText) => {
    console.log(searchText);
    try {
      setIsLoading(true);
      setHasSearched(true);
      const res = await Api("get", `/product/search?searchText=${searchText}`);
      console.log("res------>", res);
      if (res?.success) {
        setSearchProducts(res?.products || []);
        setIsLoading(false);
      } else {
        setSearchProducts([]);
        setIsLoading(false);
        toast.error(res?.message);
      }
    } catch (error) {
      setSearchProducts([]);
      toast.error(error?.message);
      setIsLoading(false);
    }
  };

  const handleRoute = (id) => {
    if (id) {
      router.push(`/products/details/${id}`);
      setOpenSearch(false);
      setSearchInput("")
    }
  };

  if (!openSearch) return null;

  return (
    <div className="fixed inset-0 z-50 backdrop-blur-sm flex justify-center items-start pt-24">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setOpenSearch(false)} />

      {/* Modal */}
      <div className="relative max-w-2xl w-full md:mx-auto mx-4 px-4 sm:px-6 md:px-8 bg-white rounded-md shadow-lg z-10">
        <div className="relative pt-5">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search products..."
            className="border border-primary px-3 py-2 text-primary w-full rounded-md outline-none placeholder:text-primary"
            autoFocus
          />
          <X
            size={26}
            onClick={() => setOpenSearch(false)}
            className="text-primary absolute right-2 top-7 cursor-pointer hover:bg-green-100 p-0.5 rounded-full"
          />
        </div>

        <div className="border mx-auto border-primary p-4 rounded-md min-h-[300px] max-h-[500px] overflow-y-auto my-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <div className="text-primary font-medium">Searching...</div>
            </div>
          ) : hasSearched && searchProducts.length > 0 ? (
            <div className="space-y-2">
              {searchProducts.map((item) => (
                <div
                  onClick={() => handleRoute(item?._id)}
                  key={item?._id}
                  className="flex items-center gap-4 border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer"
                >
                  {/* Product Image */}
                  <div className="relative w-16 h-16 shrink-0">
                    <img
                      src={item?.image?.[0]}
                      alt={item?.tittle || "Product"}
                      className="object-cover rounded-md"
                    />
                  </div>

                  {/* Product Name */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800">
                      {item?.tittle}
                    </h3>
                  </div>

                  {/* Product Price */}
                  <div className="flex flex-col items-end">
                    {item?.offerPrice ? (
                      <>
                        <span className="text-primary font-bold text-lg">
                          ₹{item?.offerPrice}
                        </span>
                        <span className="text-gray-400 line-through text-sm">
                          ₹{item?.price}
                        </span>
                      </>
                    ) : (
                      <span className="text-primary font-bold text-lg">
                        ₹{item?.price}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : hasSearched && searchProducts.length === 0 ? (
            <div className="flex flex-col justify-center items-center h-full text-gray-500">
              <ShoppingCart size={50} />
              <p className="font-medium text-lg">No products available</p>
              <p className="text-sm mt-1">
                Try searching with different keywords
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-full text-gray-500">
              <SearchCheck size={50} />
              <p className="font-medium text-lg">Search Products</p>
              <p className="text-sm mt-1">Start typing to find products</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
