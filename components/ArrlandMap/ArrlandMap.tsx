import React, { useState } from "react";
import Map from "./Partials/Map";
const ArrlandMap: React.FC = (): JSX.Element => {
  const [grabbing, setGrabbing] = useState(false);
  return (
    <div className="w-full flex justify-center items-center flex-col bg-elementor-1 py-10 gap-10 min-h-[50vh] h-auto">
      <h1 className="font-display text-[2.5rem] text-center leading-[4rem]">
        Arrland archipelago is under randomized procedural generation process.
        Stay Tuned!
      </h1>
      <div
        className={`w-full h-full flex justify-center items-center ${
          grabbing ? "cursor-grabbing" : "hover:cursor-grab"
        }`}
        onMouseDown={() => setGrabbing(true)}
        onMouseUp={() => setGrabbing(false)}
      >
        <Map />
      </div>
    </div>
  );
};
export default ArrlandMap;
