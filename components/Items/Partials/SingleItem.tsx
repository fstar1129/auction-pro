import React from "react";
import { parseName, getUrlFilename } from "../../../helpers";
import { useAppDispatch } from "../../../app/store-hooks";
import { openDialog } from "../../../state/dialog/dialogSlice";
import { showError } from "../../../api/toasts";
import Spinner from "../../Common/Spinner";

type TItems = {
  id?: string;
  image_url: string;
  metadata?: {
    name?: string;
    rarity?: string;
  };
};

interface IItemsProps {
  item: any;
}

const SingleItem: React.FC<IItemsProps> = ({ item }): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <button
      className="flex flex-row"
      onClick={() => {
        !item?.image_url && !item?.metadata.image_url
          ? showError(
              "An error occured while getting item metadata. Please try again later."
            )
          : dispatch(
              openDialog({
                currentDialog: "ITEM_DETAILS",
                currentDialogAdditionalData: item,
              })
            );
      }}
    >
      <div
        className="relative rounded bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] m-[10px] w-[260px] flex flex-col items-center justify-center duration-150 ease hover:drop-shadow-[0_10px_10px_#a7a7a73d] hover:to-[#fff] hover:translate-y-[-5px] hover:saturate-[1.25]"
        key={item?.id}
      >
        <div className="flex flex-row justify-between bg-black rounded-t-md p-[5px] w-full text-sm font-display text-elementor-text-3">
          <h6 className="text-elementor-text-3 font-display text-md text-left truncate overflow-hidden whitespace-nowrap">
            {item?.metadata?.name ? (
              parseName(item?.metadata?.name, 30)
            ) : (
              <div className="mt-[1px]">
                <Spinner />
              </div>
            )}
          </h6>
          <h6 className="text-elementor-text-3 font-display text-md">
            #{item?.token_id}
          </h6>
        </div>

        <img
          src={
            !item?.image_url && !item?.metadata.image_url
              ? "summaryAssets/items.png"
              : getUrlFilename(
                  item?.metadata?.image_url || "",
                  "400x400",
                  ".jpg"
                )
          }
          alt={item?.metadata?.name}
          className="h-full w-full bg-[rgba(0,0,0,0.8)] cursor-pointer"
        />

        <div className="absolute bottom-[5%] left-[1px]">
          {item?.orders?.sell_orders[0]?.status === "active" ? (
            <div className="">
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
        {item?.metadata?.rarity ? (
          <img
            data-tip={item?.metadata?.rarityy}
            src={
              `rarity/${item?.metadata?.rarity}_long.png` ||
              `rarity/rare_long.png`
            }
            alt={item?.metadata?.name}
            className={"absolute w-[100px] h-auto -bottom-[12px] right-[4px]"}
          />
        ) : (
          ""
        )}
      </div>
    </button>
  );
};

export default SingleItem;
