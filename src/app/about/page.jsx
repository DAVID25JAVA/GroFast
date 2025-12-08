import React from "react";

function page() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 pt-28 pb-20">
      <h1 className=" text-xl md:text-3xl text-gray-700 font-semibold text-center  ">
        About our  <span className="text-primary">apps</span>
      </h1>
      <p className="text-sm text-slate-500 text-center mt-2 max-w-md mx-auto">
        A visual collection of our most recent works - each piece crafted with
        intention, emotion and style.
      </p>
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8 px-4 md:px-0 py-10">
        <div className="size-[520px] rounded-full absolute blur-[300px] -z-10 bg-[#FBFFE1]"></div>
        <img
          className="max-w-sm w-full rounded-xl h-auto"
          src="https://images.unsplash.com/photo-1555212697-194d092e3b8f?q=80&w=830&h=844&auto=format&fit=crop"
          alt=""
        />
        <div>
          <h1 className="text-xl  md:text-3xl font-semibold text-gray-700">Our Latest  <span className="text-primary">features</span></h1>
          <p className="text-sm text-slate-500 mt-2">
            Ship Beautiful Frontends Without the Overhead — Customizable,
            Scalable and Developer-Friendly UI Components.
          </p>

          <div className="flex flex-col gap-10 mt-6">
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/flashEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Lightning-Fast Performance
                </h3>
                <p className="text-sm text-slate-500">
                  Built with speed — minimal load times and optimized.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/colorsEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Beautifully Designed Components
                </h3>
                <p className="text-sm text-slate-500">
                  Modern, pixel-perfect UI components ready for any project.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="size-9 p-2 bg-indigo-50 border border-indigo-200 rounded">
                <img
                  src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/aboutSection/puzzelEmoji.png"
                  alt=""
                />
              </div>
              <div>
                <h3 className="text-base font-medium text-slate-600">
                  Plug-and-Play Integration
                </h3>
                <p className="text-sm text-slate-500">
                  Simple setup with support for React, Next.js and Tailwind css.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
