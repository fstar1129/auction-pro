import React from "react";
import { displayCorrectShipImage } from "../../../../helpers";

type TPirate = {
  total: number;
  bonus_percent: string;
  base_day: number;
  elemental_magic: number;
  voodo_magic: number;
  respect: number;
};

export interface IPirateMainStatsProps {
  pirate: TPirate;
}

const PirateMainStats: React.FC<IPirateMainStatsProps> = ({
  pirate,
}): JSX.Element => {
  return (
    <div className="flex flex-col sm:flex-row items-center border-l-2 border-[#2a2826] mt-1 mb-2 sm:mb-0">
      <div className="relative" data-tip="$RUM amount">
        <img
          alt="Rum border"
          src="modal_assets/rum_border_popup.png"
          className="h-[100px] w-auto"
        />
        <div className="flex flex-row justify-center items-center absolute top-0 left-0 h-[100px] w-full">
          <div className="w-3/4 pl-[70px]">
            <div className="font-display text-md text-[#64a2bc] pt-1">
              Total:{" "}
              <span className="text-[#33cc66] font-display">
                {pirate?.total ? pirate?.total : "N/a"}
              </span>
            </div>
            <div className="font-display pt-2 text-md text-[#64a2bc]">
              Bonus:{" "}
              <span className="text-[#33cc66] font-display">
                {pirate?.bonus_percent ? `${pirate?.bonus_percent}%` : "N/a"}
              </span>
            </div>
          </div>
          <div className="w-1/4 pl-1 text-sm text-[#64a2bc] font-display">
            Base:{" "}
            <span className="text-[#33cc66] font-display">
              {pirate?.base_day}
            </span>
          </div>
        </div>
      </div>

      <div className="relative" data-tip="Respect">
        <img
          alt="Boat"
          src={displayCorrectShipImage(pirate?.respect)}
          className="h-[100px] w-auto mx-[15px]"
        />
        <div className="font-display absolute top-0 left-0 w-full h-[100px] text-elementor-text-3 p-2">
          {pirate?.respect}
        </div>
      </div>

      <div className="relative" data-tip="Voodoo Magic">
        <img
          alt="Voodoo magic"
          src="modal_assets/voodoo_icon.png"
          className="h-[100px] w-auto mx-[15px]"
        />
        <div className="font-display absolute top-0 left-0 w-full h-[100px] flex items-center justify-center text-elementor-text-3">
          {pirate?.voodo_magic}
        </div>
      </div>

      <div className="relative -mt-[3px]" data-tip="Elemental Magic">
        <img
          alt="Elemental magic"
          src="modal_assets/elemental_icon.png"
          className="h-[100px] w-auto"
        />
        <div className="font-display absolute top-0 left-0 w-full h-[100px] flex items-center justify-center text-elementor-text-3">
          {pirate?.elemental_magic}
        </div>
      </div>
    </div>
  );
};

export default PirateMainStats;
