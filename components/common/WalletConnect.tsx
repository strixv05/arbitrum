/* eslint-disable @next/next/no-img-element */
"use client";
import { wallets } from "@/consts/config";
import { useLoginContext } from "@/contexts/LoginContext";
import ImageNext from "./ImageNext";
import clsx from "clsx";
import Loader from "./Loader";

const WalletConnect = ({ setCurrentStep }: { setCurrentStep: any }) => {
  const { connectWallet, setSelectedWallet, selectedWallet, loading } = useLoginContext();

  const onSelectWallet = (item: { name: string; image: string; url: string }) => {
    setSelectedWallet(item);
    // setCurrentStep(1);
    connectWallet(item?.name);
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      {wallets.map((item, index) => (
        <button
          key={index}
          className={clsx(
            "relative size-[114px] flex flex-col rounded-xl gap-y-3 px-2 justify-center items-center transition-all duration-300 border border-prime-zinc-100 hover:bg-white/10 overflow-hidden"
          )}
          disabled={loading}
          onClick={() => onSelectWallet(item)}>
          {loading && (
            <div className="absolute bg-black/40 w-full h-full content-end z-10">
              {selectedWallet?.name === item.name && (
                <div className="mt-auto flex items-center gap-2 justify-center text-xs bg-zinc-600 py-3 px-3">
                  <img src="/trx/Loading.png" alt="transaction-in-progress" className="size-3 object-contain animate-slow" />
                  Connecting...
                </div>
              )}
            </div>
          )}
          <ImageNext src={item.image} className="size-[48px]" alt={item.name} />
          <p className="text-white text-xs font-normal">{item.name}</p>
        </button>
      ))}
    </div>
  );
};

export default WalletConnect;
