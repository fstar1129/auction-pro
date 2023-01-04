import React, { useState, useEffect } from "react";
import Spinner from "../../../Common/Spinner";

const MobileBuyMetadata: React.FC<any> = ({
  order,
  itemData,
  dataReady,
}): JSX.Element => {
  if (!order) return;

  return (
    <div className="hidden mx-1 dmd:flex">
      <div className="flex flex-row justify-between flex-wrap dsm:justify-around mb-2 -ml-2 mxsm:ml-0.5">
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
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

export default MobileBuyMetadata;
