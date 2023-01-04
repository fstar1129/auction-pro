import React from "react";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";

const AssetVisuals: React.FC<any> = ({
  order,
  activeIndex,
  handlePrevious,
  trackingItem,
  handleNext,
  overall,
}): JSX.Element => {
  if (!order) return;

  return (
    <div className="p-2 pr-0 flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="h-auto cursor-pointer max-h-96 w-auto duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full mxsm:pr-2"
            src={
              (parseInt(order?.sell?.data?.token_id) < 20000
                ? "chest_small.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 21234
                ? "islands/extralarge.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 21170
                ? "islands/large.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 20914
                ? "islands/medium.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 20000
                ? "islands/small.jpeg"
                : order?.sell?.data?.properties?.image_url)
            }
            alt={order?.sell?.data?.properties?.name}
            onClick={() =>
              window &&
              window.open(
                order?.sell?.data?.properties?.image_url,
                "_blank",
                "noopeener"
              )
            }
          />
          <div className="hidden absolute top-[32%] left-[30px] z-1000 mxsm:block">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePrevious}
            />
          </div>
          <div className="hidden absolute top-[32%] right-[0px] z-1000 mxsm:block">
            <DialogRightArrow
              trackingItem={trackingItem}
              activeIndex={activeIndex}
              handleNext={handleNext}
              overall={overall}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetVisuals;
