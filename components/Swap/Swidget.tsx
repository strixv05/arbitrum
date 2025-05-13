"use client";
import { useEffect, useState } from "react";
import ImageNext from "../common/ImageNext";
import { arbitrumList, networkCards, stringAppKeys, tokenList } from "@/consts/config";
import { useLoginContext } from "@/contexts/LoginContext";
import { useSwapContext } from "@/contexts/SwapContext";
import DotLoader from "../common/DotLoader";
import { addCommas } from "@/utils/helper";
import SelectCoin from "./SelectCoin";
import { ICoin, INetworkCard } from "@/utils/interface";
import Status from "./Status";
import SwitcherButton from "./SwitcherButton";
import SendFrom from "./SendFrom";
import ReceiveAs from "./ReceiveAs";
import TransakModal from "./TransakModal";
import { useFiatContext } from "@/contexts/FiatContext";
import AddressBox from "./AddressBox";
import AddressModal from "./AddressModal";
import SwapHeader from "./SwapHeader";
import DialogContainer from "./DialogContainer";
import { LuArrowUpDown } from "react-icons/lu";
import ConfirmPop from "./ConfirmPop";

function Swidget() {
  const [isFromCoinOpen, setIsFromCoinOpen] = useState(false);
  const [isToCoinOpen, setIsToCoinOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const { networkData } = useLoginContext();
  const { transakStatus, setTransakStatus, resetFiatStates, openFiatModal } = useFiatContext();
  const { toAddress } = useSwapContext();
  const [recipientAddress, setRecipientAddress] = useState<string>(toAddress || "");
  const [selectedTab, setSelectedTab] = useState<"convert" | "buy">("convert");
  const [buttonText, setButtonText] = useState<string>("Select Token");
  const [isConfirmPop, setIsConfirmPop] = useState<boolean>(false);
  const {
    selectedCoin,
    selectedNetwork,
    selectedToCoin,
    setSelectedNetwork,
    setSelectedCoin,
    setSelectedToCoin,
    isApproved,
    isFiatBridge,
    fromAmount,
    toAmount,
    selectedToNetwork,
    setSelectedToNetwork,
    isTypingLoading,
    isFinalStep,
    usdPriceS1,
    setIsFinalStep,
    resetSwapStates,
    isConvert,
    isTokenRelease,
    isSwapped,
    errored,
  } = useSwapContext();

  const isSameChain = selectedNetwork?.id === selectedToNetwork?.id;

  // useEffect(() => {
  //   // select arbitrum as default to swap
  //   if (selectedNetwork?.name !== "Arbitrum" && !selectedToNetwork) {
  //     setSelectedToNetwork(networkCards.find((item: INetworkCard) => item.id === 42161) as INetworkCard);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  function validationCheck() {
    if (isTypingLoading) {
      setButtonText("Loading...");
    } else if (!selectedCoin || !selectedToCoin) {
      setButtonText("Select Token");
    } else if (!fromAmount || !toAmount) {
      setButtonText("Enter Amount");
    } else if (isFiatBridge) {
      setButtonText("Buy");
    } else {
      setButtonText("Trade");
    }
  }

  function swapFields() {
    const tempFrom = selectedCoin;
    const tempTo = selectedToCoin;
    const tempFromNetwork = selectedNetwork;
    const tempToNetwork = selectedToNetwork;
    setSelectedNetwork(tempToNetwork);
    setSelectedCoin(tempTo);
    setSelectedToNetwork(tempFromNetwork);
    setSelectedToCoin(tempFrom);
  }

  useEffect(() => {
    validationCheck();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNetwork, selectedCoin, fromAmount, toAmount, selectedToCoin, selectedToNetwork, isApproved, isTypingLoading]);

  useEffect(() => {
    setSelectedNetwork(networkCards.find((item: INetworkCard) => item.id === networkData?.chainId) as INetworkCard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [networkData]);

  const toggleAddressModalClose = () => {
    setIsAddressModalOpen(!isAddressModalOpen);
  };

  return (
    <div className="bg-[#15181B]/80 backdrop-blur-sm text-white rounded-xl relative h-full w-full shadow-md overflow-y-hidden">
      <SwapHeader selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      {openFiatModal && !isFinalStep && (
        <DialogContainer setClose={() => {}} title="Transak Payment">
          <TransakModal />
        </DialogContainer>
      )}

      {isConfirmPop && (
        <DialogContainer
          setClose={() => {
            setIsConfirmPop(false);
            console.log("isapp", isApproved);
            if (isApproved) {
              setIsFinalStep(false);
              resetFiatStates();
              resetSwapStates();
            }
          }}
          confirmClose={isApproved && (isSwapped || (isSameChain && isTokenRelease))}
          title={
            errored
              ? "Transaction Failed"
              : !isApproved
              ? "Transaction Approval"
              : isConvert
              ? isSwapped || (isSameChain && isTokenRelease)
                ? "Transaction Completed"
                : "Transaction In Progress"
              : "Transaction Confirmation"
          }>
          <ConfirmPop setIsConfirmPop={setIsConfirmPop} />
        </DialogContainer>
      )}

      {isFromCoinOpen && (
        <DialogContainer setClose={() => setIsFromCoinOpen(false)} title={isFiatBridge ? "Select Currency" : "Select Token"}>
          <SelectCoin
            fromOrTo="FromSelection"
            selectedNetwork={selectedNetwork}
            setIsCoinOpen={setIsFromCoinOpen}
            setSelectedCoin={setSelectedCoin}
            setSelectedNetwork={setSelectedNetwork}
            setSelectedToNetwork={setSelectedToNetwork}
            title="Send From"
          />
        </DialogContainer>
      )}
      {isToCoinOpen && (
        <DialogContainer setClose={() => setIsToCoinOpen(false)} title="Select Token">
          <SelectCoin
            fromOrTo="ToSelection"
            selectedNetwork={selectedToNetwork}
            setIsCoinOpen={setIsToCoinOpen}
            setSelectedCoin={setSelectedToCoin}
            setSelectedNetwork={setSelectedToNetwork}
            setSelectedToNetwork={setSelectedToNetwork}
            title="Receive As"
          />
        </DialogContainer>
      )}
      {isFinalStep && (
        <DialogContainer
          setClose={() => {
            setIsConfirmPop(false);
            setIsFinalStep(false);
            resetFiatStates();
            resetSwapStates();
          }}
          title={
            errored
              ? "Transaction Failed"
              : isConvert && (!isApproved || !isSwapped || (!isSameChain && !isTokenRelease))
              ? "Transaction in Progress"
              : "Transaction Completed"
          }
          confirmClose={isConvert && (!isApproved || !isSwapped || (!isSameChain && !isTokenRelease))}>
          <Status setIsConfirmPop={setIsConfirmPop} />
        </DialogContainer>
      )}
      <div className="px-8">
        <SendFrom setIsFromCoinOpen={setIsFromCoinOpen} />
        {selectedNetwork?.name != "Fiat" ? (
          <div className="flex justify-center mx-auto -my-4 z-10">
            <button
              className="bg-[#0052ff] rounded-full p-2.5 filter hover:brightness-125 transition-all origin-center"
              onClick={swapFields}>
              <LuArrowUpDown className="text-lg text-white text-prime-text-100 size-5" />
            </button>
          </div>
        ) : (
          <div className="h-2"></div>
        )}
        <ReceiveAs setIsToCoinOpen={setIsToCoinOpen} />
        {/* <AddressBox onToggle={toggleAddressModalClose} isOpen={isAddressModalOpen} setRecipientAddress={setRecipientAddress} /> */}
        <SwitcherButton buttonText={buttonText} setIsConfirmPop={setIsConfirmPop} />
        {/* <AddressModal
            isModalOpen={isAddressModalOpen}
            onClose={toggleAddressModalClose}
            recipientAddress={recipientAddress}
            setRecipientAddress={setRecipientAddress}
          /> */}
      </div>
    </div>
  );
}

export default Swidget;
