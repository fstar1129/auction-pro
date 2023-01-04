import React from "react";
import { getUrlFilename } from "../../../../helpers";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";
import ItemDetailsButtons from "./ItemDetailsButtons";

const ItemVisuals: React.FC<any> = ({
  item,
  activeIndex,
  handlePreviousItem,
  trackingItem,
  handleNextItem,
  overall,
  version,
}): JSX.Element => {
  if (!item) return;
  return (
    <div className="p-2 flex flex-col justify-between dmd:pr-2">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="h-auto cursor-pointer max-h-96 max-w-96 duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full"
            src={
              !item?.image_url && !item?.metadata?.image_url
                ? `summaryAssets/items.png`
                : getUrlFilename(
                    item?.metadata?.image_url || "",
                    "400x400",
                    ".jpg"
                  )
            }
            alt={item?.metadata?.name}
            onClick={() =>
              window &&
              window.open(item?.metadata?.image_url, "_blank", "noopeener")
            }
          />
          <div className="hidden absolute top-[25%] left-[30px] z-1000 mxsm:block">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePreviousItem}
            />
          </div>
          <div className="hidden absolute top-[25%] right-[0px] z-1000 mxsm:block">
            <DialogRightArrow
              trackingItem={trackingItem}
              activeIndex={activeIndex}
              handleNext={handleNextItem}
              overall={overall}
            />
          </div>
        </div>
        <div className="mxsm:absolute mxsm:bottom-0 mxsm:left-0 mxsm:w-full mxsm:pb-2 mxsm:mxsm:px-2">
          <ItemDetailsButtons item={item} version={version} />
        </div>
      </div>
    </div>
  );
};

export default ItemVisuals;
