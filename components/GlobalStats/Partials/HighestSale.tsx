import React from "react";
import Spinner from "../../Common/Spinner";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";

interface ISale {
  sale: string;
}

const HighestSale: React.FC<ISale> = ({ sale }): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <div className="text-white font-bold flex items-center justify-center min-w-[100px] ml-[10px] text-sm">
      <div className="text-white text-left font-bold mx-auto flex items-center w-full">
        <div className="text-white text-md flex flex-row items-start justify-center font-display">
          <span className="font-display text-elementor-text-3 mr-[5px]">
            Highest sale
          </span>
          {user.status === "loading" ? (
            <Spinner />
          ) : (
            <div className="flex gap-1 justify-center items-center">
              <p className="font-display">
                ${parseInt(sale || "0").toFixed(2)}
              </p>
              <p className="font-display">USD</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HighestSale;
