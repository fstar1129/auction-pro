import React, { useState } from "react";
import SortPanel from "./SortPanel";
import { SearchIcon } from "./Icons";
import { useAppDispatch, useAppSelector } from "../../app/store-hooks";
import {
  selectUser,
  setSearchItemsQuery,
  setSearchPiratesQuery,
} from "../../state/user/userSlice";

const InventoryFilterPanel: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [value, setValue] = useState("");

  const handleReset = () => {
    dispatch(setSearchPiratesQuery("")) && dispatch(setSearchItemsQuery(""));
    setValue("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    value.trim().length !== 0
      ? user.inventory.selected === "pirates"
        ? dispatch(setSearchPiratesQuery(value))
        : dispatch(setSearchItemsQuery(value))
      : handleReset();
  };

  return (
    <div className="flex flex-col mxmd:flex-wrap sm:flex-row items-center align-center mxsm:justify-center mxsm:flex-row-reverse mxsm:pt-3 mxsm:mr-6 mxxl:pb-2">
      <SortPanel />
      <form>
        <div className="flex justify-between font-display items-center min-w-[253px] sm:mt-0 border-[2px] rounded border-elementor-text-1 bg-elementor-1 text-sm p-2 text-white h-[40px] ml-3 mr-4 mxxl:content-center">
          <input
            type="text"
            className="bg-elementor-1 outline-none w-[70%] mt-[2px]"
            value={value}
            onChange={(e) => {
              e.target.value === "" ? handleReset() : setValue(e.target.value);
            }}
            placeholder={
              user.inventory.selected === "pirates"
                ? "Search pirate..."
                : "Search item..."
            }
          />
          <div className="flex justify-center items-center gap-[5px]">
            <button
              type="reset"
              onClick={() => handleReset()}
              className="h-full border-r-[1px] border-[#a7a4a47f] pr-2"
            >
              <img
                src={"exchange_and_buy/x_neutral.png"}
                className="w-[20px] h-auto cursor-pointer"
                onMouseEnter={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/x_active.png"
                  )
                }
                onMouseLeave={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/x_neutral.png"
                  )
                }
              />
            </button>
            <button type="submit" onClick={(e) => handleSubmit(e)}>
              <SearchIcon className="mx-1 text-elementor-text-1 fill-elementor-text-1 w-[20px]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InventoryFilterPanel;
