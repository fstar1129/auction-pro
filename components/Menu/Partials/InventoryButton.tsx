import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { selectMarketplace } from "../../../state/marketplace/marketplaceSlice";
import { selectUser, setSelected } from "../../../state/user/userSlice";
const InventoryButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const marketplace = useAppSelector(selectMarketplace);
  return (
    <button
      className="mx-2 cursor-pointer flex items-center duration-150 hover:brightness-125"
      onClick={() => {
        if (marketplace.marketplaceSelected === "pirates") {
          dispatch(setSelected("pirates"));
        }
        if (marketplace.marketplaceSelected === "items") {
          dispatch(setSelected("items"));
        }
        if (marketplace.marketplaceSelected === "assets") {
          dispatch(setSelected("assets"));
        }
      }}
    >
      {user.inventory.selected === "pirates" ||
      user.inventory.selected === "items" ||
      user.inventory.selected === "assets" ? (
        <div className="flex w-[125px] h-[30px] bg-[#5CA2C6] border-[#9a9e99] border-2 rounded-md" />
      ) : (
        <div className="flex w-[125px] h-[30px] border-[#6EC1E4] border-2 rounded-md" />
      )}

      <div className="absolute">
        <div className="flex justify-center items-center text-center">
          <p
            className={`text-sm font-display font-bold w-[125px] mx-auto ${
              user.inventory.selected === "pirates" ||
              user.inventory.selected === "items" ||
              user.inventory.selected === "assets"
                ? "text-black"
                : "text-elementor-text-3"
            }`}
          >
            Inventory
          </p>
        </div>
      </div>
    </button>
  );
};

export default InventoryButton;
