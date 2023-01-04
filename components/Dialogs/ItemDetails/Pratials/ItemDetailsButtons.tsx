import React from "react";
import { showError, showSuccess } from "../../../../api/toasts";
import { closeDialog, openDialog } from "../../../../state/dialog/dialogSlice";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import { useAppDispatch, useAppSelector } from "../../../../app/store-hooks";
import { useMoralisCloudFunction } from "react-moralis";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../../state/user/userSlice";
import useCheckImxConnection from "../../../../hooks/useCheckImxConnection";
import useMainnetVersion from "../../../../hooks/useMainnetVersion";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2000;

const ItemDetailsButtons: React.FC<any> = ({ item, version }): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
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
        orderId: item?.orders?.sell_orders[0]?.order_id,
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
        showSuccess(item?.name + " was successfully removed from market!");
        dispatch(closeDialog());
      }, 4000);
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying item. Check if it still exist on marketplace or try again later."
      );
    }
  };

  if (!item) return;

  return (
    <div className="w-full flex justify-center dmd:justify-end mt-2 mxsm:-mt-2">
      {item?.orders?.sell_orders[0]?.status === "active" ? (
        <button
          className="duration-300 flex justify-center tracking-widest bg-[#3E6A86] h-[64px] mr-2 px-6 py-5 rounded-sm text-elementor-text-2 text-xl font-display font-bold text-center dmd:w-full disabled:opacity-25 hover:bg-[#D7CDBB] disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86]"
          disabled
        >
          TRANSFER
        </button>
      ) : (
        <button
          className="duration-300 flex justify-center tracking-widest bg-[#3E6A86] h-[64px] mr-2 px-6 py-5 rounded-sm text-xl font-display font-bold text-elementor-text-2 text-center disabled:opacity-25 hover:bg-[#D7CDBB] disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86] dmd:w-full"
          onClick={() =>
            dispatch(
              openDialog({
                currentDialog: "ITEM_TRANSFER_DIALOG",
                currentDialogAdditionalData: item,
              })
            )
          }
        >
          TRANSFER
        </button>
      )}

      {item?.orders?.sell_orders[0]?.status === "active" ? (
        <button
          className="duration-300 flex justify-center tracking-widest bg-[#3E6A86] h-[64px] px-6 py-5 rounded-sm text-xl font-display font-bold text-elementor-text-2 text-center w-[99px] hover:bg-[#D7CDBB] mxsm:w-full disabled:opacity-25 disabled:cursor-not-allowed disabled:hover:bg-[#3E6A86]"
          disabled={version}
          onClick={!isConnectedToImx ? connectWalletToImx : cancelListing}
        >
          DELIST
        </button>
      ) : (
        <button
          className="duration-300 flex justify-center tracking-widest bg-[#3E6A86] h-[64px] px-6 py-5 rounded-sm text-xl font-display font-bold text-elementor-text-2 text-center hover:bg-[#D7CDBB] dmd:w-full"
          onClick={() =>
            dispatch(
              openDialog({
                currentDialog: "ITEM_SELL_DIALOG",
                currentDialogAdditionalData: item,
              })
            )
          }
        >
          SELL
        </button>
      )}
    </div>
  );
};

export default ItemDetailsButtons;
