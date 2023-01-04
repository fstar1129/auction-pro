import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store-hooks";
import { setMarketplaceSelected } from "../../state/marketplace/marketplaceSlice";
import { selectUser, setSelected } from "../../state/user/userSlice";

const InventorySwitcher: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-col sm:flex-row justify-between mx-1 items-center w-full md:mb-0 mxlg:justify-center">
      <div className="flex flex-col sm:flex-row mb-5 md:mb-0 justify-between items-center mxmd:mb-0 sticky -top-[2px] z-10 py-2 mxsm:pb-0">
        <h1 className="font-display min-w-[174px] lg:mb-none text-elementor-text-3 -ml-1 mxsm:ml-0 mxsm:my-3">
          Your collection
        </h1>
        <button
          className="mx-2 cursor-pointer flex items-center relative ml-4 mxsm:ml-2 duration-150 hover:brightness-125 disabled:hover:brightness-100"
          disabled={user.inventory.selected === "pirates"}
          onClick={() => {
            dispatch(setSelected("pirates"));
            if (user.inventory.selected === "pirates") {
              dispatch(() => dispatch(setMarketplaceSelected("pirates")));
            }
          }}
        >
          {user.inventory.selected === "pirates" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.pirates?.length}
              </p>
              <p
                className={`text-sm font-display w-[60%] ${
                  user.inventory.selected === "pirates"
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
          disabled={user.inventory.selected === "items"}
          onClick={() => {
            if (user.inventory.selected === "items") {
              dispatch(() => dispatch(setMarketplaceSelected("items")));
            }
            dispatch(setSelected("items"));
          }}
        >
          {user.inventory.selected === "items" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.items?.length}
              </p>
              <p
                className={`text-sm font-display w-[60%] ${
                  user.inventory.selected === "items"
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
          disabled={user.inventory.selected === "assets"}
          onClick={() => {
            if (user.inventory.selected === "assets") {
              dispatch(() => dispatch(setMarketplaceSelected("assets")));
            }
            dispatch(setSelected("assets"));
          }}
        >
          {user.inventory.selected === "assets" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.assets?.summary?.length}
              </p>
              <p
                className={`text-sm font-display w-[60%] ${
                  user.inventory.selected === "assets"
                    ? "text-black"
                    : "text-elementor-text-3"
                }`}
              >
                Assets
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default InventorySwitcher;
