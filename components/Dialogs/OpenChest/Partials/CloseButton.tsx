import React from "react";
import { closeDialog } from "../../../../state/dialog/dialogSlice";
import { useAppDispatch } from "../../../../app/store-hooks";

const CloseButton: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  return (
    <div className="w-full h-[60px] flex items-center justify-center absolute bottom-[5px]">
      <button
        type="button"
        className="min-w-[200px] justify-center px-4 py-2 text-lg font-medium font-display transition duration-300 ease-in-out hover:text-black text-elementor-text-3 border border-[#69bae9] hover:bg-[#69bae9] rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => dispatch(closeDialog())}
      >
        <div className="flex flex-row items-center justify-center font-display text-elementor-text-3">
          Close
        </div>
      </button>
    </div>
  );
};

export default CloseButton;
