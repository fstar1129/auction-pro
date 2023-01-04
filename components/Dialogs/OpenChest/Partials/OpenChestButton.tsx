import React from "react";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";

interface IOpenChestButtonProps {
  isDisabled: boolean;
  playing: boolean;
  opening: boolean;
  handleChestOpen: () => void;
}

const OpenChestButton: React.FC<IOpenChestButtonProps> = ({
  isDisabled,
  playing,
  handleChestOpen,
  opening,
}): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  return (
    <div className="w-full h-[64px] flex items-center justify-center absolute bottom-[8px]">
      <button
        type="button"
        className={`duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] px-2 py-1 rounded-sm font-display font-bold text-elementor-text-2 text-center h-[60px] hover:bg-elementor-text-3 hover:text-elementor-text-3 w-full ml-2 mr-3 disabled:opacity-25 disabled:hover:bg-[#3E6A86] disabled:hover:text-elementor-text-2 ${
          opening
            ? "opacity-[0.25] cursor-not-allowed hover:text-elementor-text-3 hover:bg-[transparent]"
            : ""
        }`}
        onClick={() =>
          playing
            ? null
            : !isConnectedToImx
            ? connectWalletToImx()
            : handleChestOpen()
        }
        disabled={opening || isDisabled}
      >
        <div className="flex flex-row items-center justify-center font-display text-elementor-text-2 ">
          {playing
            ? "Loading..."
            : !isConnectedToImx
            ? "Connect to IMX"
            : "OPEN CHEST"}
        </div>
      </button>
    </div>
  );
};

export default OpenChestButton;
