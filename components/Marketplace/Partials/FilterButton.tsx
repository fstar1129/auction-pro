import React, { useEffect } from "react";
import { useAppSelector } from "../../../app/store-hooks";
import { selectMarketplace } from "../../../state/marketplace/marketplaceSlice";

interface TBUTTON {
  handleSidebar?: any;
  clicked: boolean;
}

const FilterButton: React.FC<TBUTTON> = ({
  handleSidebar,
  clicked,
}): JSX.Element => {
  const marketplace = useAppSelector(selectMarketplace);
  return (
    <button
      className={`flex w-[45px] h-[40px] justify-center items-center rounded-md text-[1.5rem] text-elementor-text-3 font-bold font-display duration-150 hover:brightness-125`}
      onClick={handleSidebar}
    >
      <div className="relative">
        <img
          src={clicked ? "./filters_active.svg" : "./filters.svg"}
          alt="filter icon"
          className="h-6 ease duration-150"
        />
        <div
          className={`absolute top-[-7.5px] right-[-12.5px] text-[0.8rem] w-[18px] h-[18px] bg-elementor-text-2 pt-[2px] pr-[1px]
          text-elementor-text-1 flex justify-center items-center rounded-sm font-display border-[2px] border-elementor-text-1 ${
            marketplace.marketplaceFilters.filtersAmount <= 9
              ? "w-[18px]"
              : "w-[26px] pl-[1px]"
          }`}
        >
          {marketplace.marketplaceFilters.filtersAmount}
        </div>
      </div>
    </button>
  );
};

export default FilterButton;
