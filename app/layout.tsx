import type { Metadata } from "next";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.min.css";
import Provider from "./provider";

export const metadata: Metadata = {
  title: "zkCrossDEX Arbitrum",
  description: "Fully Abstracted Cross-chain DEX on Arbitrum",
  icons: {
    icon: "/Logo.png",
  },
  keywords: ["Arbitrum", "Blockchain", "DeFi", "Cross-chain Swap", "Crypto"],
  openGraph: {
    title: "zkCrossDEX Arbitrum",
    url: "https://arbitrum.zkcross.exchange/",
    description: "Fully Abstracted Cross-chain DEX on Arbitrum",
    images: "https://zkcross.nyc3.cdn.digitaloceanspaces.com/Arbitrum%20Link%20Preview.png",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    site: "https://arbitrum.zkcross.exchange/",
    title: "zkCrossDEX Arbitrum",
    description: "Fully Abstracted Cross-chain DEX on Arbitrum",
    images: "https://zkcross.nyc3.cdn.digitaloceanspaces.com/Arbitrum%20Link%20Preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" href="/Logo.png" />
      </head>
      <body className="w-screen h-screen bg-black bg-[url('/common/partisiaBg.jpg'),linear-gradient(135deg,rgba(43,12,53,1)_0%,rgba(83,34,98,1)_36%,rgba(43,67,141,1)_63%,rgba(8,34,52,1)_100%)] bg-cover bg-no-repeat">
        <Provider>{children}</Provider>
        <ToastContainer
          position="top-right"
          theme="dark"
          hideProgressBar
          newestOnTop
          toastStyle={{
            background: "rgba(30, 30, 30, 0.5)",
            backdropFilter: "blur(30px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "0.4rem",
            top: "70px",
          }}
        />
      </body>
    </html>
  );
}
