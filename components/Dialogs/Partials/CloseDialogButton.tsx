import React from "react";
import { closeDialog } from "../../../state/dialog/dialogSlice";
import { useAppDispatch } from "../../../app/store-hooks";

const ACTIVE_BUTTON_URL = "exchange_and_buy/x_active.png";
const NEUTRAL_BUTTON_URL = "exchange_and_buy/x_neutral.png";

const CloseDialogButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();

  return (
    <button
      onClick={() => {
        dispatch(closeDialog());
      }}
    >
      <img
        alt="Close button"
        src={"exchange_and_buy/x_neutral.png"}
        className="w-[20px] h-[20px] cursor-pointer absolute top-[4px] right-[4px] z-20"
        onMouseEnter={({ currentTarget }) =>
          currentTarget?.setAttribute("src", ACTIVE_BUTTON_URL)
        }
        onMouseLeave={({ currentTarget }) =>
          currentTarget?.setAttribute("src", NEUTRAL_BUTTON_URL)
        }
      />
    </button>
  );
};

export default CloseDialogButton;
