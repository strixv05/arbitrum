"use client";
import Overview from "@/components/Swap/Overview";
import Header from "@/components/common/Header";
import { useLoginContext } from "@/contexts/LoginContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useMediaQuery } from "react-responsive";

function Wallet() {
  const router = useRouter();
  const isLg = useMediaQuery({ maxWidth: 1024 });

  useEffect(() => {
    if (!isLg) router.push("/");
  }, [isLg, router]);

  return (
    <div className="relative flex flex-row ##h-[calc(100vh-6.8vh)] h-screen w-screen bg-black">
      <div className="relative flex flex-col h-full w-full items-center justify-center bg-black">
        <Header />
        <div
          className={`w-full h-full overflow-y-auto lg:overflow-y-hidden^^ lg:h-full flex-1 flex flex-row lg:px-14 sm:px-7 px-4 py-3 gap-8 justify-center`}
        >
          <Overview />
        </div>
      </div>
    </div>
  );
}

export default Wallet;
