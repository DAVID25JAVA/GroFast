'use client'
import { useRouter } from "next/navigation";
import  { useEffect } from "react";

function page() {
  const router = useRouter();

  useEffect(() => {
    let timer = setTimeout(() => {
      router.push("/my-order");
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className=" w-12 h-12 sm:w-16 sm:h-16  md:w-24 md:h-24 rounded-full border-4 border-gray-300 border-t-green-600 animate-spin"></div>
    </div>
  );
}

export default page;
