import React from "react";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";
import AssetCard from "./AssetCard";

const AssetCards: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <div className="w-[90%] h-auto mx-auto ">
      <div className="text-white font-bold gap-10 text-center flex flex-col p-10 justify-center items-center min-w-[275px] rounded-xl border-2 border-[#1b213a] bg-[rgba(49,65,131,0.1)] shadow-md shadow-[#1d2235]">
        <h1 className="text-white font-bold gap-10 font-display text-3xl">
          Arrland NFT summary
        </h1>
        <div className="flex justify-center gap-10 items-center flex-wrap ">
          <AssetCard
            user={user}
            assetName={"Pirates"}
            assetType={user?.inventory?.pirates?.length}
            assetImage={"./summaryAssets/pirates.png"}
          />
          <AssetCard
            user={user}
            assetName={"Items"}
            assetType={user?.inventory?.items?.length}
            assetImage={"./summaryAssets/items.png"}
          />
          <AssetCard
            user={user}
            assetName={"Assets"}
            assetType={user?.inventory?.assets?.summary?.length}
            assetImage={"./summaryAssets/assets.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default AssetCards;
