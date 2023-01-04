import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import PirateBuyVisuals from "./Partials/PirateBuyVisuals";
import SingleMetadataItem from "./Partials/SingleMetadataItem";
import PiratePrice from "./Partials/PiratePrice";
import useFetchCurrencies from "../../../hooks/useFetchCurrencies";
import {
  fetchUserImxCollections,
  selectUser,
  setTokens,
} from "../../../state/user/userSlice";
import { showError, showSuccess, showWarning } from "../../../api/toasts";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import { useMoralisCloudFunction } from "react-moralis";
import Moralis from "moralis-v1";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import DialogRightArrow from "../Partials/DialogRightArrow";
import PirateBuyButtons from "./Partials/PirateBuyButtons";
import {
  selectMarketplace,
  setActiveIndex,
  setBuyStatus,
} from "../../../state/marketplace/marketplaceSlice";
import useCheckCurrency from "../../../hooks/useCheckCurrency";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2500;

const PirateBuyDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const order = dialog.currentDialogAdditionalData?.order;
  const user = useAppSelector(selectUser);
  const marketplace = useAppSelector(selectMarketplace);
  let link = new LinkIMX(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  const [pirateData, setPirateData] = useState<any>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [expandedMetadata, setExpandedMetadata] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("BUY");
  const [disabled, setDisabled] = useState<boolean>(false);
  const URL = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets/${process.env.NEXT_PUBLIC_IMX_PIRATES_COLLECTION}/${order?.sell?.data?.token_id}`;
  const currencies = useFetchCurrencies();

  const version = useMainnetVersion();

  const overallPirates = dialog.currentDialogAdditionalData?.overall;
  const piratesOrders = dialog.currentDialogAdditionalData?.orderPirates;

  const token = order?.buy?.data?.token_address;

  const { currency, decimals, currencyPrice } = useCheckCurrency(token);

  const tokenAmount = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, decimals)
  );

  const priceUSD = (tokenAmount * currencies[currencyPrice]?.usd).toFixed(2);

  const openMetadata = () => {
    setExpandedMetadata((current) => !current);
  };

  const calculateIndex = () => {
    if (!piratesOrders) return;

    return piratesOrders?.findIndex((object) => {
      return order?.sell?.data?.id == object?.sell?.data?.id;
    });
  };
  const handlePreviousPirate = () => {
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

  const handleNextPirate = () => {
    const handleNextIndex = () => {
      dispatch(setActiveIndex(marketplace.activeIndex + 1));
    };
    if (marketplace.activeIndex >= overallPirates) {
      dispatch(setActiveIndex(overallPirates));
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
    if (marketplace.activeIndex > overallPirates) {
      dispatch(setActiveIndex(overallPirates));
    }
  }, [marketplace.activeIndex]);

  useEffect(() => {
    const fetchPirateData = async () => {
      try {
        const res = await axios.get(URL);
        setPirateData(res?.data);
        setDataReady(true);
      } catch (error) {
        console.log("Error! " + error);
        dispatch(closeDialog());
        showError(
          "Error occured while getting pirate metadata. Please try again later."
        );
      }
    };
    fetchPirateData();
  }, [order, overallPirates]);

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
        dispatch(closeDialog());
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const buyPirate = async () => {
    setButtonText("BUYING NOW");
    setDisabled(true);
    if (user.keys.walletAddress === order?.user) {
      showWarning(
        "Pirate" + order?.sell.data.properties?.name + " is your property."
      );
    } else {
      try {
        await link.buy({
          orderIds: [order?.order_id],
        });

        checkBuyStatus();
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
                parseFloat(Moralis.Units.FromWei(eth[0]?.balance || 0, 18)) ||
                0,
              usdc:
                parseFloat(Moralis.Units.FromWei(usdc[0]?.balance || 0, 6)) ||
                0,
              imx:
                parseFloat(Moralis.Units.FromWei(imx[0]?.balance || 0, 18)) ||
                0,
            })
          );
        }, API_CALL_REPEAT_TIME);
        setTimeout(() => {
          dispatch(setBuyStatus(!marketplace.buyStatus));
          dispatch(closeDialog());
        }, API_CALL_REPEAT_TIME);
        showSuccess(
          "Successfully bought pirate: " +
            order?.sell.data.properties?.name +
            "!"
        );
      } catch (error) {
        dispatch(closeDialog());
        showError(
          "Error occured while buying pirate. Check if it still exist on marketplace or try again later."
        );
      }
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
        order?.sell.data.properties?.name +
          " was successfully removed from market!"
      );
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying item. Check if it still exist on marketplace or try again later."
      );
    }
  };

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  if (!order) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-20 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center duration-300">
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

        <div className="inline-block w-full text-white max-w-[980px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxxl:top-[110%] mxxl:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousPirate}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2">
            <PirateBuyVisuals
              pirate={order}
              dataReady={dataReady}
              user={user}
              cancelListing={cancelListing}
              buyPirate={buyPirate}
              trackingItem={piratesOrders}
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousPirate}
              handleNext={handleNextPirate}
              overall={overallPirates}
              disabled={disabled}
              buttonText={buttonText}
              version={version}
            />
            <div className="w-full">
              <h1 className="font-display text-4xl font-bold my-6 text-elementor-text-3 ml-0.5 mxsm:ml-2">
                {order?.sell?.data?.properties?.name}
              </h1>
              <div
                className={
                  expandedMetadata
                    ? "flex flex-wrap justify-between mt-7 mr-1 overflow-hidden relative pb-8 dsm:justify-evenly -ml-1 mxsm:ml-1"
                    : "flex flex-wrap justify-between mt-7 mr-1.5 h-[187px] overflow-hidden relative -ml-0.5 dsm:justify-evenly mxsm:ml-1 mxsm:mr-1"
                }
              >
                <div className="flex flex-col absolute z-50 bottom-0 w-full justify-center text-center ml-auto mr-auto bg-gradient-to-b from-transparent to-elementor-text-2">
                  {expandedMetadata ? (
                    <img
                      className="duration-300 h-5 cursor-pointer hover:fill-elementor-text-3"
                      src={"filter_icons/arrowup.svg"}
                      alt="Arrow up"
                      onClick={openMetadata}
                    />
                  ) : (
                    <img
                      className="h-5 mb-2.5 cursor-pointer"
                      src={"filter_icons/arrowdown.svg"}
                      alt="Arrow down"
                      onClick={openMetadata}
                    />
                  )}
                </div>
                <SingleMetadataItem
                  attribute="Type"
                  value={pirateData?.metadata?.type}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Emotion"
                  value={pirateData?.metadata?.emotion}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Skin"
                  value={pirateData?.metadata?.skin}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Eyes"
                  value={pirateData?.metadata?.eyes}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Monocle"
                  value={pirateData?.metadata?.monocle}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Eyepatch"
                  value={pirateData?.metadata?.eyepatch}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Hair"
                  value={pirateData?.metadata?.hairs}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Earrings"
                  value={pirateData?.metadata?.earrings}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Mouth"
                  value={pirateData?.metadata?.mouth}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Jewelry"
                  value={pirateData?.metadata?.jewelry}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Mouth"
                  value={pirateData?.metadata?.mouth}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Facial hair"
                  value={pirateData?.metadata?.facialhairs}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Hair color"
                  value={pirateData?.metadata?.["hairs color"]}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Scars"
                  value={pirateData?.metadata?.scars}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Tatoo"
                  value={pirateData?.metadata?.tatoo}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Animal"
                  value={pirateData?.metadata?.animal}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Accessories"
                  value={pirateData?.metadata?.accessories}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Hat"
                  value={pirateData?.metadata?.hat}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Shirt"
                  value={pirateData?.metadata?.shirt}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Shirt color"
                  value={pirateData?.metadata?.["shirt color"]}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Coat"
                  value={pirateData?.metadata?.coat}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Coat color"
                  value={pirateData?.metadata?.["coat color"]}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Belt"
                  value={pirateData?.metadata?.belt}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Left hand"
                  value={pirateData?.metadata?.["left hand"]}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Right hand"
                  value={pirateData?.metadata?.["right hand"]}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Background"
                  value={pirateData?.metadata?.background}
                  dataReady={dataReady}
                />
                <SingleMetadataItem
                  attribute="Arrlandum"
                  value={pirateData?.metadata?.arrlandum}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Bones"
                  value={pirateData?.metadata?.bones}
                  dataReady={dataReady}
                />

                <SingleMetadataItem
                  attribute="Pirate"
                  value={pirateData?.metadata?.pirate}
                  dataReady={dataReady}
                />
              </div>

              <PiratePrice
                pirate={order}
                tokens={tokenAmount + " " + currency}
                price={priceUSD}
                dataReady={dataReady}
              />

              <div className="hidden m-2 mxsm:block">
                <PirateBuyButtons
                  pirate={order}
                  user={user}
                  cancelListing={cancelListing}
                  buyPirate={buyPirate}
                  version={version}
                  buttonText={buttonText}
                />
              </div>

              <div className="text-lg flex flex-col w-full">
                <CloseDialogButton />
              </div>
            </div>
          </div>
          <div className="absolute top-[50%] -right-[70px] mxxl:top-[110%] mxxl:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={piratesOrders}
              activeIndex={marketplace.activeIndex}
              handleNext={handleNextPirate}
              overall={overallPirates}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default PirateBuyDialog;
