import React from "react";
import { assets, footerLinks } from "../../../public/assets";
import Link from "next/link";

function Footer() {
  return (
    <div className="bg-green-50">
      <div>
        <div className="px-6 md:px-16 lg:px-24 xl:px-32">
          <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b   text-gray-500">
            <div>
              <img
                className="w-34 md:w-32"
                src={assets?.logo?.src}
                alt="dummyLogoColored"
              />
              <p className="max-w-[410px] mt-6">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rerum
                unde quaerat eveniet cumque accusamus atque qui error quo enim
                fugiat?
              </p>
            </div>
            <div className="flex flex-wrap justify-between w-full md:w-[45%] gap-5">
              {footerLinks.map((section, index) => (
                <div key={index}>
                  <h3 className="font-semibold text-base text-gray-900 md:mb-5 mb-2">
                    {section.title}
                  </h3>
                  <div className="text-sm space-y-1">
                    {section.links.map((link, i) => (
                      <Link href={link?.url} key={i} className="flex">
                        {link?.text}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="py-4 text-center text-sm md:text-base text-gray-500/80">
            Copyright 2025 © <a target="blank" href="https://david-portfolio-o7yw.vercel.app/">David.dev</a> All
            Right Reserved.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
