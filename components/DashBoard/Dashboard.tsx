/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Login from "./Login";
import { useLoginContext } from "@/contexts/LoginContext";
import Swap from "../Swap/Swap";
import GradientBg from "./GradientBg";
import ImageNext from "../common/ImageNext";
import WelcomeScreen from "./WelcomeScreen";
import DialogToast from "../common/DialogToast";
import { toastDialog } from "@/utils/toast";
import { getCoinChange } from "@/services/apiCached";
import MainWrapper from "./MainWrapper";
import Footer from "../common/Footer";
import BottomTab from "../common/BottomTab";

const Dashboard = () => {
  const { address } = useLoginContext();

  // Check for default wallets setters to notify user
  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      const walletField = Object.keys(window.ethereum).find((key) => key.includes("is") && key.includes("Wallet"));
      const walletName = walletField?.toString().replace("is", "").replace("Wallet", "");

      if (window.ethereum?.isMetaMask && !window.ethereum.hasOwnProperty("_metamask") && walletField) {
        toastDialog(<DialogToast />, {
          heading: `${walletName ? walletName : "A"} Wallet might be set as default wallet.`,
          info: "To unset this, go to Wallet settings.",
          content: "[ Preferences/Settings > Set as Default Wallet, turn to OFF ]",
        });
      } else if (window.ethereum?.isMetaMask === false && !window.ethereum.hasOwnProperty("_metamask")) {
        toastDialog(<DialogToast />, {
          heading: `${walletName ? walletName : "A"} wallet might interfere with MetaMask. Please disable it to use Metamask wallet.`,
          info: "To disable it, go to browser extension settings.",
          content: "[ Browser Extension > Select the wallet > Disable extension ]",
        });
      }
    }
    // getCoinChange();
  }, []);

  return (
    <>
      <div className={`relative flex flex-row ${address ? "h-[calc(100vh-6.8vh)]" : "h-screen"} w-screen`}>
        {address ? (
          <MainWrapper />
        ) : (
          <>
            {/* <div className=" relative overflow-x-hidden overflow-y-hidden h-full w-[50%] max-w-[50%] sm:flex hidden  justify-center items-center ">
            <GradientBg />
            <Image src="/Logo.png" alt="Logo" width={190} height={190} className="z-20" />
          </div> */}

            {/* Welcome for mobile screen */}
            <WelcomeScreen />
            {/* <div className="absolute w-full h-full z-10 bg-black">
              <img src="/common/partisiaBg.jpg" loading="eager" className="opacity-100 w-full h-full" alt="background-image" />
            </div> */}

            <div className="h-full sm:w-[min(80%,1024px)] w-[90%] flex z-10 m-auto">
              <div className="relative sm:h-[max(60%,700px)] w-full m-auto sm:p-6 sm:gap-8 sm:shadow-[0px_0px_0px_9999px_rgba(0,0,0,0.4)] flex sm:flex-row flex-col justify-between items-center sm:bg-none bg-[linear-gradient(0deg,rgba(5,5,5,0.8)_0%,rgba(41,41,41,0.6)_100%)] border-[1px] sm:border-zinc-900/20 border-white/20 rounded-3xl bg-opacity-10 overflow-hidden">
                {/* <button className="absolute top-6 right-6 text-white/50 z-20 hover:text-white py-1 rounded-xl text-xs text-opacity-80 transition-all">
                  Skip
                </button> */}
                <div className="sm:h-full w-[50%]  sm:flex hidden flex-col bg-transparent rounded-2xl !!bg-[url('/partisiaBg.jpg')] bg-[position:30%] bg-[size:cover] bg-[repeat:no-repeat] p-5 relative z-10 after:content-[''] after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded-2xl after:shadow-[0px_0px_0px_9999px_rgba(0,0,0,0.68)]">
                  <div>
                    <Image src="/common/Branding.png" alt="Logo" width={140} height={34} className="z-20" />
                  </div>
                  <h1 className="text-white sm:text-3xl font-bold mt-auto">
                    Fully Abstracted <br /> Cross-chain DEX <br /> on Arbitrum
                  </h1>
                  <p className="text-sm text-white mt-6">
                    Stay in control of your assets, security and <br /> privacy with every trade.
                  </p>
                </div>
                <Login />
              </div>
            </div>

            {/* <div className="relative h-full w-full flex">
            <div className="absolute w-full h-full z-10">
              <ImageNext src="/home/DashBg.png" className="object-cover w-full h-full" alt="background" isBg />
            </div>
            <div className="size-full py-10 flex justify-center items-center ">
              <Login />
            </div>
          </div> */}
          </>
        )}
      </div>
      {address && (
        <>
          <Footer />
          <BottomTab />
        </>
      )}
    </>
  );
};

export default Dashboard;
