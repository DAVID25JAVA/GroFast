"use client";

import { List, Plus, Truck } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SellerSidebar() {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Add Products", path: "/seller", icon: <Plus /> },
    { name: "Products List", path: "/seller/products-list", icon: <List /> },
    { name: "Orders", path: "/seller/orders", icon: <Truck /> },
  ];

  return (
    <div className="md:w-64 w-16 border-r min-h-screen text-base border-gray-300 pt-4 flex flex-col transition-all duration-300 bg-white">
      {sidebarLinks.map((item, index) => {
        const isActive = pathname === item.path;

        return (
          <Link
            href={item.path}
            key={index}
            className={`flex items-center py-3 px-4 gap-3 transition-colors
              ${
                isActive
                  ? "border-r-4 md:border-r-[6px]  bg-primary border-primary text-white"
                  : "hover:bg-gray-100/90 border-white text-gray-700"
              }`}
          >
            {item.icon}
            <p className="md:block hidden text-center">{item.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
