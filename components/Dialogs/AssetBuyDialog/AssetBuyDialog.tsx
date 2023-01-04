import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import axios from "axios";
import Spinner from "../../Common/Spinner";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import { showError, showSuccess } from "../../../api/toasts";
import {
  selectUser,
  fetchUserImxCollections,
  setTokens,
} from "../../../state/user/userSlice";
import { useMoralisCloudFunction } from "react-moralis";
import useFetchCurrencies from "../../../hooks/useFetchCurrencies";
import AssetVisuals from "./Partials/AssetVisuals";
import Moralis from "moralis-v1";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import DialogRightArrow from "../Partials/DialogRightArrow";
import {
  selectMarketplace,
  setActiveIndex,
  setBuyStatus,
} from "../../../state/marketplace/marketplaceSlice";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";
import useCheckCurrency from "../../../hooks/useCheckCurrency";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2500;

const AssetBuyDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const marketplace = useAppSelector(selectMarketplace);
  const user = useAppSelector(selectUser);
  const dialog = useAppSelector(selectDialog);
  const order = dialog.currentDialogAdditionalData?.order;
  const [itemData, setItemData] = useState<any>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("BUY");
  const [disabled, setDisabled] = useState<boolean>(false);
  const currencies = useFetchCurrencies();
  const URL = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets/${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}/${order?.sell?.data?.token_id}`;

  const version = useMainnetVersion();

  const overallAssets = dialog.currentDialogAdditionalData?.overall;
  const assetsOrders = dialog.currentDialogAdditionalData?.orderAssets;

  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();

  const token = order?.buy?.data?.token_address;

  const { currency, decimals, tokens, currencyPrice } = useCheckCurrency(token);

  const tokenAmount = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, decimals)
  );

  const priceUSD = (tokenAmount * currencies[currencyPrice]?.usd).toFixed(2);

  let link = new LinkIMX(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const calculateIndex = () => {
    if (!assetsOrders) return;

    return assetsOrders?.findIndex((object) => {
      return order?.sell?.data?.id == object?.sell?.data?.id;
    });
  };
  const handlePreviousAsset = () => {
    const index = calculateIndex();
    const handlePrevIndex = () => {
      dispatch(setActiveIndex(marketplace.activeIndex - 1));
    };
    if (index === 0) {
      return;
    }

    if (marketplace.activeIndex === 0) {
      dispatch(setActiveIndex(0));
    } else {
      handlePrevIndex();
    }
  };

  const handleNextAsset = () => {
    const handleNextIndex = () => {
      dispatch(setActiveIndex(marketplace.activeIndex + 1));
    };
    if (marketplace.activeIndex >= overallAssets) {
      dispatch(setActiveIndex(overallAssets));
    } else {
      handleNextIndex();
    }
  };

  useEffect(() => {
    let index = calculateIndex();
    dispatch(setActiveIndex(index));
  }, []);

  useEffect(() => {
    if (dialog.isOpen === false) {
      dispatch(setActiveIndex(0));
    }
  }, [dialog.isOpen]);

  useEffect(() => {
    if (marketplace.activeIndex > overallAssets) {
      dispatch(setActiveIndex(overallAssets));
    }
  }, [marketplace.activeIndex]);

  const checkBuyStatus = async () => {
    try {
      const res = await axios.get(URL);
      if (res.data?.user === user.keys.walletAddress) {
        setTimeout(() => checkBuyStatus(), API_CALL_REPEAT_TIME);
      } else {
        await dispatch(
          fetchUserImxCollections({
            walletAddress: user.keys.walletAddress,
            piratesMetaCloudFunction,
          })
        );
        setTimeout(() => {
          dispatch(setBuyStatus(!marketplace.buyStatus));
          dispatch(closeDialog());
        }, API_CALL_REPEAT_TIME);
        showSuccess(
          order?.sell.data.properties?.name + " was bought successfully!"
        );
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const buyItem = async () => {
    setButtonText("BUYING NOW");
    setDisabled(true);
    try {
      await link.buy({
        orderIds: [order?.order_id],
      });

      await checkBuyStatus();
      await dispatch(
        fetchUserImxCollections({
          walletAddress: user.keys.walletAddress,
          piratesMetaCloudFunction,
        })
      );

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v2/balances/${user.keys.walletAddress}`
      );

      const eth = res?.data?.result?.filter((bal) => bal?.symbol === "ETH");
      const usdc = res?.data?.result?.filter((bal) => bal?.symbol === "USDC");
      const imx = res?.data?.result?.filter((bal) => bal?.symbol === "IMX");

      setTimeout(() => {
        dispatch(
          setTokens({
            ...user.tokens,
            eth:
              parseFloat(Moralis.Units.FromWei(eth[0]?.balance || 0, 18)) || 0,
            usdc:
              parseFloat(Moralis.Units.FromWei(usdc[0]?.balance || 0, 6)) || 0,
            imx:
              parseFloat(Moralis.Units.FromWei(imx[0]?.balance || 0, 18)) || 0,
          })
        );
      }, API_CALL_REPEAT_TIME);
    } catch (error) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying asset. Check if it still exist on marketplace or try again later."
      );
    }
  };

  const cancelListing = async () => {
    setDisabled(true);
    try {
      await link.cancel({
        orderId: order?.order_id,
      });
      setTimeout(() => {
        dispatch(setBuyStatus(!marketplace.buyStatus));
        dispatch(closeDialog());
      }, API_CALL_REPEAT_TIME);
      showSuccess(
        "Asset" +
          order?.sell.data.properties?.name +
          " was successfully removed from market"
      );
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying asset. Check if it still exist on marketplace or try again later."
      );
    }
  };

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        const res = await axios.get(URL);
        setItemData(res?.data);
        setDataReady(true);
      } catch (error) {
        dispatch(closeDialog());
        showError(
          "An error has occured while getting asset metadata. Please try again later."
        );
      }
    };
    fetchItemData();
  }, [order]);

  if (!order) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        ></Dialog.Overlay>
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full text-white max-w-[660px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxlg:top-[115%] mxlg:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousAsset}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2 justify-between">
            <AssetVisuals
              order={order}
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousAsset}
              trackingItem={assetsOrders}
              handleNext={handleNextAsset}
              overall={overallAssets}
            />

            <div className="w-full flex flex-col justify-between">
              <h1 className="font-display text-4xl font-bold mt-6 text-elementor-text-3 mx-1.5">
                {order?.sell?.data?.properties?.name}
              </h1>

              <div className="flex flex-col mb-2 justify-between dmd:mt-2 ml-2">
                <div className="text-2xl flex mb-1">
                  <p className="text-2xl font-display text-elementor-text-3 mr-2">
                    Price:{" "}
                  </p>
                  <div className="text-2xl">
                    <div className="font-display font-bold text-elementor-text-1">
                      {dataReady === true ? (
                        `${tokenAmount + " " + currency}`
                      ) : (
                        <div className="my-1">
                          <Spinner />
                        </div>
                      )}
                    </div>
                    <div className="font-display text-elementor-text-3">
                      {dataReady === true ? (
                        `($${priceUSD} USD)`
                      ) : (
                        <div className="my-1">
                          <Spinner />
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-row">
                  {user.keys.walletAddress === itemData?.user ? (
                    <button
                      className="duration-300 tracking-wider bg-[#3E6A86] text-elementor-text-2 rounded-sm text-xl font-display font-bold text-center w-full hover:bg-elementor-text-3 h-[64px] dmd:w-full mr-2 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25"
                      onClick={
                        !isConnectedToImx ? connectWalletToImx : cancelListing
                      }
                      disabled={version || disabled}
                    >
                      {!isConnectedToImx ? "CONNECT TO IMX" : "REMOVE LISTING"}
                    </button>
                  ) : (
                    <button
                      className="duration-300 tracking-wider bg-[#3E6A86] text-elementor-text-2 rounded-sm text-xl font-display font-bold text-center w-full hover:bg-elementor-text-3 h-[64px] dmd:justify-center dmd:w-full mr-2 disabled:hover:bg-[#3E6A86] disabled:cursor-not-allowed disabled:opacity-25"
                      onClick={!isConnectedToImx ? connectWalletToImx : buyItem}
                      disabled={
                        !dataReady ||
                        disabled ||
                        tokenAmount > tokens ||
                        version
                      }
                    >
                      {tokenAmount > tokens
                        ? "Not enough tokens"
                        : !isConnectedToImx
                        ? "CONNECT TO IMX"
                        : buttonText}
                    </button>
                  )}
                </div>
              </div>
            </div>
            <CloseDialogButton />
          </div>
          <div className="absolute top-[50%] -right-[70px] mxlg:top-[115%] mxlg:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={assetsOrders}
              activeIndex={marketplace.activeIndex}
              handleNext={handleNextAsset}
              overall={overallAssets}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default AssetBuyDialog;
