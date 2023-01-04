import { useEffect, useState } from "react";
import { showError } from "../api/toasts";

const useMainnetVersion = () => {
  const [isMainnet, setIsMainNet] = useState<boolean>();
  const chainId = localStorage.getItem("chainId");
  useEffect(() => {
    if (
      chainId !== "0x1" &&
      chainId !== "main" &&
      chainId != "1" &&
      process.env.NEXT_PUBLIC_DEV_MODE === "false"
    ) {
      showError(
        "You are not on mainnet. Please switch to Ethereum mainnet or reaload the page"
      );
      setIsMainNet(true);
    } else {
      setIsMainNet(false);
    }
  }, [chainId]);
  return isMainnet;
};

export default useMainnetVersion;
