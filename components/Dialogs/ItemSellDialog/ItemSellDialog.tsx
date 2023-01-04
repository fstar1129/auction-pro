import React, { useState, useRef } from "react";
import { Link } from "@imtbl/imx-sdk";
import { Dialog } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import { showError, showSuccess, showWarning } from "../../../api/toasts";
import useFetchCurrencies from "../../../hooks/useFetchCurrencies";
import { useMoralisCloudFunction } from "react-moralis";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../state/user/userSlice";
import FeeInformation from "../Partials/FeeInformation";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2500;
const FEE = 1; //1%

const ItemSellDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const item = dialog.currentDialogAdditionalData;
  const user = useAppSelector(selectUser);
  const [price, setPrice] = useState<number>(0);
  const [usdPrice, setUsdPrice] = useState<number>(0);
  const [buttonText, setButtonText] = useState<string>("SELL ITEM");
  const [disabled, setDisabled] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>("Select currency");
  const [value, setValue] = useState<string>("");
  const version = useMainnetVersion();
  const handleDropdown = () => setDropdown(!dropdown);
  let link = new Link(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const currency = useFetchCurrencies();
  const ref = useRef(null);

  const fees = [
    {
      percentage: 1,
      recipient: "0x72a669f921543f234653b9401db406bedc32ea0e",
    },
  ];

  const closeDropdown = (e) => {
    if (ref.current && setDropdown && !ref.current.contains(e.target)) {
      setDropdown(false);
    }
  };
  document.addEventListener("mousedown", closeDropdown);

  const handleReset = () => {
    setValue("");
    setUsdPrice(0);
    setPrice(0);
  };

  const sellItem = async () => {
    const params =
      selected === "USD-C"
        ? {
            currencyAddress: process.env.NEXT_PUBLIC_USDC_ADDRESS,
            amount: price.toString(),
            tokenAddress: process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION,
            tokenId: item?.token_id,
            fees,
          }
        : selected === "IMX"
        ? {
            currencyAddress: process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS,
            amount: price.toString(),
            tokenAddress: process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION,
            tokenId: item?.token_id,
            fees,
          }
        : {
            amount: price.toString(),
            tokenAddress: process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION,
            tokenId: item?.token_id,
            fees,
          };
    if (price > 0) {
      setButtonText("SELLING IN PROGRESS");
      setDisabled(true);
      try {
        await link.sell(params);
        setTimeout(() => {
          dispatch(
            fetchUserImxCollections({
              walletAddress: user.keys.walletAddress,
              piratesMetaCloudFunction,
            })
          );
        }, API_CALL_REPEAT_TIME);
        setTimeout(() => {
          dispatch(closeDialog());
          showSuccess(
            "Item: " +
              item?.metadata?.name +
              " was listed for sale successfully! Check the Marketplace tab."
          );
        }, 4000);
      } catch (error) {
        console.error(error);
        dispatch(closeDialog());
        showWarning("Selling item: " + item?.metadata?.name + " was aborted.");
      }
    } else {
      showError("Please enter a price for your item!");
    }
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/[^\d.]|\.(?=.*\.)/g, "");
    setPrice(parseFloat(value));
    const calculated = (
      (parseFloat(value) + parseFloat(value) * (0.05 + FEE * 0.01)) *
      (selected === "ETH"
        ? currency["ethereum"]?.usd
        : selected === "USD-C"
        ? currency["usd-coin"]?.usd
        : currency["immutable-x"]?.usd)
    ).toFixed(2);
    setUsdPrice(parseFloat(calculated));
  };
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center flex justify-center items-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        />
        <div className="inline-block w-full text-elementor-text-3 max-w-[500px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-[#64a2bc] shadow-xl">
          <div className="bg-[#11131c] h-[325px] flex justify-center items-center">
            <CloseDialogButton />
            <div className="w-full h-full flex justify-center items-center flex-col gap-2">
              <h1 className="text-center font-display text-xl text-elementor-text-1 font-semibold">
                <span className="font-display text-elementor-text-3 text-xl font-normal">
                  Selling item:{" "}
                </span>
                {item?.metadata?.name}
              </h1>
              <div className="relative inline-block text-left" ref={ref}>
                <button
                  className={
                    dropdown
                      ? "flex w-full h-[40px] min-w-[75px] justify-center items-center rounded-md px-4 py-2 text-[1rem] text-elementor-text-1 font-bold font-display gap-3 border-x-2 border-t-2 border-elementor-text-1 duration-300"
                      : "flex w-full h-[40px] min-w-[75px] justify-center items-center rounded-md px-4 py-2 text-[1rem] text-elementor-text-3 font-bold font-display gap-3 border-x-2 border-t-2 border-transparent duration-300 hover:text-white"
                  }
                  onClick={handleDropdown}
                >
                  {
                    <div
                      className={`flex justify-center items-center font-display ${
                        selected === "USD-C" || selected === "IMX"
                          ? "gap-x-[6px]"
                          : "gap-x-[2px]"
                      } `}
                    >
                      {(selected === "ETH" ||
                        selected === "USD-C" ||
                        selected === "IMX") && (
                        <img
                          src={`${
                            selected === "ETH"
                              ? "ETH.svg"
                              : selected === "IMX"
                              ? "./IMX.svg"
                              : "USD-C.svg"
                          }`}
                          className="w-[24px] h-[24px]"
                        />
                      )}
                      <p className="font-display mt-[3px]">{selected}</p>
                    </div>
                  }
                  {dropdown ? (
                    <img
                      className="w-[10px] h-[10px]"
                      src={"filter_icons/arrowup.svg"}
                    />
                  ) : (
                    <img
                      className="w-[10px] h-[10px]"
                      src={"filter_icons/arrowdown.svg"}
                    />
                  )}
                </button>

                <div className="absolute right-0 mt-2 w-[150px] z-30 rounded-md bg-elementor-text-2">
                  <div
                    className={`flex flex-col items-start ease-linear duration-150  ${
                      dropdown
                        ? "h-[115px] py-1 border-x-2 border-b-2 border-elementor-text-1 rounded-md"
                        : "h-0 overflow-hidden"
                    }`}
                  >
                    <button
                      className={`text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-100 disabled:text-[#44B1E4] disabled:opacity-100 hover:text-white`}
                      disabled={selected === "ETH"}
                      onClick={() => {
                        handleDropdown();
                        setSelected("ETH");
                        handleReset();
                      }}
                    >
                      <div className="flex justify-center items-center">
                        <img
                          src="./ETH.svg"
                          className="w-[16px] h-[16px] mb-[3px] mr-2"
                          alt="eth icon"
                        />
                        <p className="font-display">ETH</p>
                      </div>
                    </button>
                    <button
                      className="text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-100 disabled:text-[#44B1E4] disabled:opacity-100 hover:text-white"
                      disabled={selected === "USD-C"}
                      onClick={() => {
                        handleDropdown();
                        setSelected("USD-C");
                        handleReset();
                      }}
                    >
                      <div className="flex justify-center items-center gap-1">
                        <img
                          src="./USD-C.svg"
                          className="w-[16px] h-[16px] mb-[3px] mr-1"
                          alt="eth icon"
                        />
                        <p className="font-display">USD-C</p>
                      </div>
                    </button>
                    <button
                      className="text-elementor-text-3 w-full flex justify-start items-center font-display font-medium px-4 py-2 text-sm cursor-pointer ease duration-100 disabled:text-[#44B1E4] disabled:opacity-100 hover:text-white"
                      disabled={selected === "IMX"}
                      onClick={() => {
                        handleDropdown();
                        setSelected("IMX");
                        handleReset();
                      }}
                    >
                      <div className="flex justify-center items-center gap-1">
                        <img
                          src="./IMX.svg"
                          className="w-[16px] h-[16px] mb-[3px] mr-1"
                          alt="imx icon"
                        />
                        <p className="font-display">IMX</p>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              {selected !== "Select currency" && (
                <>
                  <p className="font-display text-lg">
                    Price (
                    {selected === "ETH"
                      ? "ETH"
                      : selected === "IMX"
                      ? "IMX"
                      : "USD-C"}
                    ):
                  </p>
                  <input
                    type="text"
                    minLength={1}
                    placeholder="Enter the price"
                    className="w-[250px] text-white p-1 font-semibold border-[2px] rounded border-elementor-text-1 bg-elementor-text-2 outline-none font-display text-center"
                    onChange={(e) => {
                      handleChange(e);
                      setValue(e.target.value);
                    }}
                    value={value.replace(/[^\d.]|\.(?=.*\.)/g, "")}
                    maxLength={12}
                    disabled={version || disabled}
                  />

                  <p className="font-display mx-1 text-[#BC2020]">
                    {`${price ? price + price * (0.05 + FEE * 0.01) : "0"} ${
                      selected === "ETH"
                        ? "ETH"
                        : selected === "IMX"
                        ? "IMX"
                        : "USD-C"
                    } =
                    ${usdPrice ? usdPrice : "0"}`}
                    USD
                  </p>
                  <FeeInformation />
                  <button
                    disabled={version || disabled}
                    className="duration-300 z-10 text-md tracking-widest bg-[#3E6A86] px-2 py-1 rounded-sm font-display font-bold text-black text-center hover:bg-elementor-text-3 
                        disabled:opacity-[0.25] disabled:hover:cursor-not-allowed   disabled:hover:text-black disabled:hover:bg-[#3E6A86]"
                    onClick={!isConnectedToImx ? connectWalletToImx : sellItem}
                  >
                    {!isConnectedToImx ? "CONNECT TO IMX" : buttonText}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemSellDialog;
