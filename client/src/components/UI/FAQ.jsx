"use client";
import React, { useState } from "react";
import { groceryFAQs } from "../../../public/assets";
import { Minus, Plus } from "lucide-react";

function FAQ() {
  const [isShow, setIsShow] = useState(false);
  const [faqId, setFaqId] = useState(null);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5">
      <h1 className="text-gray-700 font-semibold text-lg sm:text-2xl md:text-3xl">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-col gap-5 mt-10">
        {groceryFAQs?.map((item, id) => (
          <div key={id} className="">
            <div
              onClick={() => setIsShow(!isShow)}
              className=" flex items-center text-gray-600 justify-between gap-2 bg-green-50 p-2 cursor-pointer"
            >
              <h1 className=" text-lg sm:text-lg font-semibold">
                {item?.question}
              </h1>
              {!isShow ? <Plus /> : <Minus />}
            </div>
            <div
              className={`p-2 ${
                isShow ? "block duration-200 transition" : "hidden"
              }`}
            >
              <span>{item?.answer}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
