"use client";

import React, { useState } from "react";
import Stepper from "../common/Stepper";
import WalletConnect from "../common/WalletConnect";
import { useLoginContext } from "@/contexts/LoginContext";
import Loader from "../common/Loader";
import ImageNext from "../common/ImageNext";

const Login = () => {
  const { currentStep, setCurrentStep } = useLoginContext();
  const { loading, setLoading } = useLoginContext();
  const { selectedWallet, setSelectedWallet } = useLoginContext();
  const { connectWallet } = useLoginContext();
  const { setSteps } = useLoginContext();
  let totalSteps = 2;
  const backStep = () => {
    setCurrentStep(0);
    setSelectedWallet(null);
    setLoading(false);
  };

  return (
    <div className="flex flex-col mx-auto sm:pt-16 pt-10 sm:pb-0 pb-16 w-[21.875rem] h-full z-20 rounded-md">
      {/* Header */}
      <div className="relative flex flex-col justify-center items-center w-full h-[8.2rem] shrink-0 px-3 py-6 text-prime-zinc">
        <p className="font-semibold text-[1.375rem] mb-1">Welcome!</p>
        <p className="font-normal text-center text-sm md:text-[0.6rem] lg:text-base text-prime-zinc-50">
          Connect your Arbitrum wallet to proceed
        </p>
      </div>
      {/* {selectedWallet && (
        <div className="relative flex  flex-row space-x-16  justify-start items-center w-full h-[0.938rem] px-8  border-b-[1px]  border-b-prime-zinc-100 py-[1.5rem]">
          <button className="cursor-pointer" onClick={backStep}>
            <ImageNext src="/common/LeftArrow.png" className="size-8 font-semibold" alt="Back" />
          </button>
          <div className=" flex flex-row space-x-2 justify-center items-center">
            <ImageNext src={selectedWallet.image} className="size-6" alt={selectedWallet.name} />
            <p className="text-white text-sm font-normal">{selectedWallet.name}</p>
          </div>
        </div>
      )} */}
      {/* Connect Wallet Section */}
      <div className="relative w-full h-full flex flex-col space-y-7 items-center py-7">
        {/* <Stepper currentStep={currentStep} numberOfSteps={totalSteps} /> */}
        {currentStep == 0 ? (
          <WalletConnect setCurrentStep={setCurrentStep} />
        ) : !loading ? (
          <div className="flex flex-col space-y-4 text-xs font-normal text-prime-zinc">
            <a
              href={selectedWallet?.url}
              rel="noopener noreferrer"
              target="_blank"
              className="w-[19.5rem] h-[3.3rem] border border-prime-zinc-100 rounded-md px-4 flex items-center hover:bg-prime-zinc-200">
              Create a new wallet
            </a>
            <button
              className="w-[19.5rem] h-[3.3rem] border border-prime-zinc-100 rounded-md px-4 flex items-center hover:bg-prime-zinc-200"
              onClick={async () => {
                setLoading(true);
                setSteps(["Select a wallet", "Detecting wallet"]);
                // await connectWallet();
              }}>
              Connect existing wallet
            </button>
          </div>
        ) : (
          <Loader />
        )}
      </div>
      <div className="mt-auto">
        <div className="flex items-center justify-center text-xs flex-col">
          <a
            href="https://zkcross.network"
            rel="noopener noreferrer"
            target="_blank"
            className="w-full text-white font-semibold text-center text-nowrap">
            <span className="text-white/70 font-normal">Powered by </span>
            zkCross Network
          </a>
          {/* <hr className="h-4 w-[1px] bg-[#5a5a5a] border-none" /> */}
          {/* <span className="text-white/70 text-nowrap text-xs">Version V1.0</span> */}
          {/* {process.env.NEXT_PUBLIC_BUILD_TIME ? (
          <div className="invisible select-none">
            <span className="text-nowrap">{process.env.NEXT_PUBLIC_BUILD_TIME}</span>
          </div>
        ) : (
          ""
        )} */}
        </div>
      </div>
    </div>
  );
};

export default Login;
