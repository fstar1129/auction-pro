import React, { useState } from "react";

const BuyChest: React.FC = (): JSX.Element => {
  const [folded, setFolded] = useState(false);

  return (
    <button
      className={`flex flex-col items-center justify-center my-2 sm:my-0 'cursor-pointer'`}
    >
      {!folded ? (
        <img className="w-[10px] h-[10px]" src={"filter_icons/arrowup.svg"} />
      ) : (
        <img className="w-[10px] h-[10px]" src={"filter_icons/arrowdown.svg"} />
      )}
    </button>
  );
};

export default BuyChest;
