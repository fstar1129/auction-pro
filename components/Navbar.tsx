import React from "react";
import Wallet from "./Wallet";
import { useMoralis } from "react-moralis";
import { useAppDispatch, useAppSelector } from "../app/store-hooks";
import { selectUser } from "../state/user/userSlice";
import { OptionsIcon } from "./Common/Icons";
import { openDialog } from "../state/dialog/dialogSlice";

const Navbar = () => {
  const { logout } = useMoralis();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  const disconnectWallet = async () => {
    localStorage.removeItem("is_logged");
    localStorage.removeItem("STARK_PUBLIC_KEY");
    await logout();
  };

  return (
    <div className="flex flex-col xl:flex-row items-center justify-between">
      <div className="relative w-full max-w-[400px] m-5 ml-4 mr-0">
        <a href="https://arrland.com" rel="noopener noreferrer">
          <img
            src="https://arrland.app/wp-content/uploads/2021/10/small_PotA_logo.png"
            alt="Pirates of Arrland"
            className="xl:min-w-[200px] h-auto mx-auto cursor-pointer dmd:-ml-1"
          />
        </a>
      </div>

      <div className="flex flex-col lg:p-5 w-full justify-center items-center xl:items-start xl:max-w-[500px] pb-5 ml-4 mxxl:max-w-[500px] dmd:ml-0">
        <div className="flex flex-wrap justify-center">
          <Wallet walletAddress={user.keys.walletAddress} />
          <button
            className="text-sm text-elementor-text-1 mx-2"
            onClick={() => dispatch(openDialog({ currentDialog: "SETTINGS" }))}
          >
            <OptionsIcon className="mx-1 text-elementor-text-1 fill-elementor-text-1 hover:fill-gray-100 cursor-pointer w-5" />
          </button>
          <button onClick={() => disconnectWallet()} className="mx-2 dmd:m-2">
            <img
              src="logout.svg"
              className="w-[20px] h-[20px] min-w-[20px] hover:saturate-150"
            />
          </button>
        </div>
        <div className="text-xs text-white max-w-[300px] text-center md:text-left pl-[6px] mxxl:text-center">
          Putting up for sale or transferring an NFT pirate to another wallet
          resets the RUM it has accrued to date.
        </div>
      </div>
    </div>
  );
};

export default Navbar;
