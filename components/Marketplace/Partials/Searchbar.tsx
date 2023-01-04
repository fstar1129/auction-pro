import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  selectMarketplace,
  setOrderSearch,
} from "../../../state/marketplace/marketplaceSlice";
import { SearchIcon } from "./../../Common/Icons";

const Searchbar: React.FC = (): JSX.Element => {
  const marketplace = useAppSelector(selectMarketplace);
  const dispatch = useAppDispatch();
  const [value, setValue] = useState("");

  const handleReset = () => {
    dispatch(setOrderSearch(""));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    value.trim().length !== 0 ? dispatch(setOrderSearch(value)) : handleReset();
  };

  if (value.trim().length === 0) {
    handleReset();
  }

  return (
    <div>
      <form>
        <div className="flex justify-between font-display items-center min-w-[150px] sm:mt-0 border-[2px] rounded border-elementor-text-1 text-sm p-2 text-white h-[40px]">
          <input
            type="text"
            className="bg-elementor-1 outline-none w-[70%] mt-[2px]"
            placeholder={
              marketplace.marketplaceSelected === "pirates"
                ? "Search pirate..."
                : marketplace.marketplaceSelected === "assets"
                ? "Search asset..."
                : "Search item..."
            }
            onChange={(e) => {
              setValue(e.target.value);
            }}
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
              <SearchIcon className="mx-1  fill-elementor-text-1 w-[20px]" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
export default Searchbar;
