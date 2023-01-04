import React from "react";
import { WalletIcon } from "./Common/Icons";

declare interface IWalletProps {
  walletAddress: string;
}

const Wallet: React.FC<IWalletProps> = ({ walletAddress }): JSX.Element => {
  return (
    <div className="flex justify-center text-xs sm:text-sm items-center text-elementor-text-3 mr-2 flex-wrap">
      <WalletIcon className="mx-1 text-elementor-text-3 fill-elementor-text-3" />
      {walletAddress ? walletAddress : "Wallet not connected"}
    </div>
  );
};

export default Wallet;
