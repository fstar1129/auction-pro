import React from "react";
import TokenCards from "./Partials/TokenCards";
import AssetCards from "./Partials/AssetCards";
import ResourcesCards from "./Partials/ResourcesCards";
const Summary: React.FC = (): JSX.Element => {
  return (
    <>
      <div className="w-full flex flex-col justify-center items-center bg-elementor-1 py-10 gap-10">
        <TokenCards />
        <AssetCards />
        <ResourcesCards />
      </div>
    </>
  );
};

export default Summary;
