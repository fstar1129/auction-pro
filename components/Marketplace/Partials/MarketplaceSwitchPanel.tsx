import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  selectMarketplace,
  setActiveIndex,
  setFiltersAmount,
  setMarketplaceSelected,
  setOrderFilters,
} from "../../../state/marketplace/marketplaceSlice";
import AssetsFilters from "../Assets/Partials/AssetsFilters";
import ItemsFilters from "../Items/Partials/ItemsFilters";
import PiratesFilters from "../Pirates/Partials/PiratesFilters";
import CurrencySelect from "./CurrencySelect";
import MarketplaceSortPanel from "./MarketplaceSortPanel";
import Searchbar from "./Searchbar";

const MarketplaceSwitchPanel: React.FC = ({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const marketplace = useAppSelector(selectMarketplace);
  const [hide, setHide] = useState<boolean>(true);

  const openMetadata = () => {
    setHide((current) => !current);
  };

  const handleCollectionChange = () => {
    window.scrollTo(0, 0);
    dispatch(setOrderFilters({}));
    dispatch(setActiveIndex(0));
    dispatch(setFiltersAmount(0));
  };

  return (
    <div
      className={`flex flex-col sm:flex-row justify-between items-center w-full md:mb-0 flex-wrap mxlg:justify-center px-2 pt-3 mxxl:pt-2 mxxl:pb-1 overflow-visible
              ${
                hide
                  ? "mxxl:h-full"
                  : "mxsm:flex-row mxsm:h-[125px] mxsm:overflow-hidden"
              }`}
    >
      <div className="mxsm:flex flex-col absolute -bottom-1 right-10 justify-center text-center duration-150 hover:brightness-200 sm:hidden">
        {hide ? (
          <img
            className="h-5 mb-6 duration-300 cursor-pointer"
            src={"filter_icons/arrowup.svg"}
            alt="Arrow up"
            onClick={openMetadata}
          />
        ) : (
          <img
            className="h-5 mb-5 cursor-pointer"
            src={"filter_icons/arrowdown.svg"}
            alt="Arrow down"
            onClick={openMetadata}
          />
        )}
      </div>
      <div className="flex flex-col sm:flex-row md:mb-0 justify-between items-center py-1 mxsm:pb-0 mxxl:py-2">
        {hide ? (
          <>
            <h1 className="font-display text-left lg:mb-none text-elementor-text-3 mr-2 mxmd:text-center mxsm:py-3 mxsm:pt-4 mxsm:mr-0">
              Collections
            </h1>
            <button
              className="mx-2 cursor-pointer flex items-center relative duration-150 hover:brightness-125 disabled:hover:brightness-100"
              disabled={marketplace.marketplaceSelected === "pirates"}
              onClick={() => {
                handleCollectionChange();
                dispatch(setMarketplaceSelected("pirates"));
              }}
            >
              {marketplace.marketplaceSelected === "pirates" ? (
                <img src={"active.png"} className="w-[145px]" />
              ) : (
                <img src={"neutral.png"} className="w-[145px]" />
              )}

              <div className="absolute w-full">
                <div className="flex flex-row justify-between items-center text-center w-full">
                  <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                    {marketplace.marketplaceOrdersAmounts.orderPiratesAmount}
                  </p>
                  <p
                    className={`text-sm font-display w-[60%] ${
                      marketplace.marketplaceSelected === "pirates"
                        ? "text-black"
                        : "text-elementor-text-3"
                    }`}
                  >
                    Pirates
                  </p>
                </div>
              </div>
            </button>
            <button
              className="mx-2 cursor-pointer flex items-center relative duration-150 hover:brightness-125 disabled:hover:brightness-100"
              disabled={marketplace.marketplaceSelected === "items"}
              onClick={() => {
                handleCollectionChange();
                dispatch(setMarketplaceSelected("items"));
              }}
            >
              {marketplace.marketplaceSelected === "items" ? (
                <img src={"active.png"} className="w-[145px]" />
              ) : (
                <img src={"neutral.png"} className="w-[145px]" />
              )}

              <div className="absolute w-full">
                <div className="flex flex-row justify-between items-center text-center w-full">
                  <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                    {marketplace.marketplaceOrdersAmounts.orderItemsAmount}
                  </p>
                  <p
                    className={`text-sm font-display w-[60%] ${
                      marketplace.marketplaceSelected === "items"
                        ? "text-black"
                        : "text-elementor-text-3"
                    }`}
                  >
                    Items
                  </p>
                </div>
              </div>
            </button>

            <button
              className="mx-2 cursor-pointer flex items-center relative duration-150 hover:brightness-125 disabled:hover:brightness-100"
              disabled={marketplace.marketplaceSelected === "assets"}
              onClick={() => {
                handleCollectionChange();
                dispatch(setMarketplaceSelected("assets"));
              }}
            >
              {marketplace.marketplaceSelected === "assets" ? (
                <img src={"active.png"} className="w-[145px]" />
              ) : (
                <img src={"neutral.png"} className="w-[145px]" />
              )}

              <div className="absolute w-full">
                <div className="flex flex-row justify-between items-center text-center w-full">
                  <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                    {marketplace.marketplaceOrdersAmounts.orderAssetsAmount}
                  </p>
                  <p
                    className={`text-sm font-display w-[60%] ${
                      marketplace.marketplaceSelected === "assets"
                        ? "text-black"
                        : "text-elementor-text-3"
                    }`}
                  >
                    Assets
                  </p>
                </div>
              </div>
            </button>
          </>
        ) : (
          <></>
        )}
      </div>
      <div className="flex gap-3">
        {marketplace.marketplaceSelected === "pirates" && (
          <div className="flex justify-center items-center gap-3 flex-wrap mxlg:mt-2 mxsm:mt-0">
            <MarketplaceSortPanel />
            <Searchbar />
            <CurrencySelect />
            <PiratesFilters />
          </div>
        )}
        {marketplace.marketplaceSelected === "items" && (
          <div className="flex justify-center items-center gap-3 flex-wrap mxlg:mt-2 mxsm:mt-0">
            <MarketplaceSortPanel />
            <Searchbar />
            <CurrencySelect />
            <ItemsFilters />
          </div>
        )}
        {marketplace.marketplaceSelected === "assets" && (
          <div className="flex justify-center items-center gap-3 flex-wrap mxlg:mt-2 mxsm:mt-0">
            <MarketplaceSortPanel />
            <Searchbar />
            <CurrencySelect />
            <AssetsFilters />
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketplaceSwitchPanel;
