import React, { useEffect, useState } from "react";
import TotalMinted from "./Partials/TotalMinted";
import TotalHodlers from "./Partials/TotalHodlers";
import HighestSale from "./Partials/HighestSale";
import Volume from "./Partials/Volume";
import VolumeByDay from "./Partials/VolumeByDay";
interface IGlobalStats {
  stats: any;
}

const GlobalStats: React.FC<IGlobalStats> = ({ stats }): JSX.Element => {
  return (
    <div className="flex items-start flex-wrap justify-start mxlg:w-full mxlg:justify-center">
      <TotalMinted minted={stats?.["items"]?.value} />
      <TotalHodlers hodlers={stats?.["unique_owners"]?.value} />
      <HighestSale sale={stats?.["highest_sale"]?.value} />
      <Volume
        volume={
          stats?.["volume_all_time"]?.["conversion_rollups"]?.["USD"]?.value
        }
      />
      <VolumeByDay
        volume={stats?.["volume_24h"]?.["conversion_rollups"]?.["USD"]?.value}
      />
    </div>
  );
};

export default GlobalStats;
