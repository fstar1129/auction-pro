import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import SingleAsset from "../Partials/SingleAsset";
import Spinner from "../../Common/Spinner";
import NoResults from "../Partials/NoResults";
import { openDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import {
  selectMarketplace,
  setNullSearchResult,
  setOrderAssetsAmount,
} from "../../../state/marketplace/marketplaceSlice";

interface IItemsProps {
  currency?: any;
}

const URL = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/orders?status=active`;

const PAGE_SIZE = 48;

const Assets: React.FC<IItemsProps> = ({ currency }): JSX.Element => {
  const marketplace = useAppSelector(selectMarketplace);

  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const [ordersAssets, setOrdersAssets] = useState([]);

  const [scrollLoading, setScrollLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(true);

  let cursor = null;
  let OnScrollFetchedAssets = [];
  let remaining = 1;

  useEffect(() => {
    try {
      const fetchAssetsOrders = async () => {
        setLoading(true);
        setFetched(false);
        window.scrollTo(0, 0);
        const res = await axios.get(URL, {
          params: {
            sell_token_address: process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION,
            sell_metadata: marketplace.marketplaceFilters.orderFilters,
            page_size: PAGE_SIZE,
            sell_token_name: marketplace.orderSearch,
            direction: marketplace.sortDirection,
            order_by: marketplace.sort,
            buy_token_address: marketplace.buyToken.buyTokenAddress,
            buy_token_type: marketplace.buyToken.buyTokenType,
          },
          headers: { "Content-Type": "application/json" },
        });
        setOrdersAssets(res?.data?.result);
        setLoading(false);
        setFetched(true);
        remaining = res?.data?.remaining;
        cursor = res?.data?.cursor;
        OnScrollFetchedAssets = res?.data?.result;
        if (res?.data?.result?.length === 0) {
          dispatch(setNullSearchResult(true));
        } else {
          dispatch(setNullSearchResult(false));
        }
      };
      fetchAssetsOrders();
    } catch (err) {
      console.log(err);
    }
  }, [
    marketplace.marketplaceFilters.orderFilters,
    marketplace.orderSearch,
    marketplace.sortDirection,
    marketplace.sort,
    marketplace.buyStatus,
    marketplace.buyToken.buyTokenType,
    marketplace.buyToken.buyTokenAddress,
  ]);

  useEffect(() => {
    const fetchAssetsOrdersOnScorll = async () => {
      setScrollLoading(true);
      setFetched(false);
      try {
        const res = await axios.get(URL, {
          params: {
            sell_token_address: process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION,
            sell_metadata: marketplace.marketplaceFilters.orderFilters,
            page_size: PAGE_SIZE,
            cursor: cursor,
            sell_token_name: marketplace.orderSearch,
            direction: marketplace.sortDirection,
            order_by: marketplace.sort,
            buy_token_address: marketplace.buyToken.buyTokenAddress,
            buy_token_type: marketplace.buyToken.buyTokenType,
          },
        });
        OnScrollFetchedAssets = OnScrollFetchedAssets.concat(res?.data?.result);
        remaining = res?.data?.remaining;
        cursor = res?.data?.cursor;
        if (res?.data?.result?.length === 0) {
          dispatch(setNullSearchResult(true));
        } else {
          dispatch(setNullSearchResult(false));
        }
        setOrdersAssets(OnScrollFetchedAssets);
        setFetched(true);
        setScrollLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    const onScroll = function () {
      if (window.innerHeight + window.scrollY === document.body.offsetHeight) {
        if (remaining === 1 && fetched) {
          fetchAssetsOrdersOnScorll();
        }
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [
    marketplace.marketplaceFilters.orderFilters,
    marketplace.orderSearch,
    marketplace.sortDirection,
    marketplace.sort,
    marketplace.buyStatus,
    marketplace.buyToken.buyTokenType,
    marketplace.buyToken.buyTokenAddress,
  ]);

  useEffect(() => {
    if (dialog.isOpen === true) {
      dispatch(
        openDialog({
          currentDialog: "ASSET_BUY_DIALOG",
          currentDialogAdditionalData: {
            order: ordersAssets[marketplace.activeIndex],
            overall: ordersAssets?.length,
          },
        })
      );
    }
  }, [marketplace.activeIndex]);

  useEffect(() => {
    dispatch(setOrderAssetsAmount(ordersAssets.length));
  }, [ordersAssets]);

  return (
    <div className="flex flex-wrap justify-center sm:justify-start items-center w-full min-h-full ">
      <div
        className={`flex flex-wrap justify-center mt-1 sm:justify-start min-h-[55.5vh] w-full mxlg:justify-center pt-5`}
      >
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <>
            {ordersAssets.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    dispatch(
                      openDialog({
                        currentDialog: "ASSET_BUY_DIALOG",
                        currentDialogAdditionalData: {
                          order: item,
                          orderAssets: ordersAssets,
                          overall: ordersAssets?.length,
                        },
                      })
                    );
                  }}
                >
                  <SingleAsset
                    order={item}
                    key={item?.token_id}
                    price={
                      currency[
                        item.buy?.data?.token_address ===
                        process.env.NEXT_PUBLIC_USDC_ADDRESS
                          ? "usd-coin"
                          : item?.buy?.data?.token_address ===
                            process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS
                          ? "immutable-x"
                          : "ethereum"
                      ]?.usd || currency["ethereum"]?.usd
                    }
                    tokenType={item?.buy}
                  />
                </div>
              );
            })}
            <div className="w-full flex justify-center items-start h-[24px] mxsm:h-[32px]">
              {scrollLoading && remaining === 1 && <Spinner />}
            </div>
            {ordersAssets?.length === 0 && fetched && <NoResults />}
          </>
        )}
      </div>
    </div>
  );
};

export default Assets;
