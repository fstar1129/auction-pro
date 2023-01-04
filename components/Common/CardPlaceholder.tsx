import React from "react";

const CardPlaceholder: React.FC = (): JSX.Element => {
  return (
    <div className="mx-[2px] lg:mx-2 my-2 h-[340px] w-[250px] text-sm leading-relaxed rounded">
      <img
        src={"card_assets/reverse.png"}
        className="w-full h-full bg-gray-900"
        alt="Reverse card"
      />
    </div>
  );
};

export default CardPlaceholder;
