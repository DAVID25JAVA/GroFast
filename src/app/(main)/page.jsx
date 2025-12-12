import React from "react";
import HeroSection from "@/components/UI/HeroSection";
import Category from "@/components/UI/Category";
import BestSellers from "@/components/UI/BestSellers";
import Testimonial from "@/components/UI/Testimonial";
import NewsLetter from "@/components/UI/NewsLetter";

function page() {
  return (
    <div>
      <HeroSection />
      <Category />
      <BestSellers />
      <Testimonial />
      <NewsLetter />
    </div>
  );
}

export default page;
