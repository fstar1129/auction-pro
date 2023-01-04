import React from "react";
import { useAppDispatch } from "../../../app/store-hooks";
import { openDialog } from "../../../state/dialog/dialogSlice";
import Spinner from "../../Common/Spinner";

interface IClaimCard {
  reward?: any;
}
const ClaimCard: React.FC<IClaimCard> = ({ reward }): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <button
      className="bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] rounded-md duration-150 ease hover:drop-shadow-[0_10px_10px_#a7a7a73d] hover:to-[#fff] hover:translate-y-[-5px] hover:saturate-[1.25] m-[10px] w-[260px] overflow-hidden"
      onClick={() => {
        dispatch(
          openDialog({
            currentDialog: "CLAIM_REWARD_DIALOG",
            currentDialogAdditionalData: reward,
          })
        );
      }}
    >
      <div className="flex flex-col h-auto">
        <div className="flex p-1 bg-black rounded-t-md ">
          <p className="font-display text-elementor-text-3 text-sm ml-1">
            {reward?.name ? (
              reward?.name
            ) : (
              <div className="my-[2px] mx-[2px]">
                <Spinner />
              </div>
            )}
          </p>
        </div>
        <div className="relative overflow-hidden">
          <img
            src={
              reward?.image_url ? reward?.image_url : "summaryAssets/assets.png"
            }
            alt="Claim item"
            className="h-[256px] cursor-pointer max-h-96 w-auto duration-300 object-scale-down dmd:w-full"
          />
          {reward?.isClaimed === true ? (
            <div className="flex items-center pt-[2px] border-2 border-[#F32A2A] px-[9px] -ml-1 rounded-sm bg-[#00000080] absolute bottom-3 font-display text-[1.1rem] text-[#F32A2A] font-medium h-[30px]">
              Claimed
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </button>
  );
};

export default ClaimCard;
