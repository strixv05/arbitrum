"use effect";

import React, { ButtonHTMLAttributes, useMemo, useState } from "react";
import Image from "next/image";
import WalletBtn from "../Swap/WalletBtn";
import { useLoginContext } from "@/contexts/LoginContext";
import { IoMenuOutline } from "react-icons/io5";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import ImageNext from "./ImageNext";
import { chainsLogo, headerRoutes, socialData } from "@/consts/config";
import { formatAddress } from "@/utils/helper";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import MenuBtn from "../Swap/MenuBtn";
import CrossBtn from "../Swap/CrossBtn";
import BalanceBtn from "../Swap/BalanceBtn";
import { TRoute } from "@/utils/interface";

const NavButton = (props: ButtonHTMLAttributes<HTMLButtonElement> & { isActive?: boolean; children: React.ReactNode }) => {
  const { children, isActive, className, ...otherProps } = props;
  return (
    <button
      className={clsx(
        "border-prime-zinc-300 relative border hover:bg-zinc-400/30 duration-200 transition-all text-white w-full flex items-center px-5 py-3.5 rounded gap-x-4",
        isActive &&
          "before:contents-[''] before:absolute before:left-0 before:top-0 before:w-2 before:h-full before:rounded-s-[0.23rem] before:bg-prime-blue-100 border-zinc-400/80",
        className
      )}
      {...otherProps}>
      {props.children}
    </button>
  );
};

const Header = () => {
  const { address, networkData, activeTab, setActiveTab } = useLoginContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathName = usePathname();
  const formattedAddress = formatAddress(address);
  const isSwidge = pathName === "/swidge",
    isWallet = pathName === "/wallet";
  const router = useRouter();
  const isNotMainRoute = isSwidge || isWallet;
  const { crossPower } = useLoginContext();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* Main header  */}
      <header className="relative w-full bg-[#15181B]/80 border-b border-[#4f5052] h-[4.8rem] lg:px-14 sm:px-7 px-4 flex flex-row justify-between items-center z-50">
        <div className="flex flex-row justify-center items-center space-x-10 w-auto">
          <div>
            <Image src="/common/Branding.png" alt="Branding Logo" width={130} height={130} />
          </div>
          <nav className="hidden md:flex gap-2">
            {headerRoutes.map((item) => (
              <div className={clsx("relative text-sm xl:text-base ", !item.isActive && "group")} key={item.name}>
                <button
                  disabled={!item.isActive}
                  className={clsx("px-1 md:px-3 ", activeTab === item.id ? "text-white" : "text-prime-zinc-50/70")}
                  onClick={() => setActiveTab(item.id)}>
                  {item.name}
                </button>
                <div className="border-2 hidden text-white border-prime-zinc-200/50 z-[100] min-w-[120px] text-center rounded bg-prime-background absolute top-10 left-[50%] translate-x-[-50%] group-hover:block py-3 px-3">
                  Coming Soon
                </div>
              </div>
            ))}
          </nav>
        </div>
        {isNotMainRoute ? (
          <button onClick={toggleMenu}>
            <IoMenuOutline size="2.8rem" />
          </button>
        ) : (
          <div className="flex flex-row space-x-4 w-auto items-center">
            {/* <CrossBtn /> */}
            <BalanceBtn />
            <WalletBtn address={address as string} chain={networkData?.chainId!} />
            <MenuBtn />
          </div>
        )}
      </header>
      {/* Side-drawer for mobile */}
      <Drawer open={isMenuOpen} onClose={toggleMenu} direction="left" duration={300} zIndex={1000} size={"320px"}>
        <div className="fixed flex flex-col h-screen top-0 left-0 bg-prime-background-300 w-full border-white/30 border-2 py-0 px-7 gap-3">
          <a href={"/"}>
            <Image src="/common/Branding.png" alt="Branding Logo" width={140} height={140} className="-translate-x-7" />
          </a>
          <div className="bg-prime-blue-100 text-white w-full flex items-center px-4 py-3.5 rounded gap-x-4 group">
            <ImageNext src={chainsLogo[networkData?.chainId as string]} className="rounded-full h-5 w-5" alt="blockchain-icon" />
            <span>{formattedAddress}</span>
          </div>
          <BalanceBtn isCompact />

          {/* <div className="bg-prime-blue-100 text-white w-full flex items-center px-4 py-3.5 rounded gap-x-4 group mt-1">
            <ImageNext src="/common/Whitelogo.png" className="size-5 object-contain" alt="cross-power" />
            <p className="text-white text-base flex mr-auto">
              {parseFloat(String(crossPower)).toFixed(2)} <span className="text-[0.6875rem] ml-1 translate-y-[1px]">CP</span>
            </p>
          </div> */}

          <hr className="border-prime-zinc-300 border my-2" />
          <NavButton
            isActive={isSwidge}
            onClick={() => {
              toggleMenu();
              router.push("/swidge");
            }}>
            Swidge
          </NavButton>
          <NavButton
            isActive={isWallet}
            onClick={() => {
              toggleMenu();
              router.push("/wallet");
            }}>
            Wallet
          </NavButton>

          <hr className="border-prime-zinc-300 border my-2" />
          <NavButton>Profile</NavButton>
          <NavButton>Copy Address</NavButton>
          <NavButton
            onClick={() => {
              toggleMenu();
              window.open("https://zkCross.network/help-center", "_blank");
            }}>
            Contact Support
          </NavButton>
          <NavButton onClick={() => window.open("/", "_self")}>Logout</NavButton>
          <div className="relative flex flex-row gap-2.5 mt-auto mx-auto mb-6">
            {socialData.map((item: any) => (
              <Link key={item.name} href={item.url}>
                <ImageNext src={item.src} alt={item.name} className="size-9" />
              </Link>
            ))}
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Header;
