import React from "react";
import ReactTooltip from "react-tooltip";

export interface ISortingControls {
  activeFilter: boolean;
}

const SortingControls: React.FC<ISortingControls> = ({ activeFilter }) => {
  return (
    <div className="flex flex-row justify-center items-center mt-[5px]">
      {!activeFilter ? (
        <img className="w-[10px] h-[10px]" src={"filter_icons/arrowup.svg"} />
      ) : (
        <img className="w-[10px] h-[10px]" src={"filter_icons/arrowdown.svg"} />
      )}

      <ReactTooltip delayHide={300} delayShow={300} isCapture={false} />
    </div>
  );
};

export default SortingControls;
