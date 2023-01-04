import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { displayCorrectShipImage, parseName } from "../../../helpers";
import { useAppDispatch } from "../../../app/store-hooks";
import { openDialog } from "../../../state/dialog/dialogSlice";

interface ISinglePirateProps {
  pirate: any;
}

const SinglePirate: React.FC<ISinglePirateProps> = ({
  pirate,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [shipUrl, setShipUrl] = useState<string>("");

  useEffect(() => {
    setShipUrl(displayCorrectShipImage(pirate?.respect));
  }, [pirate]);

  return (
    <>
      <button
        className="m-2 w-[250px] text-sm leading-relaxed hover:bg-gray-900 rounded bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] cursor-pointer duration-150 ease hover:drop-shadow-[0_10px_10px_#a7a7a73d] hover:to-[#fff] hover:translate-y-[-5px] hover:saturate-[1.25]"
        onClick={() =>
          dispatch(
            openDialog({
              currentDialog: "PIRATE_DETAILS",
              currentDialogAdditionalData: pirate,
            })
          )
        }
      >
        <div className="flex flex-col h-full bg-black rounded-md pb-[2px] w-full hover:saturate-[1.25]">
          <div className="flex flex-row justify-between p-[5px]">
            <h6 className="text-elementor-text-3 font-display text-md truncate overflow-hidden whitespace-nowrap">
              {parseName(pirate?.name, 20)}
            </h6>
            <h6 className="text-elementor-text-3 font-display text-md">
              #{pirate?.token_id}
            </h6>
          </div>

          <div className="relative">
            <img
              className="w-[260px] h-[260px] border-b-2 border-b-[#64a2bc] bg-black"
              src={
                pirate?.image_small ? pirate?.image_small : pirate?.image_url
              }
              alt={pirate?.name}
            />
            {/*

          */}
            <div className="absolute bottom-[5%] left-[1px]">
              {pirate?.orders?.sell_orders[0]?.status === "active" ? (
                <div className="">
                  <img
                    alt="Listed for sale"
                    src={"card_assets/listedforsale.png"}
                    className="w-full h-[30px]"
                  />
                </div>
              ) : (
                ""
              )}
            </div>

            <div className="text-black font-display text-right p-2 absolute -right-[32px] bottom-[0px] flex justify-center items-center w-[140px] h-[30px]">
              <img
                alt="Rarity"
                src={"card_assets/rarity.png"}
                className="w-[80px] h-[30px]"
              />
              <div className="-mt-2 text-md font-display absolute top-[45%] w-full text-center">
                {pirate?.rarity !== null ? pirate?.rarity : "N/a"}
              </div>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center w-full h-[45px]">
            <div
              data-tip="$RUM overall income / $RUM boost percentage"
              className="w-[240px] mt-[2.5px] mx-[1.5px] relative"
            >
              <img alt="Rum border" src={`card_assets/rum_border.svg`} />
              <img
                alt="Rum bottle"
                src={`card_assets/rum_bottle.png`}
                className="w-[34px] h-auto absolute -top-1 -left-1"
              />

              <div className="flex flex-col w-[100%] h-[100%] items-center justify-center absolute top-0 left-0">
                <p className="font-display text-[#33cc66] w-full pl-[30px] text-xs mb-[3px]">
                  <span className="font-display text-xs text-[#64a2bc]">
                    Total:
                  </span>{" "}
                  {pirate?.total ? pirate?.total : "N/a"}
                </p>
                <p className="font-display text-[#33cc66] w-full pl-[30px] text-xs">
                  <span className="font-display text-xs text-[#64a2bc]">
                    Bonus:
                  </span>{" "}
                  {pirate?.bonus_percent ? `+${pirate?.bonus_percent}%` : "N/a"}
                </p>
              </div>
            </div>

            <div className="flex flex-row items-center justify-center w-[166px] mt-[2px]">
              <div
                data-tip={`Gained respect: ${
                  pirate?.respect !== null ? pirate?.respect : "N/a"
                }`}
                className="rounded-sm flex justify-center items-center w-full p-[1px] relative"
              >
                <img alt="Ship" src={`${shipUrl}`} className="rounded-sm" />
              </div>

              <div
                data-tip="DAO Votes count"
                className="flex justify-center items-center m-[1.5px] mt-[1.5px] w-[52px] relative"
              >
                <img
                  alt="DAO Votes"
                  src={`card_assets/dao_icon.svg`}
                  className="h-auto w-full"
                />
                <p className="text-md text-black absolute flex items-center justify-center w-full text-center font-display">
                  {pirate?.dao_votes !== null ? pirate?.dao_votes : "N/a"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </button>
      <ReactTooltip delayHide={300} delayShow={300} isCapture={false} />
    </>
  );
};

export default SinglePirate;
