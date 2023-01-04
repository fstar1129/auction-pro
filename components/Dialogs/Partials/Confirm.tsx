import React from "react";

export interface IConfirmProps {
  showConfirmation: boolean;
  handleCancel: () => void;
  handleConfirm: () => void;
  cancelButtonText?: string;
  confirmButtonText?: string;
}

const Confirmation: React.FC<IConfirmProps> = ({
  showConfirmation,
  handleCancel,
  handleConfirm,
  cancelButtonText,
  confirmButtonText
}): JSX.Element => {
  if (!showConfirmation) return;

  return (
    <div className="flex w-full justify-center items-center">
      <button
        type="button"
        className="min-w-[100px] mx-1 inline-flex justify-center my-2 mt-[50px] -ml-[2px] px-4 py-2 text-lg font-medium font-display border border-elementor-text-3 hover:bg-elementor-text-3 transition duration-300 ease-in-out hover:text-black text-elementor-text-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => handleCancel()}
      >
        { cancelButtonText || 'No' }
      </button>
      <button
        type="button"
        className="ml-[2px] max-w-[200px] mx-1 min-w-[100px] inline-flex justify-center my-2 mt-[50px] px-4 py-2 text-lg font-medium font-display border border-elementor-text-3 hover:bg-elementor-text-3 transition duration-300 ease-in-out hover:text-black text-elementor-text-3 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => handleConfirm()}
      >
        { confirmButtonText || 'Yes' }
      </button>
    </div>
  );
};

export default Confirmation;
