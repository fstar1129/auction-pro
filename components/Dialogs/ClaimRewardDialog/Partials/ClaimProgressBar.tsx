import React from "react";

interface IClaimProgressBarProps {
  processProgress: number;
}

const ClaimProgressBar: React.FC<IClaimProgressBarProps> = ({
  processProgress,
}): JSX.Element => {
  return (
    <div className="w-full p-1">
      <div className="bg-[rgba(62,106,134,0.5)] relative h-8 w-full rounded-2xl">
        <div
          className={`bg-[#3E6A86] ease duration-300 absolute top-0 left-0 flex h-full shim ${
            processProgress === 25
              ? "w-1/4"
              : processProgress === 50
              ? "w-1/2"
              : processProgress === 75
              ? "w-3/4"
              : processProgress === 100
              ? "w-full"
              : "w-0"
          } items-center justify-center rounded-2xl text-xs font-semibold text-white px-4`}
        >
          {`${processProgress}%`}
        </div>
      </div>
    </div>
  );
};
export default ClaimProgressBar;
