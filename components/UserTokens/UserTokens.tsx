import React from "react";
import { useAppDispatch, useAppSelector } from "../../app/store-hooks";
import { selectUser } from "../../state/user/userSlice";
import Spinner from "../Common/Spinner";
import { openDialog } from "../../state/dialog/dialogSlice";

const NUMBER_AFTER_DECIMAL = 2;

const UserTokens: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <div className="-ml-1 text-white text-center text-sm font-bold flex flex-row sm:flex-wrap min-h-[75px] justify-between items-center min-w-[130px] mx-[10px] mxmd:justify-center mxlg:justify-center mxsm:ml-0">
        <div className="flex flex-col md:flex-row mxmd:ml-5">
          <div className="flex flex-row flex-wrap mxxl:flex-col mt-1">
            <div className="flex flex-row mxmd:flex-wrap mb-2 gap-2">
              <div className="text-white text-left font-bold mx-auto flex items-center">
                <div className="text-white text-left m-1 mx-auto flex items-center w-full min-w-[132px]">
                  <img
                    src={"card_assets/Rum.png"}
                    alt="RUM Balance"
                    className="w-[30px] h-[30px] mx-[10px] mb-[3px]"
                  />
                  <div className="text-white flex flex-col items-start justify-center font-display">
                    <span className="font-display text-elementor-text-3">
                      Total balance
                    </span>
                    {user.status === "loading" ? (
                      <Spinner />
                    ) : (
                      `${
                        user.tokens?.totalRum?.toFixed(NUMBER_AFTER_DECIMAL) ||
                        "0.00"
                      } RUM`
                    )}
                  </div>
                </div>
              </div>

              <div className="text-white font-bold mx-auto flex items-center">
                <div className="text-white text-left font-bold m-1 mx-auto flex items-center w-full min-w-[132px]">
                  <img
                    src={"card_assets/Rum.png"}
                    alt="RUM Balance"
                    className="w-[30px] h-[30px] mx-[10px] mb-[3px]"
                  />
                  <div className="text-white text-sm flex flex-col items-start justify-center font-display">
                    <span className="font-display text-elementor-text-3">
                      Daily income
                    </span>
                    {user.status === "loading" ? (
                      <Spinner />
                    ) : (
                      `${
                        user.tokens?.dailyRum?.toFixed(NUMBER_AFTER_DECIMAL) ||
                        "0.00"
                      } RUM`
                    )}
                  </div>
                </div>
              </div>

              <div className="text-white text-left font-bold mx-auto flex items-center">
                <div className="flex flex-row items-center justify-center w-full min-w-[132px]">
                  <img
                    src={"card_assets/AARC.png"}
                    alt="ARRC Coins"
                    className="w-[30px] h-[30px] mx-[10px] mb-[3px]"
                  />
                  <div className="text-white flex flex-col items-start justify-center font-display">
                    <span className="font-display text-left text-elementor-text-3 w-[80px]">
                      Arrc Coins
                    </span>
                    {user.status === "loading" ? (
                      <Spinner />
                    ) : (
                      `${
                        user.tokens?.arrcCoins?.toFixed(NUMBER_AFTER_DECIMAL) ||
                        "0.00"
                      }`
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              className={`flex flex-col items-center justify-center my-2 sm:my-0 cursor-pointer`}
              onClick={() =>
                dispatch(openDialog({ currentDialog: "SELL_RUM" }))
              }
            >
              <img
                alt="Exchange"
                src={"exchange_and_buy/exchange_neutral.png"}
                className="w-[50px] min-w-[45px] h-auto sm:ml-[10px]"
                onMouseEnter={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/exchagne_active.png"
                  )
                }
                onMouseLeave={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/exchange_neutral.png"
                  )
                }
              />
              <span className="font-display text-center text-elementor-text-3 w-[80px]">
                Swap
              </span>
            </button>

            <button
              className={`flex flex-col items-center justify-center my-2 sm:my-0 ml-[15px] 'cursor-pointer'`}
              onClick={() =>
                dispatch(openDialog({ currentDialog: "BUY_CHEST" }))
              }
            >
              <img
                alt="Exchange"
                src={"exchange_and_buy/chest_neutral.png"}
                className="w-[45px] min-w-[45px] h-auto"
                onMouseEnter={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/chest_active.png"
                  )
                }
                onMouseLeave={({ currentTarget }) =>
                  currentTarget?.setAttribute(
                    "src",
                    "exchange_and_buy/chest_neutral.png"
                  )
                }
              />

              <span className="font-display text-center text-elementor-text-3 w-[80px]">
                Buy Chest
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserTokens;
