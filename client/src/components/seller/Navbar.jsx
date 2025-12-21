"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { assets } from "../../../public/assets";
import Link from "next/link";
import { Button } from "../UI/button";

export default function SellerNavbar() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white transition-all duration-300">
      <Link href={"/"}>
        <Image alt="logo" src={assets?.logo} />
      </Link>
      <div className="flex items-center gap-5 text-gray-500">
        <p>Hi! Admin</p>
        {/* <button className=" outline-none rounded-full text-sm px-4 py-1 bg-primary text-white cursor-pointer  transition-colors">
          Logout
        </button> */}
        <Button className={'bg-primary cursor-pointer text-white'}>Logout</Button>
      </div>
    </div>
  );
}
