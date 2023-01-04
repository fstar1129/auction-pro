import React from "react";
import ArrlandLogo from "./Common/ArrlandLogo";

const Maintenance: React.FC = (): JSX.Element => {
  return (
    <div
      className="flex items-center justify-center flex-col"
      style={{ height: "500px" }}
    >
      <ArrlandLogo />

      <h1 className="text-md text-elementor-text-3 mt-[100px] font-display">
        We are currently improving our project. Please come back later. Thank
        you.
      </h1>
    </div>
  );
};

export default Maintenance;
