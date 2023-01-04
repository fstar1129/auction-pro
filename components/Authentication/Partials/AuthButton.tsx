import React, { useEffect, useState } from "react";
import { useChain, useMoralis } from "react-moralis";
import { isMobile } from "mobile-device-detect";
import Image from "next/image";
import { useAppDispatch } from "../../../app/store-hooks";
import { setSelected } from "../../../state/user/userSlice";

const AuthButton: React.FC = (): JSX.Element => {
  const [mobileView, setMobileView] = useState(false);
  const { authenticate, enableWeb3, isWeb3Enabled } = useMoralis();
  const dispatch = useAppDispatch();
  const handleAuthentication = async () => {
    try {
      await authenticate({ provider: "metamask" });
      dispatch(setSelected("summary"));
      localStorage.setItem('is_logged', 'true');
    } catch (err) {
      console.log("authentication error", err);
    }
  };

  const handleAuthenticationDesktop = async () => {
    try {
      await authenticate({ provider: "walletconnect" });
      dispatch(setSelected("summary"));
      localStorage.setItem('is_logged', 'true');
    } catch (err) {
      console.log("authentication error", err);
    }
  };

  useEffect(() => {
    isMobile ? setMobileView(true) : setMobileView(false);
  }, [isMobile]);

  return (
    <div className="flex gap-5 flex-wrap justify-center items-center">
      <button
        onClick={() => handleAuthentication()}
        className={`${mobileView ? "hidden" : "flex"}`}
      >
        <div className="p-7 hover:bg-elementor-1 border-2 border-elementor-text-1 cursor-pointer w-48 flex justify-center items-center flex-col rounded-md">
          <div className="relative w-24">
            <Image
              src="/metamask.webp"
              alt="Metamask"
              width="40%"
              height="30%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <p className="mt-5 tracking-wider text-lg">MetaMask</p>
        </div>
      </button>
      <button onClick={() => handleAuthenticationDesktop()}>
        <div className="p-7 hover:bg-elementor-1 border-2 border-elementor-text-1 cursor-pointer w-48 flex justify-center items-center flex-col rounded-md">
          <div className="relative w-24">
            <Image
              src="/wallet-connect.svg"
              alt="Wallet Connect"
              width="40%"
              height="30%"
              layout="responsive"
              objectFit="contain"
            />
          </div>
          <p className="mt-5 tracking-wider text-lg">WalletConnect</p>
        </div>
      </button>
    </div>
  );
};

export default AuthButton;
