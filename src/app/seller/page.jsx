"use client";
import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUser } from "@/context/userContext";
import { useRouter } from "next/navigation";

function page() {
  const pathName = usePathname();
  const { isSeller } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (pathName == "/seller" && !isSeller) {
      router.push("/seller/login");
        return;
    }
  }, [pathName, isSeller]);

  return <div className="py-36">page</div>;
}

export default page;
