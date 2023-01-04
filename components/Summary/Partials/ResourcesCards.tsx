import React from "react";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";
import ResourceCard from "./ResourceCard";

const ResourcesCards: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <div className="w-[90%] h-auto mx-auto ">
      <div className="text-white font-bold gap-10 text-center flex flex-col p-10 justify-center items-center min-w-[275px] rounded-xl border-2 border-[#1b213a] bg-[rgba(49,65,131,0.1)] shadow-md shadow-[#1d2235]">
        <h1 className="text-white font-bold gap-10 font-display text-3xl">
          Resources summary
        </h1>
        <div className="flex justify-center gap-10 items-center flex-wrap ">
          <ResourceCard
            user={user}
            assetName={"Stone"}
            assetType={user?.tokens?.stone}
            assetImage={"./resources/stone.png"}
          />
          <ResourceCard
            user={user}
            assetName={"Wood"}
            assetType={user?.tokens?.wood}
            assetImage={"./resources/wood.png"}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourcesCards;
