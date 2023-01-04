import React from "react";

const ClaimRewardVisuals: React.FC<any> = ({ reward }): JSX.Element => {
  if (!reward) return;
  return (
    <div className="p-2 pr-2 flex flex-col justify-between sm:pr-0">
      <div className="flex flex-col justify-between">
        <div className="overflow-hidden">
          <img
            className="h-auto cursor-pointer max-h-96 w-auto duration-300 object-scale-down hover:scale-110 hover:saturate-[1.25] dmd:w-full"
            src={reward?.image_url}
            alt={reward?.image_url === null && reward?.name}
            onClick={() =>
              window && window.open(reward?.image_url, "_blank", "noopeener")
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ClaimRewardVisuals;
