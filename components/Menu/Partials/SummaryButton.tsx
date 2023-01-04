import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { selectUser, setSelected } from "../../../state/user/userSlice";
const SummaryButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  return (
    <button
      className="mx-2 cursor-pointer flex items-center duration-150 hover:brightness-125"
      onClick={() => dispatch(setSelected("summary"))}
    >
      {user.inventory.selected === "summary" ? (
        <div className="flex w-[125px] h-[30px] bg-elementor-text-1 border-elementor-text-3 border-2 rounded-md"></div>
      ) : (
        <div className="flex w-[125px] h-[30px] border-[#6EC1E4] border-2 rounded-md"></div>
      )}

      <div className="absolute">
        <div className="flex justify-center items-center text-center">
          <p
            className={`text-sm font-display font-bold w-[125px] mx-auto ${
              user.inventory.selected === "summary"
                ? "text-elementor-text-2"
                : "text-elementor-text-3"
            }`}
          >
            Summary
          </p>
        </div>
      </div>
    </button>
  );
};

export default SummaryButton;
