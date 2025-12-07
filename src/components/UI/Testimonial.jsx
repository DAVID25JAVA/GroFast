import React from "react";
import { assets } from "../../../public/assets";
import Image from "next/image";

function Testimonial() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 my-20">
      <div>
        {/* Image */}
        <div className="">
          <Image alt="img" src={assets?.bottom_banner_image} />
          <div className="">
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonial;
