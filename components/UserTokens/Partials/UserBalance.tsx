import React from "react";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";
import Spinner from "../../Common/Spinner";

const UserBalance: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);

  return (
    <div className="flex justify-start items-center mb-1 ml-1 mxlg:flex-wrap gap-6 mxmd:gap-7 mxmd:justify-around mxsm:py-2">
      <div className="text-white font-bold mx-auto flex items-center dsm:justify-center">
        <div className="text-white text-left font-bold flex items-center w-full">
          <img
            src={"ETH.svg"}
            alt="eth Balance"
            className="w-[30px] h-[30px] mr-[10px] mb-[3px]"
          />
          <div className="text-white text-sm flex flex-col items-start justify-center font-display">
            <span className="font-display text-elementor-text-3">ETH</span>
            {user.status === "loading" ? (
              <Spinner />
            ) : (
              `${user.tokens?.ethereum?.toFixed(5) || "0.00"}`
            )}
          </div>
        </div>
      </div>

      <div className="text-white font-bold mx-auto flex items-center">
        <div className="text-white text-left font-bold flex items-center w-full">
          <img
            src={"USD-C.svg"}
            alt="USDC Balance"
            className="w-[30px] h-[30px] mr-[10px] mb-[3px]"
          />
          <div className="text-white text-sm flex flex-col items-start justify-center font-display msmd:ml-[2px]">
            <span className="font-display text-elementor-text-3">USD-C</span>
            {user.status === "loading" ? (
              <Spinner />
            ) : (
              `${user?.tokens?.usdc?.toFixed(5) || "0.00"}`
            )}
          </div>
        </div>
      </div>

      <div className="text-white font-bold mx-auto flex items-center">
        <div className="text-white text-left font-bold flex items-center w-full ">
          <img
            src={"IMX.svg"}
            alt="imx Balance"
            className="w-[30px] h-[30px] mr-[10px] mb-[3px]"
          />
          <div className="text-white text-sm flex flex-col items-start justify-center font-display">
            <span className="font-display text-elementor-text-3">IMX</span>
            {user.status === "loading" ? (
              <Spinner />
            ) : (
              `${user.tokens?.imx?.toFixed(5) || "0.00"}`
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserBalance;
