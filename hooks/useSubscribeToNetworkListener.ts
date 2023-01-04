import { useEffect, useState } from "react";
import { showSuccess, showWarning } from "../api/toasts";
import { useAppDispatch, useAppSelector } from "../app/store-hooks";
import { selectGlobal, setNetwork } from "../state/global/globalsSlice";
import Moralis from "moralis-v1";
import { useChain } from "react-moralis";
import { isMobile } from "mobile-device-detect";

const useSubscribeToNetworkListener = () => {
  const dispatch = useAppDispatch();
  const global = useAppSelector(selectGlobal);
  const [isMainNet, setIsMainNet] = useState<boolean>();
  const { chainId } = useChain();
  useEffect(() => {
    const checkChainId = async () => {
      isMobile ? null : await Moralis.enableWeb3();
      await localStorage.setItem("chainId", chainId);
      if (
        chainId !== "0x1" &&
        chainId !== "main" &&
        chainId != "1" &&
        chainId !== null
      ) {
        dispatch(
          setNetwork({
            ...global.network,
            isMainnet: false,
            networkId: chainId,
          })
        );
        setIsMainNet(false);
        await localStorage.setItem("chainId", chainId);
      } else if (
        (chainId === "0x1" || chainId === "main" || chainId == "1") &&
        chainId !== null
      ) {
        dispatch(
          setNetwork({
            ...global.network,
            isMainnet: true,
            networkId: chainId,
          })
        );
        setIsMainNet(true);
      }
    };
    checkChainId();
  }, [chainId]);

  useEffect(() => {
    const saveChainId = async () => {
      await localStorage.setItem("chainId", chainId);
    };
    saveChainId();
  }, []);

  useEffect(() => {
    if (isMainNet !== undefined) {
      if (!isMainNet) {
        return showWarning("You are not on mainnet ethereum network");
      } else {
        showSuccess("You are on Ethereum Mainnet network");
      }
    }
  }, [isMainNet]);

  return isMainNet;
};

export default useSubscribeToNetworkListener;
