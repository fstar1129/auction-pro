import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { selectUser, setAssetsSelected } from "../../../state/user/userSlice";

const AssetsSwitcher = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full md:mb-0 mxlg:justify-center">
      <div className="flex flex-col sm:flex-row md:mb-0 items-start gap-2 ml-1 mxsm:ml-4">
        <div
          className="cursor-pointer flex items-center relative duration-150 hover:brightness-125"
          onClick={() => dispatch(setAssetsSelected("summary"))}
        >
          {user.inventory.assetsSelected === "summary" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full ">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.assets?.summary?.length}
              </p>
              <p
                className={`text-[.75rem] font-display w-[60%] ${
                  user.inventory.assetsSelected === "summary"
                    ? "text-black"
                    : "text-elementor-text-3"
                }`}
              >
                Summary
              </p>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer flex items-center relative duration-150 hover:brightness-125"
          onClick={() => dispatch(setAssetsSelected("chests"))}
        >
          {user.inventory.assetsSelected === "chests" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.assets?.chests?.length}
              </p>
              <p
                className={`text-[.75rem] font-display w-[60%] ${
                  user.inventory.assetsSelected === "chests"
                    ? "text-black"
                    : "text-elementor-text-3"
                }`}
              >
                {user.inventory.assets.chests?.length === 1
                  ? "Chest"
                  : "Chests"}
              </p>
            </div>
          </div>
        </div>
        <div
          className="cursor-pointer flex items-center relative mb-5 duration-150 hover:brightness-125"
          onClick={() => dispatch(setAssetsSelected("reservations"))}
        >
          {user.inventory.assetsSelected === "reservations" ? (
            <img src={"active.png"} className="w-[140px]" />
          ) : (
            <img src={"neutral.png"} className="w-[140px]" />
          )}

          <div className="absolute w-full">
            <div className="flex flex-row justify-between items-center text-center w-full">
              <p className="text-black text-sm font-display w-[40%] ml-[3px]">
                {user.inventory.assets?.reservations?.length}
              </p>
              <p
                className={`text-[.7rem] font-display w-[60%] ${
                  user.inventory.assetsSelected === "reservations"
                    ? "text-black"
                    : "text-elementor-text-3"
                }`}
              >
                {user.inventory.assets.reservations?.length === 1
                  ? "Reservation"
                  : "Reservations"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsSwitcher;
