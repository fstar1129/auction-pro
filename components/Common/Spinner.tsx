import React from "react";

const Spinner: React.FC = (): JSX.Element => {
  return (
    <div className="flex justify-center items-cente text-white">
      <div
        className="spinner-border animate-spin w-4 h-4 border-2 rounded-full flex items-center justify-center"
        role="status"
      >
        <span className="visually-hidden"></span>
      </div>
    </div>
  );
};

export default Spinner;
