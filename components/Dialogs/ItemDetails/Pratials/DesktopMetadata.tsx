import React from "react";

const DesktopMetadata: React.FC<any> = ({ item }): JSX.Element => {
  if (!item) return;

  return (
    <div className="dmd:hidden mr-2 dsm:justify-between mb-2">
      <div className="flex flex-row justify-between mt-7">
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Type</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.type}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Color</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.color}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">Magic</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.magic}
          </span>
        </div>
        <div className="text-center border p-4 rounded-sm w-[150px]">
          <p className="font-bold font-display text-elementor-text-1">
            Rum share:
          </p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.rum_share}
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4">
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
          <p className="font-bold font-display text-elementor-text-1">Rarity</p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.rarity}
          </span>
        </div>
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
          <p className="font-bold font-display text-elementor-text-1">
            Main purpose
          </p>
          <span className="font-display text-elementor-text-3">
            {item?.metadata?.main_purpose}
          </span>
        </div>
        <div className="text-center border p-[18px] rounded-sm w-[200px]">
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

export default DesktopMetadata;
