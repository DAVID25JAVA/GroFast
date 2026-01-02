"use client";
import React from "react";
import { assets } from "../../../public/assets";
import { Button } from "./button";
import { MoveRight } from "lucide-react";
import Link from "next/link";
 

function HeroSection() {
   

  return (
    <div className="">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-12">
        {/* Hero for large screens */}
        <div
          className="hidden md:block bg-cover   mt-14 min-h-full w-full rounded-xl"
          style={{ backgroundImage: `url(${assets?.main_banner_bg.src})` }}
        >
          <div className="p-16">
            <h1 className="text-5xl font-extrabold leading-14 text-gray-700">
              Freshness You Can <br /> Trust, Savings You <br /> will Love!
            </h1>

            <div className="pt-10 flex items-center gap-10">
              <Link href={"/products"}>
                <Button
                  variant={"primary"}
                  size={"lg"}
                  className={"cursor-pointer"}
                >
                  Shop now
                </Button>
              </Link>
              <p className="text-gray-700 font-semibold flex items-center gap-2 cursor-pointer">
                Explore deals <MoveRight />
              </p>
            </div>
          </div>
        </div>

        {/* Hero for small screens */}
        <div
          className="md:hidden relative bg-center bg-cover bg-no-repeat mt-10 rounded-xl h-full min-h-[500px]"
          style={{
            backgroundImage: `url(${
              assets?.main_banner_bg_sm?.src || assets?.main_banner_bg.src
            })`,
          }}
        >
          <div className="p-6 sm:p-8 h-full flex flex-col justify-center items-center">
            <p className="text-2xl text-center absolute bottom-36  sm:text-4xl font-extrabold text-black">
              Freshness You Can <br /> Trust, Savings You <br /> will Love!
            </p>

            <div className="pt-8 absolute bottom-10  flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <Link href={"/products"}>
                <Button
                  variant={"primary"}
                  size={"lg"}
                  className={"cursor-pointer w-full sm:w-auto"}
                >
                  Shop now
                </Button>
              </Link>
              <p className="text-gray-700 font-semibold flex items-center gap-2 cursor-pointer">
                Explore deals <MoveRight size={20} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;
