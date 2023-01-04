import React from "react";
import { useAppSelector } from "../../app/store-hooks";
import { selectUser } from "../../state/user/userSlice";
import ClaimCard from "./Partials/ClaimCard";

const Claim: React.FC = (): JSX.Element => {
  const user = useAppSelector(selectUser);
  return (
    <>
      <div className="w-full flex flex-col bg-elementor-1 pb-10 py-5 gap-3 min-h-[70vh]">
        <div>
          <h3 className="font-display text-elementor-text-3 text-2xl ml-2 mb-3 mxlg:ml-4">
            Assets to claim
          </h3>
          <div className="border-b-[1px] border-elementor-text-3"></div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-row w-[98.25%] mxlg:justify-center flex-wrap">
            {user.tokens.claimResults.length !== 0 ? (
              user.tokens.claimResults.map((reward, index) => {
                return <ClaimCard reward={reward} key={index} />;
              })
            ) : (
              <div className="flex my-[25vh] mx-auto">
                <span className="font-display text-elementor-text-3">
                  It seems that you don`t have any items to claim.
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Claim;
