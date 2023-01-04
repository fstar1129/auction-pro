import React, { useEffect, useState } from "react";
import Empty from "../Common/Empty";
import Asset from "./Partials/Asset";
import { useAppSelector } from "../../app/store-hooks";
import GlobalStats from "../GlobalStats/GlobalStats";
import { selectUser } from "../../state/user/userSlice";

type TAssets = {
  id: string;
  token_id: string;
  image_url: string;
  metadata?: {
    name?: string;
    image_url?: string;
    type?: string;
  };
};

interface IAssetsProps {
  assets: Array<TAssets>;
  chests: Array<TAssets>;
  reservations: Array<TAssets>;
  assetsStats: any;
}

const Assets = ({
  assets,
  chests,
  reservations,
  assetsStats,
}: IAssetsProps): JSX.Element => {
  const user = useAppSelector(selectUser);
  if (assets?.length === 0) {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={assetsStats} />
        </div>
        <Empty name={"assets"} />
      </>
    );
  }
  return (
    <div className="mt-3">
      <GlobalStats stats={assetsStats} />
      <div className="flex flex-wrap justify-center sm:justify-start min-h-full pt-1 mxlg:justify-center mxlg:mb-8">
        {user.inventory.assetsSelected === "summary" &&
          assets?.map((asset) => {
            return <Asset asset={asset} key={asset?.token_id} />;
          })}
        {user.inventory.assetsSelected === "chests" &&
          chests?.map((chest) => {
            return <Asset asset={chest} key={chest?.token_id} />;
          })}
        {user.inventory.assetsSelected === "reservations" &&
          reservations?.map((reservation) => {
            return <Asset asset={reservation} key={reservation?.token_id} />;
          })}
      </div>
    </div>
  );
};

export default Assets;
