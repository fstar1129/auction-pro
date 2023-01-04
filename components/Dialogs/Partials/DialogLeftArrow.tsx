import React from "react";

interface IDialogLeftArrow {
  activeIndex: number;
  handlePrevious: () => void;
}

const DialogLeftArrow: React.FC<IDialogLeftArrow> = ({
  activeIndex,
  handlePrevious,
}): JSX.Element => {
  return (
    <>
      <button
        className="text-white cursor-pointer -translate-x-[50%] -translate-y-[50%]"
        onClick={() => handlePrevious()}
      >
        {activeIndex === 0 ? (
          <img
            alt="Arrow left"
            src="modal_assets/arrow_left_neutral.png"
            className="w-[30px] h-auto cursor-not-allowed"
          />
        ) : (
          <img
            alt="Arrow left active"
            src="modal_assets/arrow_left_active.png"
            className="w-[30px] h-auto duration-150 hover:brightness-150"
          />
        )}
      </button>
    </>
  );
};

export default DialogLeftArrow;
