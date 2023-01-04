import React from "react";

export interface ISellRumRangeProps {
  setValue: (x: any) => void;
  value: number;
}
const SellRumRange: React.FC<ISellRumRangeProps> = ({
  value,
  setValue,
}): JSX.Element => {
  return (
    <div className="flex flex-row justify-center items-center my-[10px]">
      <img
        src={"card_assets/Rum.png"}
        alt="$RUM currency"
        className="w-[40px] h-[40px] mx-[10px] cursor-pointer"
        onClick={() => setValue((x) => (x === 1 ? x : x - 1))}
      />

      <input
        id="default-range"
        type="range"
        value={value}
        min={1}
        max={10}
        onChange={(evt) => setValue(parseInt(evt.target.value))}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />

      <button onClick={() => setValue((x) => (x === 10 ? x : x + 1))}>
        <img
          src={"card_assets/AARC.png"}
          alt="AARC Coin"
          className="w-[40px] h-[40px] mx-[10px] cursor-pointer"
        />
      </button>
    </div>
  );
};

export default SellRumRange;
