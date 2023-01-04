import React from "react";

const ArrcCoinsLabel: React.FC<{ value: number }> = ({
  value,
}): JSX.Element => {
  return (
    <div className="relative">
      <img
        src={"aarc_amount.png"}
        alt={"Arrc Coins"}
        className={"w-[150px] h-auto"}
      />
      <div className="absolute w-full h-full top-0 left-0">
        <div className="flex flex-row justify-between items-center text-center w-full h-full">
          <p className="text-black text-sm font-display text-center w-[40%] ml-[3px]">
            {value}
          </p>
          <p
            className={`text-sm font-display text-right w-[60%] text-black mr-[7px]`}
          >
            $ARRC
          </p>
        </div>
      </div>
    </div>
  );
};

export default ArrcCoinsLabel;
