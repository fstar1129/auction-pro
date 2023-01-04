import React from "react";
import Spinner from "../../Common/Spinner";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";

interface IMinted {
  minted: string;
}

const TotalMinted: React.FC<IMinted> = ({ minted }): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <div className="text-white font-bold flex items-center justify-center min-w-[100px] mx-[10px] text-sm">
      <div className="text-white text-left font-bold mx-auto flex items-center w-full">
        <div className="text-white text-md flex flex-row items-start justify-center font-display">
          <span className="font-display text-elementor-text-3 mr-[5px]">
            {`Overall ${
              user.inventory.selected === "pirates"
                ? "pirates"
                : user.inventory.selected === "items"
                ? "items"
                : "assets"
            } minted:`}
          </span>
          {user.status === "loading" ? <Spinner /> : minted || "0"}
        </div>
      </div>
    </div>
  );
};

export default TotalMinted;
