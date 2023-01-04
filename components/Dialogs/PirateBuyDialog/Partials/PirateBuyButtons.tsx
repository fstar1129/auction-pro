import Moralis from "moralis-v1";
import React from "react";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";
import useCheckCurrency from "../../../../hooks/useCheckCurrency";

const PirateBuyButtons: React.FC<any> = ({
  pirate,
  user,
  cancelListing,
  buyPirate,
  buttonText,
  disabled,
  version,
}): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  const token = pirate?.buy?.data?.token_address;

  const { decimals, tokens } = useCheckCurrency(token);

  const tokenAmount = parseFloat(
    Moralis.Units.FromWei(pirate?.buy.data?.quantity || 0, decimals)
  );
  if (!pirate) return;

  return (
    <div className="flex flex-row">
      {user.keys.walletAddress === pirate?.user ? (
        <button
          className="duration-300 tracking-wider justify-end bg-[#3E6A86] text-elementor-text-2 mt-2 px-2 py-2 rounded-sm text-xl font-display font-bold text-center h-[64px] w-full mx-auto dmd:justify-center hover:bg-elementor-text-3 mxsm:mt-0 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25 disabled:text-elementor-text-3"
          onClick={!isConnectedToImx ? connectWalletToImx : cancelListing}
          disabled={version || disabled}
        >
          {!isConnectedToImx ? "CONNECT TO IMX" : "REMOVE LISTING"}
        </button>
      ) : (
        <button
          className="duration-300 tracking-wider justify-end bg-[#3E6A86] text-elementor-text-2 mt-2 px-2 py-2 rounded-sm text-xl font-display font-bold text-center w-full mx-auto hover:bg-elementor-text-3 h-[64px] disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25 disabled:text-elementor-text-3 mxsm:mt-0"
          onClick={!isConnectedToImx ? connectWalletToImx : buyPirate}
          disabled={disabled || tokenAmount > tokens || version}
        >
          {tokenAmount > tokens
            ? "Not enough tokens"
            : !isConnectedToImx
            ? "CONNECT TO IMX"
            : buttonText}
        </button>
      )}
    </div>
  );
};

export default PirateBuyButtons;
