import React from "react";
import { openDialog } from "../../../state/dialog/dialogSlice";
import { useAppDispatch } from "../../../app/store-hooks";
import { parseName } from "../../../helpers";
import Spinner from "../../Common/Spinner";

const Asset = ({ asset }): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="flex flex-row justify-start items-center"
      key={asset?.id}
      onClick={() =>
        dispatch(
          openDialog({
            currentDialog: "ASSET_DETAILS",
            currentDialogAdditionalData: asset,
          })
        )
      }
    >
      <div className="relative rounded bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] m-2 w-[260px] flex items-center justify-center cursor-pointer duration-150 ease hover:drop-shadow-[0_10px_10px_#a7a7a73d] hover:to-[#fff] hover:translate-y-[-5px] hover:saturate-[1.25]">
        <div className="absolute top-0 bg-[rgb(0,0,0)] w-[98.5%] rounded-t-md mt-[2px]">
          <h6 className="text-elementor-text-3 font-display text-[14px] justify-between p-0.25 mx-1">
            <div className="flex flex-row justify-between font-display mx-0.5">
              <span className="font-display truncate">
                {asset?.metadata?.name ? (
                  parseName(asset?.metadata?.name, 20)
                ) : (
                  <div className="mt-[8px] mx-[2px]">
                    <Spinner />
                  </div>
                )}{" "}
              </span>
              <span className="font-display">#{asset?.token_id}</span>
            </div>
          </h6>
        </div>

        <div className="absolute bottom-[5%] left-[1px]">
          {asset?.orders?.sell_orders[0]?.status === "active" ? (
            <div>
              <img
                alt="Listed for sale"
                src={"card_assets/listedforsale.png"}
                className="w-full h-[30px]"
              />
            </div>
          ) : (
            ""
          )}
        </div>

        <img
          src={
            asset?.metadata?.image_url
              ? asset?.metadata?.image_url || asset?.image_url
              : "summaryAssets/assets.png"
          }
          className="mt-8"
          alt={asset?.metadata?.name}
        />
      </div>
    </button>
  );
};

export default Asset;
