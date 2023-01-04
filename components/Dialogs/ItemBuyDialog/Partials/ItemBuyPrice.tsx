import React from "react";
import Spinner from "../../../Common/Spinner";

const ItemBuyPrice: React.FC<any> = ({
  order,
  dataReady,
  tokens,
  price,
}): JSX.Element => {
  if (!order) return;

  return (
    <div className="flex flex-row mb-2 justify-between dmd:mt-2 dmd:flex-col">
      <div className="text-2xl flex">
        <p className="text-2xl font-display text-elementor-text-3 mr-2 mxsm:ml-2">
          Price:{" "}
        </p>
        <div className="text-2xl">
          <div className="font-display font-bold text-elementor-text-1">
            {dataReady === true ? (
              tokens
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </div>
          <div className="font-display text-elementor-text-3">
            {dataReady === true ? (
              `($${price}USD)`
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

export default ItemBuyPrice;
