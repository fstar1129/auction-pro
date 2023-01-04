import React from "react";

declare interface IEmptyInventorySlotProps {
  setActiveItem: (arg) => void;
}

const EmptyInventorySlot: React.FC<IEmptyInventorySlotProps> = ({
  setActiveItem,
}): JSX.Element => {
  return (
    <button onClick={() => setActiveItem(null)}>
      <img
        alt="Empty inventory slot"
        src="modal_assets/empty_item.png"
        className="w-[90px] h-[90px] sm:w-[100px] md:h-[100px] m-[1px] sm:m-[2px] cursor-pointer"
      />
    </button>
  );
};

export default EmptyInventorySlot;
