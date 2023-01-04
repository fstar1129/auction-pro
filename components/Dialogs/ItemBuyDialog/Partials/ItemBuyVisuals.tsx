import React from "react";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";
import ItemBuyButtons from "./ItemBuyButtons";
import { getUrlFilename } from "../../../../helpers";

const ItemBuyVisuals: React.FC<any> = ({
  order,
  user,
  cancelListing,
  buyItem,
  dataReady,
  disabled,
  buttonText,
  itemData,
  activeIndex,
  handlePrevious,
  trackingItem,
  handleNext,
  overall,
  version,
}): JSX.Element => {
  if (!order) return;

  return (
    <div className="p-2 flex flex-col justify-between dmd:pr-2">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="h-auto cursor-pointer max-h-96 w-auto duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full"
            src={
              order?.sell.data.properties?.image_url || ""
                ? getUrlFilename(
                    order?.sell.data.properties?.image_url || "",
                    "400x400",
                    ".jpg"
                  )
                : `summaryAssets/items.png` ||
                  order?.sell.data.properties?.image_url
            }
            alt={order?.sell.data.properties?.name}
            onClick={() =>
              window &&
              window.open(
                order?.sell.data.properties?.image_url,
                "_blank",
                "noopeener"
              )
            }
          />
          <div className="hidden absolute top-[23%] left-[30px] z-1000 mxsm:block">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePrevious}
            />
          </div>
          <div className="hidden absolute top-[23%] right-[0px] z-1000 mxsm:block">
            <DialogRightArrow
              trackingItem={trackingItem}
              activeIndex={activeIndex}
              handleNext={handleNext}
              overall={overall}
            />
          </div>
        </div>
        <div className="mxsm:hidden">
          <ItemBuyButtons
            order={order}
            user={user}
            cancelListing={cancelListing}
            buyItem={buyItem}
            dataReady={dataReady}
            disabled={disabled}
            buttonText={buttonText}
            itemData={itemData}
            version={version}
          />
        </div>
      </div>
    </div>
  );
};

export default ItemBuyVisuals;
