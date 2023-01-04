import React from "react";

const MobileMetadata: React.FC<any> = ({ item }): JSX.Element => {
  if (!item) return;

  return (
    <div className="hidden mx-1 dmd:flex">
      <div className="flex flex-row justify-between flex-wrap dsm:justify-around mb-1 pb-20">
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">Type</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.type}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">Color</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.color}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">Magic</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.magic}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">
            Rum share:
          </p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.rum_share}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">Rarity</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.rarity}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">
            Main purpose
          </p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.main_purpose}
          </span>
        </div>
        <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
          <p className="font-bold font-display text-elementor-text-1">
            Secondary purpose
          </p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.secondary_purpose}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MobileMetadata;
