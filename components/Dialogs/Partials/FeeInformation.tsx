import React, { useState } from "react";
const FeeInformation: React.FC = (): JSX.Element => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  return (
    <>
      <div onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        <p className="font-display text-sm">Buyer&apos;s price inc. 6% fee</p>
      </div>
      {isHovering && (
        <div className="absolute bg-[#3E6A86] h-[200px] top-[20px] flex flex-col w-[300px] text-elementor-text-2 p-3 rounded-md ">
          <h2 className="font-display text-[1.35rem] font-bold">
            Trading Fees for sellers
          </h2>
          <h5 className="font-display">
            Fees will be{" "}
            <span className="text-elementor-text-1 font-display">
              added on top
            </span>{" "}
            of your entered price. When your item sells, you will receive your
            entered price.
          </h5>
          <ul className="pl-2">
            <li className="font-display">
              <span className="font-display font-semibold">2%</span> - IMX
              Protocol fee
            </li>
            <li className="font-display">
              <span className="font-display font-semibold">3%</span> - Royalties
              to creator
            </li>
            <li className="font-display">
              <span className="font-display font-semibold">1%</span> -
              Marketplace fee
            </li>
          </ul>
        </div>
      )}
    </>
  );
};
export default FeeInformation;
