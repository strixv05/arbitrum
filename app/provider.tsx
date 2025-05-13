"use client";

import React, { PropsWithChildren } from "react";
import LoginProvider from "@/contexts/LoginContext";
import { WagmiConfig, createConfig, mainnet } from "wagmi";
import { createPublicClient, http } from "viem";
import { usePathname, useRouter } from "next/navigation";
import AuthProvider from "@/contexts/AuthContext";
import SwapProvider from "@/contexts/SwapContext";
import FiatProvider from "@/contexts/FiatContext";

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: mainnet,
    transport: http(),
  }),
});

if (typeof window !== "undefined" && localStorage.getItem("zkcross:debug") == "true") {
  console.log("##--------------Debug Mode:ON----------------##");
} else {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  console.warn = () => {};
}

export default function Provider({ children }: PropsWithChildren) {
  return (
    <WagmiConfig config={config}>
      <LoginProvider>
        <AuthProvider>
          <SwapProvider>
            <FiatProvider>{children}</FiatProvider>
          </SwapProvider>
        </AuthProvider>
      </LoginProvider>
    </WagmiConfig>
  );
}
