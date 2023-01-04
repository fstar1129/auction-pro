import React from "react";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";

export interface IBuyChestButton {
  isChestMintLoading: boolean;
  check: () => void;
  minted: boolean;
  updateMintStatus: (x: boolean) => void;
  version: boolean;
}

const ClaimRewardButton: React.FC<any> = ({
  minted,
  updateMintStatus,
  isClaimMintLoading,
  version,
}): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  return (
    <div className="flex flex-col justify-center mx-1">
      <button
        className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 h-[64px] mx-1"
        onClick={() =>
          version
            ? null
            : !isConnectedToImx
            ? connectWalletToImx()
            : minted
            ? updateMintStatus(false)
            : console.log("check")
        }
        disabled={version || isClaimMintLoading}
      >
        {isClaimMintLoading
          ? "Minting chest..."
          : !isConnectedToImx
          ? "Connect to IMX"
          : "CLAIM"}
      </button>
    </div>
  );
};

export default ClaimRewardButton;
