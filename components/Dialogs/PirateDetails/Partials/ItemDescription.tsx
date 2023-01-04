import React from "react";

interface IActiveItem {
  activeItem: {
    name: string;
    description: string;
  };
}

const ItemDescription: React.FC<IActiveItem> = ({
  activeItem,
}): JSX.Element => {
  return (
    <div className="p-3 font-display text-sm text-center text-elementor-text-3 w-full">
      {!activeItem ? (
        "No item selected..."
      ) : (
        <div>
          <h6 className="text-lg font-display text-elementor-text-3 text-left">
            {activeItem?.name?.toUpperCase()}
          </h6>
          <p className="font-display text-xs text-left text-elementor-text-3">
            {activeItem?.description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ItemDescription;
