import React from "react";
import Spinner from "../../Common/Spinner";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";

interface IHodlers {
  hodlers: string;
}

const TotalHolders: React.FC<IHodlers> = ({ hodlers }): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <div className="text-white font-bold flex items-center justify-center min-w-[80px] text-sm">
      <div className="text-white font-bold flex w-full">
        <div className="text-white text-md flex flex-row items-start justify-center font-display">
          <span className="font-display text-elementor-text-3 mr-[5px]">
            Total hodlers:
          </span>

          {user.status === "loading" ? <Spinner /> : hodlers || "0"}
        </div>
      </div>
    </div>
  );
};

export default TotalHolders;
