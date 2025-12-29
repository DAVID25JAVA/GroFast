"use client";
import React, { useState } from "react";
import { groceryFAQs } from "../../../public/assets";
import { Minus, Plus } from "lucide-react";

function FAQ() {
  const [faqId, setFaqId] = useState(null);

  const handleFAQ = (id) => {
    setFaqId(faqId === id ? null : id);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 py-5">
      <h1 className="text-gray-700 font-semibold text-lg sm:text-2xl md:text-3xl">
        Frequently Asked Questions
      </h1>

      <div className="flex flex-col gap-5 mt-10">
        {groceryFAQs.map((item, id) => (
          <div key={id} className="bg-green-50 rounded-lg p-4">
            {/* Question */}
            <div
              onClick={() => handleFAQ(id)}
              className="flex justify-between items-center cursor-pointer text-gray-700"
            >
              <h1 className="text-lg font-semibold">{item.question}</h1>
              {faqId === id ? <Minus /> : <Plus />}
            </div>

            {/* Answer with animation */}
            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out
                ${
                  faqId === id
                    ? "max-h-40 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
            >
              <p className="text-gray-600">{item.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
