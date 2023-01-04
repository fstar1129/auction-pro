import { ERC721TokenType, Link } from "@imtbl/imx-sdk";
import { Dialog } from "@headlessui/react";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import { showError, showSuccess, showWarning } from "../../../api/toasts";
import { useMoralisCloudFunction } from "react-moralis";
import axios from "axios";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../state/user/userSlice";
import useMainnetVersion from "../../../hooks/useMainnetVersion";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2500;

const AssetTransferDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const version = useMainnetVersion();
  const user = useAppSelector(selectUser);
  const dialog = useAppSelector(selectDialog);
  const [reciver, setReciver] = useState("");
  const [buttonText, setButtonText] = useState<string>("TRANSFER NFT");
  const [disabled, setDisabled] = useState<boolean>(false);
  const asset = dialog.currentDialogAdditionalData;
  let link = new Link(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const checkTransferStatus = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets/${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}/${asset?.token_id}`
      );
      if (res.data?.user === user.keys.walletAddress) {
        setTimeout(() => checkTransferStatus(), API_CALL_REPEAT_TIME);
      } else {
        await dispatch(
          fetchUserImxCollections({
            walletAddress: user.keys.walletAddress,
            piratesMetaCloudFunction,
          })
        );
        dispatch(closeDialog());
        showSuccess(asset?.metadata?.name + " was transfered successfully!");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const transferAsset = async () => {
    let startsWith = reciver.substring(0, 2);
    if (asset?.status === "imx") {
      if (startsWith === "0x" && reciver.length === 42) {
        setButtonText("TRANSFERING IN PROGRESS");
        setDisabled(true);
        try {
          await link.transfer([
            {
              type: ERC721TokenType.ERC721,
              tokenId: asset?.token_id,
              tokenAddress: `${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}`,
              toAddress: reciver,
            },
          ]);

          await checkTransferStatus();
        } catch (error) {
          dispatch(closeDialog());
          showWarning("Transfering " + asset?.metadata?.name + " was aborted.");
        }
      } else {
        showError(
          'Check reciver wallet address! It should start with "0x" and contain 42 characters!'
        );
      }
    } else {
      dispatch(closeDialog());
      showError("Transfers only works for NFT token on Immutable-X.");
    }
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center flex justify-center items-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        />

        <div className="inline-block w-full text-elementor-text-3 max-w-[500px] overflow-hidden text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-[#64a2bc] shadow-xl">
          <CloseDialogButton />
          <div className="bg-[#11131c] h-[200px]">
            <div className="w-full h-full flex justify-center items-center flex-col">
              <h1 className="text-center font-display text-xl mb-3 text-elementor-text-1 font-semibold">
                <span className="font-display text-elementor-text-3 text-xl font-normal">
                  Transfering:
                </span>{" "}
                {asset?.metadata?.name}
              </h1>

              <p className="mb-1 font-display text-lg">Reciver:</p>
              <input
                type="text"
                minLength={42}
                maxLength={42}
                className="text-white w-[75%] border-[2px] rounded p-1 mb-2 font-semibold border-elementor-text-1 bg-elementor-text-2 outline-none font-display text-center"
                onChange={version ? null : (e) => setReciver(e.target.value)}
                disabled={disabled}
              />

              <button
                disabled={version || disabled}
                className="duration-300 z-10 text-md tracking-widest bg-[#3E6A86] mt-2 px-2 py-1 rounded-sm font-display font-bold text-black text-center hover:bg-elementor-text-3 disabled:opacity-[0.25] disabled:hover:bg-[#3E6A86]"
                onClick={!isConnectedToImx ? connectWalletToImx : transferAsset}
              >
                {!isConnectedToImx ? "CONNECT TO IMX" : buttonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AssetTransferDialog;
