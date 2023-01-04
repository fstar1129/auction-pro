import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { setMarketplaceSelected } from "../../../state/marketplace/marketplaceSlice";
import { selectUser, setSelected } from "../../../state/user/userSlice";
const MarketplaceButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  return (
    <button
      className="mx-2 cursor-pointer flex items-center duration-150 hover:brightness-125"
      onClick={() => {
        if (user.inventory.selected === "pirates") {
          dispatch(setMarketplaceSelected("pirates"));
        }
        if (user.inventory.selected === "items") {
          dispatch(setMarketplaceSelected("items"));
        }
        if (user.inventory.selected === "assets") {
          dispatch(setMarketplaceSelected("assets"));
        }
        dispatch(setSelected("marketplace"));
      }}
    >
      {user.inventory.selected === "marketplace" ? (
        <div className="flex w-[125px] h-[30px] bg-[#5CA2C6] border-[#9a9e99] border-2 rounded-md"></div>
      ) : (
        <div className="flex w-[125px] h-[30px] border-[#6EC1E4] border-2 rounded-md"></div>
      )}

      <div className="absolute">
        <div className="flex justify-center items-center text-center">
          <p
            className={`text-sm font-bold font-display w-[125px] mx-auto ${
              user.inventory.selected === "marketplace"
                ? "text-black"
                : "text-elementor-text-3"
            }`}
          >
            Marketplace
          </p>
        </div>
      </div>
    </button>
  );
};

export default MarketplaceButton;
