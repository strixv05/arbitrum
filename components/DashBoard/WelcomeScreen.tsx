"use client";
import Image from "next/image";
import GradientBg from "./GradientBg";
import { useState } from "react";

export default function WelcomeScreen() {
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed xs:hidden overflow-x-hidden overflow-y-hidden h-full w-full sm:hidden flex justify-center items-center !z-[1001] bg-black flex-col">
      <GradientBg />
      <Image src="/Logo.png" alt="Logo" width={190} height={190} className="z-20 my-[40%]" />
      <button
        onClick={() => setIsOpen(false)}
        className="bg-prime-blue-100 text-white w-48 text-center text-base mx-10 px-4 py-3.5 rounded z-[1001]"
      >
        Use Arbitrum
      </button>
    </div>
  );
}
