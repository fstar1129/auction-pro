import React from "react";

interface IDialogRightArrow {
  trackingItem: any[];
  activeIndex: number;
  handleNext: () => void;
  overall: number;
}

const DialogRightArrow: React.FC<IDialogRightArrow> = ({
  activeIndex,
  handleNext,
  overall,
}): JSX.Element => {
  return (
    <>
      <button
        className="text-white cursor-pointer -translate-x-[50%] -translate-y-[50%]"
        onClick={() => (activeIndex === overall - 1 ? null : handleNext())}
        disabled={activeIndex >= overall || activeIndex === overall}
      >
        {activeIndex === overall - 1 ? (
          <img
            alt="Arrow right"
            src="modal_assets/arrow_right_neutral.png"
            className="w-[30px] h-auto cursor-not-allowed"
          />
        ) : (
          <img
            alt="Arrow right active"
            src="modal_assets/arrow_right_active.png"
            className="w-[30px] h-auto duration-150 hover:brightness-150"
          />
        )}
      </button>
    </>
  );
};

export default DialogRightArrow;
