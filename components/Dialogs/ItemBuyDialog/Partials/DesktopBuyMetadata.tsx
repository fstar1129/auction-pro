import React, { useState, useEffect } from "react";
import Spinner from "../../../Common/Spinner";

const DesktopBuyMetadata: React.FC<any> = ({
  order,
  itemData,
  dataReady,
}): JSX.Element => {
  if (!order) return;

  return (
    <div className="dmd:hidden mb-2">
      <div className="flex flex-row justify-between mt-7 mr-2">
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Type</p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.type
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Color</p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.color
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Magic</p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.magic
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">
            Rum share
          </p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.rum_share
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4 mr-2">
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
          <p className="font-bold font-display text-elementor-text-1">Rarity</p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.rarity
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
          <p className="font-bold font-display text-elementor-text-1">
            Main purpose
          </p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.main_purpose
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
          <p className="font-bold font-display text-elementor-text-1">
            Secondary purpose
          </p>
          <span className="font-display text-elementor-text-3">
            {dataReady === true ? (
              itemData?.metadata?.secondary_purpose
            ) : (
              <div className="my-1">
                <Spinner />
              </div>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default DesktopBuyMetadata;
