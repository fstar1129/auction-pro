import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import SortingControls from "../../Common/SortingControls";
import {
  setSortDirection,
  setSorting,
  selectMarketplace,
} from "../../../state/marketplace/marketplaceSlice";

type TActiveFilter = {
  name: string;
  ascending: boolean;
  default: boolean;
};

const MarketplaceSortPanel: React.FC = ({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const marketplace = useAppSelector(selectMarketplace);
  const [activeFilter, setActiveFilter] = useState<TActiveFilter>({
    name: "",
    ascending: false,
    default: true,
  });

  const switchFilter = (key: string): void => {
    let ascending;

    if (activeFilter.name !== "rarity" && key === "rarity") {
      ascending = false;
    } else if (activeFilter.name === key) {
      ascending = !activeFilter.ascending;
    } else {
      ascending = true;
    }
    setActiveFilter({ name: key, ascending, default: false });
  };

  const resetDefaults = (): void => {
    setActiveFilter({ name: "id", ascending: false, default: true });
    dispatch(setSorting(""));
    dispatch(setSortDirection("asc"));
  };

  if (!activeFilter.ascending) {
    dispatch(setSortDirection("desc"));
  } else {
    dispatch(setSortDirection("asc"));
  }

  return (
    <div className="flex justify-center items-center py-1">
      <button
        className="text-sm mr-[10px] mt-[4px] cursor-pointer text-elementor-text-3 font-display uppercase tracking-wide duration-300 mxxl:ml-0 hover:text-white disabled:opacity-25 disabled:hover:text-elementor-text-3 disabled:cursor-not-allowed"
        disabled={marketplace.nullSearchResult === true}
        onClick={() => resetDefaults()}
      >
        Clear
      </button>
      <button
        className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200 disabled:hover:brightness-100 disabled:opacity-25 disabled:cursor-not-allowed"
        disabled={marketplace.nullSearchResult === true}
        onClick={() => {
          dispatch(setSorting("timestamp"));
          switchFilter("byDate");
        }}
      >
        <img
          src={"filter_icons/by_date.svg"}
          alt="Date"
          data-tip="Sort by Date"
        />
        {activeFilter.name === "byDate" && !activeFilter.default ? (
          <SortingControls activeFilter={activeFilter.ascending} />
        ) : null}
      </button>

      <button
        className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200 disabled:hover:brightness-100 disabled:opacity-25 disabled:cursor-not-allowed"
        disabled={marketplace.nullSearchResult === true}
        onClick={() => {
          dispatch(setSorting("sell_token_name"));
          switchFilter("byName");
        }}
      >
        <img
          src={"filter_icons/by_name.svg"}
          alt="Name"
          data-tip="Sort by Name"
        />
        {activeFilter.name === "byName" && !activeFilter.default ? (
          <SortingControls activeFilter={activeFilter.ascending} />
        ) : null}
      </button>

      <button
        className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200 disabled:hover:brightness-100 disabled:opacity-25 disabled:cursor-not-allowed"
        disabled={marketplace.nullSearchResult === true}
        onClick={() => {
          dispatch(setSorting("buy_quantity_with_fees"));
          switchFilter("byPrice");
        }}
      >
        <img
          src={"filter_icons/by_price.svg"}
          alt="Price"
          data-tip="Sort by Price"
        />
        {activeFilter.name === "byPrice" && !activeFilter.default ? (
          <SortingControls activeFilter={activeFilter.ascending} />
        ) : null}
      </button>
    </div>
  );
};

export default MarketplaceSortPanel;
