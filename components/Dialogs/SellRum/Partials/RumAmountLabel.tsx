import React from "react";

const RumAmountLabel: React.FC<{ value: number }> = ({
  value,
}): JSX.Element => {
  return (
    <div className={"relative"}>
      <img
        src={"rum_amount.png"}
        alt={"Arrc Coins"}
        className={"w-[150px] h-auto"}
      />
      <div className="absolute w-full h-full top-0 left-0">
        <div className="flex flex-row justify-between items-center text-center w-full h-full">
          <p className="text-black text-sm font-display w-[60%] ml-[3px]">
            {value * 500}
          </p>
          <p className={`text-sm font-display w-[40%] text-black`}>$RUM</p>
        </div>
      </div>
    </div>
  );
};

export default RumAmountLabel;
