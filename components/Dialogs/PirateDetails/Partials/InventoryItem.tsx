import axios from "axios";
import React, { useEffect } from "react";

declare interface IInventoryItemProps {
  activeItem: {
    name: string;
    description: string;
  };
  description: string;
  image: string;
  name: string;
  key: string;
  setActiveItem: ({ name, description }) => void;
}

const InventoryItem: React.FC<IInventoryItemProps> = ({
  activeItem,
  description,
  image,
  key,
  name,
  setActiveItem,
}): JSX.Element => {
  return (
    <button
      onClick={() =>
        activeItem?.name !== name ? setActiveItem({ name, description }) : null
      }
    >
      <img
        alt={activeItem?.name}
        src={`https://arrland.app/token-items/${image}`}
        key={key}
        className={`w-[90px] h-[90px] sm:w-[100px] md:h-[100px] m-[1px] sm:m-[2px] cursor-pointer border-2 border-[#625e57] ${
          activeItem && activeItem?.name === name && "border-[#ada79c]"
        }`}
      />
    </button>
  );
};

export default InventoryItem;
