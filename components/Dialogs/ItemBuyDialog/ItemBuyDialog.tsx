import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import axios from "axios";
import { Link as LinkIMX } from "@imtbl/imx-sdk";
import { showError, showSuccess } from "../../../api/toasts";
import {
  selectUser,
  fetchUserImxCollections,
  setTokens,
} from "../../../state/user/userSlice";
import { useMoralisCloudFunction } from "react-moralis";
import useFetchCurrencies from "../../../hooks/useFetchCurrencies";
import ItemBuyVisuals from "./Partials/ItemBuyVisuals";
import DesktopBuyMetadata from "./Partials/DesktopBuyMetadata";
import MobileBuyMetadata from "./Partials/MobileBuyMetadata";
import ItemBuyPrice from "./Partials/ItemBuyPrice";
import ItemBuyButtons from "./Partials/ItemBuyButtons";
import Moralis from "moralis-v1";

import DialogRightArrow from "../Partials/DialogRightArrow";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import {
  selectMarketplace,
  setActiveIndex,
  setBuyStatus,
} from "../../../state/marketplace/marketplaceSlice";
import useCheckCurrency from "../../../hooks/useCheckCurrency";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const API_CALL_REPEAT_TIME = 2500;

const ItemBuyDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const marketplace = useAppSelector(selectMarketplace);
  const dialog = useAppSelector(selectDialog);

  const version = useMainnetVersion();

  const order = dialog.currentDialogAdditionalData?.order;
  const URL = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets/${process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION}/${order?.sell?.data?.token_id}`;

  const [itemData, setItemData] = useState<any>([]);
  const [dataReady, setDataReady] = useState<boolean>(false);
  const [buttonText, setButtonText] = useState<string>("BUY");
  const [disabled, setDisabled] = useState<boolean>(false);
  const currencies = useFetchCurrencies();
  const itemsOrders = dialog.currentDialogAdditionalData?.orderItems;
  const overallItems = dialog.currentDialogAdditionalData?.overall;
  let link = new LinkIMX(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);

  const token = order?.buy?.data?.token_address;

  const { currency, decimals, currencyPrice } = useCheckCurrency(token);

  const tokenAmount = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, decimals)
  );

  const priceUSD = (tokenAmount * currencies[currencyPrice]?.usd).toFixed(2);

  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );

  const calculateIndex = () => {
    if (!itemsOrders) return;

    return itemsOrders?.findIndex((object) => {
      return order?.sell?.data?.id == object?.sell?.data?.id;
    });
  };
  const handlePreviousItem = () => {
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

  const handleNextItem = () => {
    const handleNextIndex = () => {
      dispatch(setActiveIndex(marketplace.activeIndex + 1));
    };
    if (marketplace.activeIndex >= overallItems) {
      dispatch(setActiveIndex(overallItems));
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
    if (marketplace.activeIndex > overallItems) {
      dispatch(setActiveIndex(overallItems));
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
          "Item " +
            order?.sell.data.properties?.name +
            " was bought successfully!"
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
        "An error has occured while buying item. Check if it still exist on marketplace or try again later."
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
        "Item " +
          order?.sell.data.properties?.name +
          " was successfully removed from market"
      );
    } catch (err) {
      dispatch(closeDialog());
      showError(
        "An error has occured while buying item. Check if it still exist on marketplace or try again later."
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
          "An error has occured while getting item metadata. Please try again later."
        );
      }
    };
    fetchItemData();
  }, [order]);

  if (!order) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-20 overflow-y-auto"
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

        <div className="inline-block w-full text-white max-w-[960px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxxl:top-[110%] mxxl:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousItem}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2">
            <ItemBuyVisuals
              order={order}
              user={user}
              cancelListing={cancelListing}
              buyItem={buyItem}
              dataReady={dataReady}
              disabled={disabled}
              buttonText={buttonText}
              itemData={itemData}
              trackingItem={itemsOrders}
              activeIndex={marketplace.activeIndex}
              handlePrevious={handlePreviousItem}
              handleNext={handleNextItem}
              overall={overallItems}
              version={version}
            />

            <div className="w-full">
              <h1 className="font-display text-4xl font-bold my-6 text-elementor-text-3 mxsm:ml-2">
                {order?.sell.data.properties?.name}
              </h1>

              <DesktopBuyMetadata
                order={order}
                itemData={itemData}
                dataReady={dataReady}
              />

              <MobileBuyMetadata
                order={order}
                itemData={itemData}
                dataReady={dataReady}
              />

              <ItemBuyPrice
                order={order}
                dataReady={dataReady}
                tokens={tokenAmount + " " + currency}
                price={priceUSD}
              />

              <div className="hidden mxsm:block mxsm:m-2">
                <ItemBuyButtons
                  order={order}
                  user={user}
                  cancelListing={cancelListing}
                  buyItem={buyItem}
                  dataReady={dataReady}
                  disabled={disabled}
                  buttonText={buttonText}
                  itemData={itemData}
                  version={version}
                />
              </div>
            </div>
            <CloseDialogButton />
          </div>
          <div className="absolute top-[50%] -right-[70px] mxxl:top-[110%] mxxl:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={itemsOrders}
              activeIndex={marketplace.activeIndex}
              handleNext={handleNextItem}
              overall={overallItems}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemBuyDialog;
