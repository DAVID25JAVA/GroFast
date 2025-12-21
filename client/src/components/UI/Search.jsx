"use client";
import { useSearch } from "@/context/searchContext";
import { X } from "lucide-react";

function Search() {
  const { openSearch, setOpenSearch } = useSearch();
  if (!openSearch) return null;

  return (
    <div className="fixed inset-0 z-50   backdrop-blur-sm flex justify-center items-start pt-24">
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={() => setOpenSearch(false)} />

      {/* Modal */}
      <div className="relative max-w-4xl w-full md:mx-auto mx-4 px-4 sm:px-6 md:px-8 bg-white rounded-md shadow-lg z-10">
        <div className="relative pt-5">
          <input
            type="text"
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

        <div className="border mx-auto flex justify-center items-center border-primary p-2 rounded-md min-h-[300px] overflow-y-auto my-2">
          <div className="flex justify-center items-center mx-auto">
            Search Products.....
          </div>
        </div>
      </div>
    </div>
  );
}

export default Search;
