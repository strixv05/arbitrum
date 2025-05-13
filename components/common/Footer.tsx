"use client";
import React, { useEffect } from "react";
import { socialData } from "@/consts/config";
import Link from "next/link";
import ImageNext from "./ImageNext";
import { useMediaQuery } from "react-responsive";
import { usePathname, useRouter } from "next/navigation";

const Footer = (props: any) => {
  const pathName = usePathname();
  const isSm = useMediaQuery({ maxWidth: 640 });

  if (isSm && pathName !== "/") return null;

  return (
    <div className="relative flex items-center sm:justify-between justify-center w-screen bg-[#15181B]/80 border-b border-[#4f5052] h-[6.8vh] px-14 py-4 z-30">
      <div>
        <p className="text-zinc-400 text-sm sm:text-sm">
          Powered By <a href="https://zkcross.network/" target="_blank" className="text-white/80">zkCross Network</a> | Version 1.0
        </p>
      </div>
      <div className="relative sm:flex flex-row gap-3 hidden">
        {socialData.map((item: any) => (
          <Link key={item.name} href={item.url}>
            <ImageNext src={item.src} alt={item.name} className="size-8" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Footer;
