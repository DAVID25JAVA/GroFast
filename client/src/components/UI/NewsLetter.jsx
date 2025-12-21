import React from "react";
import { Button } from "./button";

function NewsLetter() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
      <div className="flex my-20 flex-col items-center justify-center text-center space-y-2">
        <h1 className="md:text-4xl text-2xl font-semibold">
          Never Miss a Deal!
        </h1>
        <p className="md:text-lg text-gray-500/70 pb-8">
          Subscribe to get the latest offers, new arrivals, and exclusive
          discounts
        </p>
        <form className="flex items-center relative justify-between max-w-2xl w-full  ">
          <input
            className="border border-green-300 h-10 rounded-md   outline-none w-full   px-3 text-gray-500"
            type="text"
            placeholder="Enter your email id"
            required
          />
           <Button variant={'primary'} size={'lg'} className={'cursor-pointer absolute right-0'}>Subscribe</Button>
        </form>
      </div>
    </div>
  );
}

export default NewsLetter;
