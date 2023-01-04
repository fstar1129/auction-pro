import React from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/store-hooks";
import {
  closeDialog,
  openDialog,
  selectDialog,
} from "../../../../state/dialog/dialogSlice";
import { showError, showSuccess } from "../../../../api/toasts";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";
import { useMoralisCloudFunction } from "react-moralis";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../../state/user/userSlice";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2000;

const PirateVisuals: React.FC<any> = ({
  pirate,
  activeIndex,
  handlePreviousPirate,
  handleNextPirate,
  trackingItem,
  overall,
  version,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const user = useAppSelector(selectUser);
  const pirateData = dialog.currentDialogAdditionalData;
  let link = new LinkIMX(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const cancelListing = async () => {
    try {
      await link.cancel({
        orderId: pirate?.orders?.sell_orders[0]?.order_id,
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
        dispatch(closeDialog());
        showSuccess(
          "Pirate" + pirate?.name + " was successfully removed from market"
        );
      }, 4000);
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying pirate. Check if it still exist on marketplace or try again later."
      );
    }
  };

  if (!pirateData) return;

  return (
    <div className="p-2 pb-0">
      <div className="w-full flex flex-col justify-between mb-2">
        <div className="text-xs font-display text-elementor-text-3 absolute z-50 object-scale-down">
          <img
            src={"modal_assets/rarity_frame.png"}
            className="h-[25px] w-auto mx-auto"
          />
          <div className="text-sm font-display font-bold text-black absolute top-0 left-0 flex justify-start pl-2 items-center h-full w-full">
            Rarity: {pirate?.rarity}
          </div>
        </div>
        <div className="overflow-hidden">
          <img
            className="w-96 max-h-96 duration-300 hover:scale-110 hover:saturate-[1.25] dmd:w-full cursor-pointer object-contain"
            src={pirate?.image_small ? pirate?.image_small : pirate?.image_url}
            alt={pirate?.metadata?.name}
            onClick={() =>
              window &&
              window.open(pirate?.metadata?.image_url, "_blank", "noopeener")
            }
          />
          <div className="hidden absolute top-[19%] left-[30px] z-1000 mxsm:block">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePreviousPirate}
            />
          </div>
          <div className="hidden absolute top-[19%] right-[0px] z-1000 mxsm:block">
            <DialogRightArrow
              trackingItem={trackingItem}
              activeIndex={activeIndex}
              handleNext={handleNextPirate}
              overall={overall}
            />
          </div>
        </div>
        <div className="block">
          <div className="flex justify-between">
            {pirate?.orders?.sell_orders[0]?.status === "active" ? (
              <button
                className="duration-300 tracking-widest w-[100%] bg-[#3E6A86] mt-2 py-4 rounded-sm text-sm font-display text-elementor-text-2 font-bold text-center mr-1 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25 "
                disabled
              >
                TRANSFER
              </button>
            ) : (
              <button
                className="duration-300 z-10 tracking-widest w-[100%] bg-[#3E6A86] mt-2 py-4 rounded-sm text-sm font-display font-bold text-elementor-text-2 text-center mr-1 hover:bg-elementor-text-3 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25 "
                onClick={() =>
                  dispatch(
                    openDialog({
                      currentDialog: "PIRATE_TRANSFER_DIALOG",
                      currentDialogAdditionalData: pirateData,
                    })
                  )
                }
              >
                TRANSFER
              </button>
            )}

            {pirate?.orders?.sell_orders[0]?.status === "active" ? (
              <button
                className="duration-300 z-10 tracking-widest w-[100%] bg-[#3E6A86] mt-2 py-4 rounded-sm text-sm font-display font-bold text-elementor-text-2 text-center hover:bg-[#D7CDBB] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86]"
                onClick={!isConnectedToImx ? connectWalletToImx : cancelListing}
                disabled={version}
              >
                DELIST
              </button>
            ) : (
              <button
                className="duration-300 z-10 tracking-widest w-[100%] bg-[#3E6A86] mt-2 py-4 rounded-sm text-sm font-display font-bold text-elementor-text-2 text-center hover:bg-[#D7CDBB] disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86]"
                onClick={() =>
                  dispatch(
                    openDialog({
                      currentDialog: "PIRATE_SELL_DIALOG",
                      currentDialogAdditionalData: pirateData,
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
    </div>
  );
};

export default PirateVisuals;
