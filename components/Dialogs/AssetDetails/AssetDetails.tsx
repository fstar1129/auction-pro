import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  closeDialog,
  openDialog,
  selectDialog,
} from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import AssetVisuals from "./Partials/AssetVisuals";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import { showError, showSuccess } from "../../../api/toasts";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../state/user/userSlice";
import DialogRightArrow from "../Partials/DialogRightArrow";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import { useMoralisCloudFunction } from "react-moralis";
import { parseName } from "../../../helpers";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";
import useMainnetVersion from "../../../hooks/useMainnetVersion";
import Spinner from "../../Common/Spinner";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2000;

const AssetDetails: React.FC = (): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const asset = dialog.currentDialogAdditionalData;
  let link = new LinkIMX(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  let data;
  let overallAssets;

  const version = useMainnetVersion();

  const [inventory, setInventory] = useState<any>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<any>(null);

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const cancelListing = async () => {
    try {
      await link.cancel({
        orderId: asset?.orders?.sell_orders[0]?.order_id,
      });
      setTimeout(() => {
        dispatch(
          fetchUserImxCollections({
            walletAddress: user.keys.walletAddress,
            piratesMetaCloudFunction,
          })
        );
      }, API_CALL_REPEAT_TIME);
      setTimeout(() => {
        showSuccess(asset?.name + " was successfully removed from market!");
        dispatch(closeDialog());
      }, 4000);
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying asset. Check if it still exist on marketplace or try again later."
      );
    }
  };

  const calculateIndex = () => {
    if (!user.inventory.assets) return;
    return user.inventory.assets.summary.findIndex((object) => {
      return asset?.id == object?.id;
    });
  };

  const handlePreviousAsset = () => {
    const index = calculateIndex();
    const handlePrevIndex = () => setActiveIndex(activeIndex - 1);

    if (index === 0) {
      return;
    }

    if (activeIndex === 0) {
      setActiveIndex(0);
    } else {
      handlePrevIndex();
    }
  };

  const handleNextAsset = () => {
    const handleNextIndex = () => setActiveIndex(activeIndex + 1);

    if (activeIndex >= overallAssets) {
      setActiveIndex(overallAssets);
    } else {
      handleNextIndex();
    }
  };
  if (user.inventory.assetsSelected === "summary") {
    data = user.inventory.assets.summary[activeIndex];
    overallAssets = user.inventory.assets.summary.length;
  } else if (user.inventory.assetsSelected === "chests") {
    data = user.inventory.assets.chests[activeIndex];
    overallAssets = user.inventory.assets.chests.length;
  } else {
    data = user.inventory.assets.reservations[activeIndex];
    overallAssets = user.inventory.assets.reservations.length;
  }
  useEffect(() => {
    dispatch(
      openDialog({
        currentDialog: "ASSET_DETAILS",
        currentDialogAdditionalData: data,
      })
    );
  }, [activeIndex]);

  useEffect(() => {
    let index = calculateIndex();
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (inventory === null) {
      return;
    }

    setActiveItem(inventory[0]);
  }, [inventory]);

  if (!asset) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        ></Dialog.Overlay>
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full text-white max-w-[700px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxlg:top-[115%] mxlg:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePreviousAsset}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2 justify-between">
            <AssetVisuals
              asset={asset}
              activeIndex={activeIndex}
              handlePreviousAsset={handlePreviousAsset}
              trackingItem={user.inventory.assets}
              handleNextAsset={handleNextAsset}
              overall={overallAssets}
            />

            <div className="w-full flex flex-col justify-between mb-2">
              <h1 className="font-display text-4xl font-bold my-6 text-elementor-text-3 mx-2 flex flex-row">
                {asset?.metadata?.name ? (
                  parseName(asset?.metadata?.name, 20)
                ) : (
                  <div className="mt-[10px] mx-[2px] mr-[20px]">
                    <Spinner />
                  </div>
                )}
                #{asset?.token_id}
              </h1>

              <div className="flex flex-col justify-center mx-1">
                {asset?.token_id < 20000 ? (
                  <button
                    className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 h-[64px] mx-1"
                    onClick={() =>
                      dispatch(
                        openDialog({
                          currentDialog: "OPEN_CHEST",
                          currentDialogAdditionalData: asset,
                        })
                      )
                    }
                  >
                    OPEN CHEST
                  </button>
                ) : (
                  ""
                )}

                <div className="flex flex-row mt-2">
                  {asset?.orders?.sell_orders[0]?.status === "active" ? (
                    <button
                      className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 w-full h-[64px] mx-1 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25 "
                      disabled
                    >
                      TRANSFER
                    </button>
                  ) : (
                    <button
                      className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 w-full h-[64px] mx-1"
                      onClick={() =>
                        dispatch(
                          openDialog({
                            currentDialog: "ASSET_TRANSFER_DIALOG",
                            currentDialogAdditionalData: asset,
                          })
                        )
                      }
                    >
                      TRANSFER
                    </button>
                  )}

                  {asset?.orders?.sell_orders[0]?.status === "active" ? (
                    <button
                      className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 w-full h-[64px] mx-1 disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86]"
                      disabled={version}
                      onClick={
                        !isConnectedToImx ? connectWalletToImx : cancelListing
                      }
                    >
                      DELIST
                    </button>
                  ) : (
                    <button
                      className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 w-full h-[64px] mx-1"
                      onClick={() =>
                        dispatch(
                          openDialog({
                            currentDialog: "ASSET_SELL_DIALOG",
                            currentDialogAdditionalData: asset,
                          })
                        )
                      }
                    >
                      SELL
                    </button>
                  )}
                </div>
              </div>
            </div>
            <CloseDialogButton />
          </div>
          <div className="absolute top-[50%] -right-[70px] mxlg:top-[115%] mxlg:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={user.inventory.assets.summary}
              activeIndex={activeIndex}
              handleNext={handleNextAsset}
              overall={overallAssets}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AssetDetails;
