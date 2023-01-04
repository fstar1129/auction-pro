import React from "react";
const NoResults: React.FC = (): JSX.Element => {
  return (
    <div className="w-full min-h-[50vh] flex flex-col justify-center items-center text-center gap-3">
      <h1 className="text-elementor-text-3 font-display text-4xl text-[#87151B]">
        No results found
      </h1>
      <p className="text-elementor-text-3 font-display text-md">
        Try changing{" "}
        <span className="font-display text-elementor-text-1">currency</span> or
        use the{" "}
        <span className="font-display text-elementor-text-1">filters</span> to
        find what you are looking for.
      </p>
    </div>
  );
};

export default NoResults;
