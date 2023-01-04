import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store-hooks";
import Pirates from "./Pirates/Pirates";
import Items from "./Items/Items";
import Assets from "./Assets/Assets";
import useFetchCurrencies from "../../hooks/useFetchCurrencies";
import axios from "axios";
import {
  selectMarketplace,
  setOrderAssetsAmount,
  setOrderItemsAmount,
  setOrderPiratesAmount,
} from "../../state/marketplace/marketplaceSlice";
import { selectUser, setTokens } from "../../state/user/userSlice";
import Moralis from "moralis-v1";

const URL_ITEMS = `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/orders`;
const PAGE_SIZE = 48;

const Marketplace: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const marketplace = useAppSelector(selectMarketplace);
  const currency = useFetchCurrencies();
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const fetchItemsAmount = async () => {
        const res = await axios.get(URL_ITEMS, {
          params: {
            sell_token_address: process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION,
            buy_token_address: marketplace.buyToken.buyTokenAddress,
            buy_token_type: marketplace.buyToken.buyTokenType,
            page_size: PAGE_SIZE,
            status: "active",
          },
        });
        dispatch(setOrderItemsAmount(res?.data?.result?.length));
      };
      fetchItemsAmount();
    } catch (err) {
      console.log(err);
    }
  }, [marketplace.buyToken.buyTokenAddress, marketplace.buyToken.buyTokenType]);

  useEffect(() => {
    try {
      const fetchAssetsAmount = async () => {
        const res = await axios.get(URL_ITEMS, {
          params: {
            sell_token_address: process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION,
            buy_token_address: marketplace.buyToken.buyTokenAddress,
            buy_token_type: marketplace.buyToken.buyTokenType,
            page_size: PAGE_SIZE,
            status: "active",
          },
        });
        dispatch(setOrderAssetsAmount(res?.data?.result?.length));
      };
      fetchAssetsAmount();
    } catch (err) {
      console.log(err);
    }
  }, [marketplace.buyToken.buyTokenAddress, marketplace.buyToken.buyTokenType]);

  useEffect(() => {
    try {
      const fetchPiratesAmount = async () => {
        const res = await axios.get(URL_ITEMS, {
          params: {
            sell_token_address: process.env.NEXT_PUBLIC_IMX_PIRATES_COLLECTION,
            buy_token_address: marketplace.buyToken.buyTokenAddress,
            buy_token_type: marketplace.buyToken.buyTokenType,
            page_size: PAGE_SIZE,
            status: "active",
          },
        });
        dispatch(setOrderPiratesAmount(res?.data?.result?.length));
      };
      fetchPiratesAmount();
    } catch (err) {
      console.log(err);
    }
  }, [marketplace.buyToken.buyTokenAddress, marketplace.buyToken.buyTokenType]);

  useEffect(() => {
    const fetchUserBalance = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v2/balances/${user.keys.walletAddress}`
        );
        if (res?.data?.result.length !== 0) {
          dispatch(
            setTokens({
              ...user.tokens,
              ethereum:
                parseFloat(
                  Moralis.Units.FromWei(
                    res?.data?.result.filter((bal) => bal?.symbol === "ETH")[0]
                      ?.balance || 0,
                    18
                  )
                ) || 0,
              usdc: parseFloat(
                Moralis.Units.FromWei(
                  res?.data?.result.filter((bal) => bal?.symbol === "USDC")[0]
                    ?.balance || 0,
                  6
                )
              ),
              imx: Number(
                (res?.data?.result.filter((bal) => bal?.symbol === "IMX")[0]
                  ?.balance || 0) /
                  10 ** 18 || 0
              ),
            })
          );
        }
        if (res?.data?.result.length === 0) {
          dispatch(setTokens({ ...user.tokens, ethereum: 0, usdc: 0, imx: 0 }));
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserBalance();
  }, [user.keys.walletAddress, user.inventory.selected]);

  switch (marketplace.marketplaceSelected) {
    case "pirates":
      return <Pirates currency={currency} />;
      break;
    case "items":
      return <Items currency={currency} />;
      break;
    case "assets":
      return <Assets currency={currency} />;
      break;
  }
};

export default Marketplace;
