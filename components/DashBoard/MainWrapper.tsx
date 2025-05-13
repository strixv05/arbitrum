import { useLoginContext } from "@/contexts/LoginContext";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "../common/Header";
import { headerRoutes } from "@/consts/config";
import Swap from "../Swap/Swap";
import HelpCenter from "../HelpCenter/HelpCenter";
import { IRouter, IRouterKey } from "@/utils/interface";
import useModal from "@/hooks/useModal";

export const Router: { [key: IRouterKey]: ReactNode } = {
  trade: <Swap />,
  "help-center": <HelpCenter />,
};

const MainWrapper = () => {
  // const [isModalOpen, setIsModalOpen, closeModal] = useModal("zkcross-arbt-welcome-modal");
  const { activeTab } = useLoginContext();

  return (
    <div className="relative flex flex-col h-full w-full items-center justify-center bg-black!">
      <Header />
      {Router[activeTab]}
      {/* <FirstTimerDialog isModalOpen={isModalOpen} onCloseModal={closeModal}/> */}
    </div>
  );
};
export default MainWrapper;
