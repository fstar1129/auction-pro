import React from "react";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";

const ReservationVisuals: React.FC<any> = ({
  asset,
  activeIndex,
  handlePreviousAsset,
  trackingItem,
  handleNextAsset,
  overall,
}): JSX.Element => {
  if (!asset) return;
  return (
    <div className="p-2 pr-2 flex flex-col justify-between sm:pr-0">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="h-auto cursor-pointer max-h-96 w-auto duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full"
            src={
              asset?.image_url
                ? asset?.image_url || asset?.metadata?.image_url
                : "summaryAssets/assets.png"
            }
            alt={asset?.metadata?.name}
            onClick={() =>
              window &&
              window.open(asset?.metadata?.image_url, "_blank", "noopeener")
            }
          />
          {asset?.isClaimed === false ? (
            ""
          ) : (
            <>
              <div className="hidden absolute top-[35%] left-[30px] z-1000 mxsm:block">
                <DialogLeftArrow
                  activeIndex={activeIndex}
                  handlePrevious={handlePreviousAsset}
                />
              </div>
              <div className="hidden absolute top-[35%] right-[0px] z-1000 mxsm:block">
                <DialogRightArrow
                  trackingItem={trackingItem}
                  activeIndex={activeIndex}
                  handleNext={handleNextAsset}
                  overall={overall}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReservationVisuals;
