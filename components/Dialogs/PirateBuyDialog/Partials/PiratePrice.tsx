import React from "react";
import Spinner from "../../../Common/Spinner";

const PiratePrice: React.FC<any> = ({
  pirate,
  tokens,
  price,
  dataReady,
}): JSX.Element => {
  if (!pirate) return;
  return (
    <div className="flex flex-row justify-between dmd:flex-col mb-1 mxsm:ml-1">
      <div className="text-2xl flex">
        <p className="text-2xl font-display font-normal text-elementor-text-3 text-left mt-2.5 ml-1">
          Price:
        </p>
        <div className="flex flex-col">
          <div className="font-display font-bold text-elementor-text-1 mt-[11px] flex-row ml-2">
            {dataReady === true ? (
              `${tokens}`
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </div>
          <div className="font-display text-elementor-text-3 ml-1.5 dmd:bottom-14">
            {dataReady === true ? (
              `($${price} USD)`
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PiratePrice;
