import React from "react";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";

export interface IBuyChestButton {
  isChestMintLoading: boolean;
  check: () => void;
  minted: boolean;
  updateMintStatus: (x: boolean) => void;
  version: boolean;
}

const BuyChestButton: React.FC<IBuyChestButton> = ({
  minted,
  updateMintStatus,
  check,
  isChestMintLoading,
  version,
}): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  return (
    <button
      type="button"
      className="min-w-[200px] mx-auto flex justify-center mb-[30px] mt-[30px] px-4 py-2 text-lg font-medium font-display transition duration-300 ease-in-out hover:text-black text-elementor-text-3 border border-[#69bae9] hover:bg-[#69bae9] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-25 disabled:hover:bg-[transparent] disabled:hover:text-elementor-text-3 disabled:hover:cursor-not-allowed"
      onClick={() =>
        version
          ? null
          : !isConnectedToImx
          ? connectWalletToImx()
          : minted
          ? updateMintStatus(false)
          : check()
      }
      disabled={version || isChestMintLoading}
    >
      {isChestMintLoading ? (
        "Minting chest..."
      ) : minted ? (
        "Buy another one"
      ) : !isConnectedToImx ? (
        "Connect to IMX"
      ) : (
        <div
          className={
            "flex flex-row items-center justify-center font-display text-elementor-text-3"
          }
        >
          Buy chest{" "}
          <img src={"2coins.png"} className={"w-[25px] h-auto ml-[5px]"} />
        </div>
      )}
    </button>
  );
};

export default BuyChestButton;
