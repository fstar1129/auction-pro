import React from "react";
import { getFilename } from "../../../../helpers";
import DialogLeftArrow from "../../Partials/DialogLeftArrow";
import DialogRightArrow from "../../Partials/DialogRightArrow";
import PirateBuyButtons from "./PirateBuyButtons";

const PirateBuyVisuals: React.FC<any> = ({
  pirate,
  user,
  cancelListing,
  buyPirate,
  activeIndex,
  handlePrevious,
  trackingItem,
  handleNext,
  overall,
  buttonText,
  disabled,
  version,
}): JSX.Element => {
  if (!pirate) return;

  return (
    <div className="p-2 flex flex-col justify-between">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="w-96 h-auto max-h-96 cursor-pointer duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full"
            src={getFilename(pirate?.sell?.data?.properties?.image_url, ".jpg")}
            alt={pirate?.sell?.data?.properties?.name}
            onClick={() =>
              window &&
              window.open(
                pirate?.sell?.data?.properties?.image_url,
                "_blank",
                "noopeener"
              )
            }
          />
          <div className="hidden absolute top-[24%] left-[30px] z-1000 mxsm:block">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePrevious}
            />
          </div>
          <div className="hidden absolute top-[24%] right-[0px] z-1000 mxsm:block">
            <DialogRightArrow
              trackingItem={trackingItem}
              activeIndex={activeIndex}
              handleNext={handleNext}
              overall={overall}
            />
          </div>
        </div>
        <div className="mxsm:hidden">
          <PirateBuyButtons
            pirate={pirate}
            user={user}
            cancelListing={cancelListing}
            buyPirate={buyPirate}
            buttonText={buttonText}
            disabled={disabled}
            version={version}
          />
        </div>
      </div>
    </div>
  );
};

export default PirateBuyVisuals;
