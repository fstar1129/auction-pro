import React from "react";
import Spinner from "../../Common/Spinner";
import { IUserReducerInterface } from "../../../interfaces";

interface tokenTypes {
  user?: IUserReducerInterface;
  tokenType?: string;
  tokenImage?: string;
  tokenName?: string;
  tokenSymbol?: string;
  content: React.ReactElement;
}

const TokenCard: React.FC<tokenTypes> = ({
  user,
  tokenType,
  tokenImage,
  tokenName,
  tokenSymbol,
  content,
}): JSX.Element => {
  return (
    <div className="text-white font-bold text-center flex items-center rounded-xl border-2 border-[#1b213a] bg-[rgba(49,65,131,0.1)] min-h-[185px] shadow-md shadow-[#1d2235]">
      <div className="text-white text-center flex flex-col items-center w-full min-w-[275px] gap-3">
        <div className="flex flex-start justify-center">
          {tokenImage ? (
            <img
              src={tokenImage}
              alt={tokenName}
              className="w-[30px] h-[30px] mr-3"
            />
          ) : null}
          <span className="font-display text-center text-elementor-text-3 max-w-[185px]">
            {tokenName}
          </span>
        </div>
        <div className="w-full text-white flex flex-col items-center justify-center font-display gap-3 ">
          <>
            {user.status === "loading" ? (
              <Spinner />
            ) : (
              `${tokenType || "0.00"} ${tokenSymbol || ""}`
            )}
            {content}
          </>
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
