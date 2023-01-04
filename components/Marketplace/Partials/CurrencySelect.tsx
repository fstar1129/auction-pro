import React, { useState, useRef } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  selectMarketplace,
  setActiveIndex,
  setBuyToken,
} from "../../../state/marketplace/marketplaceSlice";
const CurrencySelect: React.FC = (): JSX.Element => {
  const marketplace = useAppSelector(selectMarketplace);

  const [dropdown, setDropdown] = useState(false);
  const [selected, setSelected] = useState(
    marketplace.buyToken.buyTokenType === "ETH"
      ? "ETH"
      : marketplace.buyToken.buyTokenType === "ERC20" &&
        marketplace.buyToken.buyTokenAddress ===
          process.env.NEXT_PUBLIC_USDC_ADDRESS
      ? "USD-C"
      : marketplace.buyToken.buyTokenAddress ===
        process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS
      ? "IMX"
      : ""
  );
  const handleDropdown = () => setDropdown(!dropdown);
  const dispatch = useAppDispatch();

  const ref = useRef(null);

  const closeDropdown = (e) => {
    if (ref.current && setDropdown && !ref.current.contains(e.target)) {
      setDropdown(false);
    }
  };
  document.addEventListener("mousedown", closeDropdown);

  return (
    <div
      className="relative inline-block text-left dmd:text-center"
      ref={ref}
      onClick={() => {
        handleDropdown();
      }}
    >
      <button
        className={
          dropdown
            ? "flex w-full h-[40px] min-w-[75px] justify-center items-center rounded-md pl-1 pr-2 py-2 text-[1rem] text-elementor-text-1 font-bold font-display gap-3 border-x-2 border-t-2 border-elementor-text-1 duration-300"
            : "flex w-full h-[40px] min-w-[75px] justify-center items-center rounded-md pl-1 pr-2 py-2 text-[1rem] text-elementor-text-3 font-bold font-display gap-3 border-x-2 border-t-2 border-transparent duration-300 hover:text-white"
        }
      >
        {
          <div
            className={`flex justify-center items-center font-display ${
              selected === "USD-C" || selected === "IMX"
                ? "gap-x-[6px]"
                : "gap-x-[2px]"
            } `}
          >
            <img
              src={`${
                selected === "ETH"
                  ? "./ETH.svg"
                  : selected === "IMX"
                  ? "./IMX.svg"
                  : "USD-C.svg"
              }`}
              className={` ${
                selected === "IMX"
                  ? "w-[20px] h-[20px] mb-0.5"
                  : "w-[24px] h-[24px] mb-0.5"
              }`}
            />
            <p className="font-display">{selected}</p>
          </div>
        }
        {dropdown ? (
          <img className="w-[10px] h-[10px]" src={"filter_icons/arrowup.svg"} />
        ) : (
          <img
            className="w-[10px] h-[10px]"
            src={"filter_icons/arrowdown.svg"}
          />
        )}
      </button>

      <div className="absolute right-0 z-10 mt-2 w-[150px] rounded-md bg-elementor-text-2">
        <div
          className={`flex flex-col items-start ease-linear duration-150 ${
            dropdown
              ? "h-[115px] py-1 border-x-2 border-b-2 border-elementor-text-1 rounded-md"
              : "h-0 overflow-hidden"
          }`}
        >
          <button
            className={`text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-300 hover:text-white disabled:text-[#44B1E4]`}
            disabled={marketplace.buyToken.buyTokenType === "ETH"}
            onClick={() => {
              handleDropdown();
              setSelected("ETH");
              dispatch(
                setBuyToken({ buyTokenType: "ETH", buyTokenAddress: null })
              );
              dispatch(setActiveIndex(0));
            }}
          >
            <div className="flex justify-center items-center">
              <img
                src="./ETH.svg"
                className="w-[16px] h-[16px] -mt-1 ml-[1px]"
                alt="eth icon"
              />
              <p className="font-display ml-[11px]">ETH</p>
            </div>
          </button>
          <button
            className="text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-300 hover:text-white disabled:text-[#44B1E4]"
            disabled={
              marketplace.buyToken.buyTokenAddress ===
              process.env.NEXT_PUBLIC_USDC_ADDRESS
            }
            onClick={() => {
              handleDropdown();
              setSelected("USD-C");

              dispatch(
                setBuyToken({
                  buyTokenType: "ERC20",
                  buyTokenAddress: process.env.NEXT_PUBLIC_USDC_ADDRESS,
                })
              );
              dispatch(setActiveIndex(0));
            }}
          >
            <div className="flex justify-center items-center gap-1">
              <img
                src="./USD-C.svg"
                className="w-[16px] h-[16px] -mt-1"
                alt="eth icon"
              />
              <p className="font-display ml-2">USD-C</p>
            </div>
          </button>
          <button
            className="text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-100 hover:text-white disabled:text-[#44B1E4]"
            disabled={
              marketplace.buyToken.buyTokenAddress ===
              process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS
            }
            onClick={() => {
              handleDropdown();
              setSelected("IMX");
              dispatch(
                setBuyToken({
                  buyTokenType: "ERC20",
                  buyTokenAddress: process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS,
                })
              );
              dispatch(setActiveIndex(0));
            }}
          >
            <div className="flex justify-center items-center gap-1">
              <img
                src="./IMX.svg"
                className="w-[16px] h-[16px] -mt-1"
                alt="imx icon"
              />
              <p className="font-display ml-2">IMX</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CurrencySelect;
