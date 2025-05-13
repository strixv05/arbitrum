"use client";
import { Dispatch, EffectCallback, ReactNode, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import { ConnectorNotFoundError } from "wagmi";
import { ProviderRpcError, RpcError } from "viem";
import { initializeConnector } from "@web3-react/core";
import { TrustWallet } from "@trustwallet/web3-react-trust-wallet";
import { CoinbaseWalletConnector } from "wagmi/connectors/coinbaseWallet";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { toastError, toastInfo } from "@/utils/toast";
import { INetworkData, IWalletProp, MetaSignatureError, TWalletsList } from "@/utils/interface";
import { sleepTimer } from "@/utils/helper";
import useEffectAsync from "@/hooks/useEffectAsync";
import { ethers } from "ethers";
import { createUser, loginUser } from "@/services/userService";
import { AxiosError } from "axios";
import useIsFirstEffect from "@/hooks/useIsFirstEffect";
import { chainNetworkParams, headerRoutes } from "@/consts/config";
import { getCrossPower } from "@/services/apiCross";
import { createWalletClient, custom } from 'viem'
import { mainnet } from 'viem/chains'

interface ILoginState {
  selectedWallet: IWalletProp | null;
  setSelectedWallet: (prop: any) => void;
  connectWallet: (walletName: string) => Promise<void>;
  currentStep: number;
  setCurrentStep: (prop: number) => void;
  loading: boolean;
  setLoading: (prop: boolean) => void;
  address: string | null;
  steps: string[];
  setSteps: Dispatch<SetStateAction<string[]>>;
  switchNetwork: (prop: number, callback?: EffectCallback) => Promise<boolean | undefined>;
  currentProvider: any;
  networkData: INetworkData | null;
  setNetworkData: Dispatch<SetStateAction<INetworkData | null>>;
  setAddress: (prop: string | null) => void;
  crossPower: number;
  activeTab: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  trigger: number;
  triggerAPIs: () => void;
}

let ethereum: any = null;
if (typeof window !== "undefined") {
  ethereum = window?.ethereum;
}

const LoginContext = createContext<ILoginState>({} as ILoginState);

export function useLoginContext() {
  return useContext(LoginContext);
}

export default function LoginProvider({ children }: { children: ReactNode }) {
  const [selectedWallet, setSelectedWallet] = useState<IWalletProp | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [currentConnector, setCurrentConnector] = useState<TWalletsList>("metamask");
  const [currentProvider, setCurrentProvider] = useState<any>(ethereum || null);
  const [trustWallet] = initializeConnector<TrustWallet>((actions) => new TrustWallet({ actions }));
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [steps, setSteps] = useState<string[]>(["Select a wallet", "Create or connect wallet"]);
  const [networkData, setNetworkData] = useState<INetworkData | null>(null);
  const [crossPower, setCrossPower] = useState<number>(0.0);
  const [activeTab, setActiveTab] = useState<string>(headerRoutes[0]?.id);
  const [trigger, setTrigger] = useState<number>(0);
  const isFirstLoad = useIsFirstEffect();
  const client = createWalletClient({
  chain: mainnet,
  transport: custom(ethereum || typeof window !== "undefined" && window?.ethereum)
})

  const triggerAPIs = () => setTrigger(trigger + 1);

  const connectMetamask = async () => {
    try {
      // const metamaskConnector = new MetaMaskConnector();
      // const { account } = await metamaskConnector.connect({ chainId: 42161 });

      let justProvider = ethereum?.providers?.find((e: any) => e?.isMetaMask) || ethereum;
      const [address] = await client.requestAddresses()
      await sleepTimer(1000);
      // await getSignature(justProvider, account);

      setAddress(address);
      setCurrentConnector("metamask");
      setCurrentProvider(justProvider);
      setLoading(false);
    } catch (error) {
      // console.log("metaee", error);
      if (error instanceof ConnectorNotFoundError) {
        toastInfo("Request installation");
        await sleepTimer(1500);
        window.open(`https://metamask.io/download/`);
      } else if (error?.toString().includes("ChainNotConfiguredForConnectorError")) {
        // console.log("er", error)
        let switched = await switchNetwork(42161);
        if (switched) await connectMetamask();
      } else if (error instanceof RpcError) toastError(error?.shortMessage);
      else if (error instanceof AxiosError) toastError(error?.response?.data?.message?.toUpperCase() || error?.message);
      else if ((error as any)?.message) toastError((error as any)?.message);
      else toastError("Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
      setSteps(["Select a wallet", "Create or connect wallet"]);
    }
  };

  const connectTrustWallet = async () => {
    try {
      await trustWallet.activate(42161);
      const currProvider = trustWallet.provider!;

      let justProvider = currProvider || ethereum?.providers.find((e: any) => e?.isTrust) || ethereum;
      await sleepTimer(1000);
      let account = justProvider?.selectedAddress || ((await justProvider?.request({ method: "eth_accounts" })) as string[])[0];
      await getSignature(justProvider, account);

      setCurrentProvider(justProvider);
      setAddress(account);
      setLoading(false);
      setCurrentConnector("trust");
    } catch (error) {
      toastError(error instanceof Error ? error?.message : "Something went wrong");
      console.log(error);
    } finally {
      setLoading(false);
      setSteps(["Select a wallet", "Create or connect wallet"]);
    }
  };

  const connectCoinbase = async () => {
    try {
      const coinbaseConnector = new CoinbaseWalletConnector({
        options: {
          appName: "zkCrossDEX",
        },
      });
      const { account } = await coinbaseConnector.connect({ chainId: 42161 });
      let justProvider = ethereum?.providers?.find((e: any) => e?.isCoinbaseWallet) || ethereum;
      await sleepTimer(1000);
      await getSignature(justProvider, account);

      setCurrentProvider(justProvider);
      setCurrentConnector("coinbase");
      setAddress(account);
      setLoading(false);
    } catch (error) {
      toastError(error instanceof Error ? error?.message : "Something went wrong");
      setLoading(false);
      setSteps(["Select a wallet", "Create or connect wallet"]);
    }
  };

  const connectWalletConnect = async () => {
    try {
      const coinbaseConnector = new WalletConnectConnector({
        options: {
          projectId: "1e4b6054faba3bc73e6fa5945a3b3a61",
        },
      });
      const { account } = await coinbaseConnector.connect({ chainId: 42161 });
      let justProvider = ethereum?.providers?.find((e: any) => e?.isWalletConnect) || ethereum;
      await sleepTimer(1000);
      await getSignature(justProvider, account);

      setCurrentProvider(justProvider);
      setCurrentConnector("walletConnect");
      setAddress(account);
      setLoading(false);
    } catch (error) {
      toastError(error instanceof Error ? error?.message : "Something went wrong");
      setLoading(false);
      setSteps(["Select a wallet", "Create or connect wallet"]);
    }
  };

  //Signature for User UPI
  const getSignature = async (provider: any, address: string): Promise<void> => {
    const timestamp = Date.now();
    const message = "I am signing in to zkCross Network";
    const web3Provider = new ethers.providers.Web3Provider(provider);
    const Signer = await web3Provider.getSigner();
    const signature = await Signer.signMessage(message + " " + timestamp);
    try {
      await loginUser({
        wallet: [{ signature, address, timestamp }],
        chainType: "EVM",
      });
    } catch (error) {
      console.log("metaaaee", error);
      if ((error as AxiosError).code === "ERR_BAD_RESPONSE") toastError("Server is down. Please try again later.");
      if ((error as AxiosError).code === "ERR_NETWORK") toastError("Server CORS Error !");
      else toastError("Something went wrong");
      throw error;
    }

    // const { data } = await createUser({
    //   wallet: [{ signature, address: address as string, timestamp }],
    // });
  };

  const connectWallet = async (walletName: string) => {
    setLoading(true);
    switch (walletName) {
      case "Metamask":
        await connectMetamask();
        break;
      case "Trust Wallet":
        await connectTrustWallet();
        break;
      case "Wallet Connect":
        await connectWalletConnect();
        break;
      case "Coinbase Wallet":
        await connectCoinbase();
        break;
      default:
        toastError("Currently not supported!");
        setLoading(false);
        break;
    }
  };

  /**
   * Function to switch network on current injected provider
   * @param chainId chainId in number format
   * @returns void
   */
  const switchNetwork = async (chainId: number, callback?: EffectCallback) => {
    if (!chainId) return;
    try {
      await currentProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${Number(chainId).toString(16)}` }],
      });
      return true;
    } catch (e) {
      if ((e as any)?.code === 4001) {
        toastError("User rejected switching chains.");
      } else if ((e as any)?.code === 4902) {
        toastError("Chain not added to wallet. Initiating chain setup...", { autoClose: 2000 });
        await sleepTimer(1000);
        await addChainNetwork(chainId);
      } else if (e instanceof ProviderRpcError) {
        toastError(e?.message);
      } else {
        toastError("Something went wrong!");
        console.error(e);
      }
    } finally {
      callback?.();
      return false;
    }
  };

  const addChainNetwork = async (chainId: number) => {
    if (!chainId) return;
    try {
      await currentProvider.request({
        method: "wallet_addEthereumChain",
        params: [chainNetworkParams[chainId]], // getting params from config
      });
    } catch (e) {
      if (e instanceof ProviderRpcError && e?.code === 4001) {
        toastError("User rejected switching chains.");
      } else if (e instanceof ProviderRpcError) {
        toastError(e?.message);
      } else {
        toastError("Something went wrong!");
        console.error(e);
      }
    }
  };

  const loadWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(currentProvider);
      const accounts = await provider.send("eth_requestAccounts", []);
      const { chainId } = await provider.getNetwork();
      const network = {
        account: accounts[0],
        provider: provider,
        chainId: chainId,
      };
      setNetworkData(network);
      return network;
    } catch (err) {}
  };

  useEffectAsync(async () => {
    if (isFirstLoad) return;

    // Run first time on every connection
    await loadWallet();

    if (!currentProvider && !address) return;

    currentProvider.on("chainChanged", (id: any) => {
      let chainId: any = id; //as CurrentProvider is giving hexDecimal network id
      loadWallet().then((res: any) => {
        console.log("Wallet Info Loaded", res);
      });
    });
  }, [address, currentProvider]);

  useEffectAsync(async () => {
    if (isFirstLoad || !address) return;
    try {
      const cross = await getCrossPower(address);
      setCrossPower(cross);
    } catch (error) {
      console.error(error);
    }
  }, [address, trigger]);

  return (
    <LoginContext.Provider
      value={{
        selectedWallet,
        setSelectedWallet,
        connectWallet,
        currentStep,
        setCurrentStep,
        loading,
        setLoading,
        address,
        setSteps,
        steps,
        switchNetwork,
        networkData,
        setNetworkData,
        currentProvider,
        setAddress,
        crossPower,
        activeTab,
        setActiveTab,
        trigger,
        triggerAPIs,
      }}>
      {children}
    </LoginContext.Provider>
  );
}
