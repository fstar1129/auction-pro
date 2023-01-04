import React from "react";
import { useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";
import SwapCoins from "../../Common/SwapCoins";
import BuyChest from "../../Common/BuyChest";
import TokenCard from "./TokenCard";
import { openDialog } from "../../../state/dialog/dialogSlice";
import { useAppDispatch } from "../../../app/store-hooks";

const NUMBER_AFTER_DECIMAL = 2;

const TokenCards: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  return (
    <div className="w-full flex justify-center items-center flex-wrap gap-10 ">
      <TokenCard
        user={user}
        tokenName={"$RUM"}
        tokenSymbol={"RUM"}
        tokenType={user?.tokens?.seedBalance?.toFixed(NUMBER_AFTER_DECIMAL)}
        content={
          <p className="font-display text-sm font-light text-elementor-text-3 flex flex-col">
            <b className="font-bold font-display text-lg text-white">
              TGE untill 30 June
            </b>
          </p>
        }
      />
      <TokenCard
        user={user}
        tokenName={"$RUM to claim"}
        tokenType={(user?.tokens?.seedBalance / 2).toFixed().toString()}
        tokenSymbol={"RUM"}
        content={
          <p className="font-display break-words max-w-[275px] text-lg px-1">
            {" "}
            at TGE, rest linearly in 3 months
          </p>
        }
      />
      <TokenCard
        user={user}
        tokenName={"off-chain $RUM Daily income"}
        tokenType={user?.tokens.dailyRum?.toFixed(NUMBER_AFTER_DECIMAL)}
        tokenImage={"card_assets/Rum.png"}
        tokenSymbol={"RUM"}
        content={
          <button
            onClick={() =>
              dispatch(
                openDialog({
                  currentDialog: "SEED_RUM_INFO",
                })
              )
            }
            className="text-sm border-2 border-white rounded-lg px-3 py-1 opacity-[0.8] hover:opacity-[1]"
          >
            Learn how rewards work
          </button>
        }
      />
      <TokenCard
        user={user}
        tokenName={"off-chain $RUM"}
        tokenType={user?.tokens.totalRum?.toFixed(NUMBER_AFTER_DECIMAL)}
        tokenImage={"card_assets/Rum.png"}
        tokenSymbol={"RUM"}
        content={<SwapCoins />}
      />
      <TokenCard
        user={user}
        tokenName={"Arcc Coins"}
        tokenType={user?.tokens.arrcCoins?.toFixed(NUMBER_AFTER_DECIMAL)}
        tokenImage={"card_assets/AARC.png"}
        content={<BuyChest />}
      />
    </div>
  );
};

export default TokenCards;
