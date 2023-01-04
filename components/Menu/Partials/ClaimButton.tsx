import React from "react";

import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";

import { selectUser, setSelected } from "../../../state/user/userSlice";

import Spinner from "../../Common/Spinner";

const ClaimButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  const user = useAppSelector(selectUser);

  return (
    <button
      className="mx-2 cursor-pointer flex items-center duration-150 hover:brightness-125"
      onClick={() => dispatch(setSelected("claim"))}
    >
      {user.inventory.selected === "claim" ? (
        <div className="flex w-[125px] h-[30px] bg-elementor-text-1 border-elementor-text-3 border-2 rounded-md"></div>
      ) : (
        <div className="flex w-[125px] h-[30px] border-[#6EC1E4] border-2 rounded-md"></div>
      )}

      <div className="absolute">
        <div className="flex justify-center items-center text-center">
          <p
            className={`text-sm font-display font-bold w-[125px] mx-auto ${
              user.inventory.selected === "claim"
                ? "text-elementor-text-2"
                : "text-elementor-text-3"
            }`}
          >
            Claim
          </p>

          {user.status === "loading" ? (
            <div
              className={`absolute top-[-14.5px] right-[-7.5px] text-[1rem] h-[24px]  pt-[1px] pr-[1px]

          flex justify-center items-center rounded-sm font-display hover:brightness-100`}
            >
              <Spinner />
            </div>
          ) : user.tokens.toClaim === 0 ? (
            ""
          ) : (
            <div
              className={`absolute top-[-12.5px] right-[-9.5px] text-[1rem] h-[24px] pt-[1px] pr-[0px]

          text-elementor-text-2 flex justify-center items-center rounded-md font-display  hover:brightness-100 shadow-md bg-gradient-to-b from-[#ffeea8] to-[#e0c03d] ${
            user.tokens.toClaim <= 9 && user.tokens.toClaim > 0
              ? "w-[24px]"
              : "w-[32px] pl-[1px]"
          }`}
            >
              {user.tokens.toClaim}
            </div>
          )}
        </div>
      </div>
    </button>
  );
};

export default ClaimButton;
