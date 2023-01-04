import React from "react";
import Spinner from "../../Common/Spinner";
import IUserReducerInterface from "../../../interfaces/IUserReducerInterface";
interface IAssets {
  user: IUserReducerInterface;
  assetName: string;
  assetType: number;
  assetImage: string;
}

const ResourceCard: React.FC<IAssets> = ({
  user,
  assetName,
  assetType,
  assetImage,
}): JSX.Element => {
  return (
    <div className="min-h-full">
      <div className="text-white font-bold mx-auto text-center flex items-center rounded-xl border-2 border-[#1b213a] min-h-[115px] bg-[rgba(35,46,90,0.1)] shadow-md shadow-[#1d2235]">
        <div className="text-white text-center m-1 mx-auto flex flex-col items-center w-full min-w-[275px] gap-2">
          <div className="flex justify-center items-center">
            <img src={assetImage} alt={assetName} className="h-[125px] p-3" />
            <div className="text-white flex flex-col items-center justify-center font-display w-[40%]">
              <span className="font-display text-center text-elementor-text-3 w-[150px]">
                {assetName}
              </span>
              {user?.status === "loading" ? <Spinner /> : `${assetType || "0"}`}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
