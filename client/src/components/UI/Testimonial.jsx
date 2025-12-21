import React from "react";
import { assets } from "../../../public/assets";
import Image from "next/image";
import { features } from "../../../public/assets";

function Testimonial() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-20">
      <div>
        {/* Image */}
        <div className="relative">
          <Image alt="img" src={assets?.bottom_banner_image} className="hidden md:block" />
          <Image alt="img" src={assets?.bottom_banner_image_sm} className="block md:hidden" />
          <div className="absolute md:top-12 top-10 right-5 sm:right-40 md:right-24">
            <h3 className="text-2xl sm:text-3xl text-primary font-bold ">Why We Are The Best</h3>
            <div>
              {features?.map((item, index) => (
                <div key={index}>
                  <div className="pt-5 flex items-center gap-3">
                    <Image alt="icon" src={item?.icon} width={50}   />
                    <div>
                      <p className="text-gray-700 font-bold text-lg md:text-xl">{item?.title}</p>
                      <p className="text-gray-500 text-sm">{item?.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
