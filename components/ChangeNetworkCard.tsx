import { isMobile } from "mobile-device-detect";
import React, { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";

const ChangeNetworkCard: React.FC = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const { switchNetwork } = useChain();
  const { logout } = useMoralis();
  const disconnectWallet = async () => {
    localStorage.removeItem("STARK_PUBLIC_KEY");
    await logout();
  };
  useEffect(() => {
    isMobile ? setMobileView(true) : setMobileView(false);
  }, [isMobile]);
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full z-30">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#11131C] z-40 backdrop-blur-none w-1/2 min-h-[50%] min-w-[75%] p-5 h-auto flex justify-center items-center flex-col gap-3 rounded-xl border-2 border-[#6EC1E4]">
        <div
          className={`${
            mobileView
              ? "hidden"
              : "flex flex-col gap-3 justify-center items-center"
          }`}
        >
          <p className="max-w-[600px] font-display text-xl">
            You are currently using testnet network. Please change it to
            Ethereum mainnet by clicking button below.
          </p>
          <button
            onClick={() => switchNetwork("0x1")}
            className="max-w-[400px] duration-300 z-10 text-md tracking-widest bg-[#3E6A86] px-2 py-1 rounded-sm font-display font-bold text-black text-center
          disabled:cursor-not-allowed hover:bg-elementor-text-3 disabled:hover:text-black disabled:opacity-25 disabled:hover:bg-[#3E6A86]"
          >
            Change your network to Ethereum
          </button>
        </div>
        <p
          className={`${
            mobileView ? "flex" : "hidden"
          } max-w-[600px] font-display text-xl`}
        >
          You are currently using testnet network. Please change it to Ethereum
          mainnet in your provider
        </p>
        <button
          onClick={() => disconnectWallet()}
          className="duration-300 z-10 text-md tracking-widest bg-[#3E6A86] px-2 py-1 rounded-sm font-display font-bold text-black text-center
          disabled:cursor-not-allowed hover:bg-elementor-text-3 disabled:hover:text-black disabled:opacity-25 disabled:hover:bg-[#3E6A86] flex justify-center items-center gap-3"
        >
          Or logout
          <img
            src="/logout.svg"
            alt="logout icon"
            className="w-[20px] h-[20px] min-w-[20px]"
          />
        </button>
      </div>
    </div>
  );
};
export default ChangeNetworkCard;
