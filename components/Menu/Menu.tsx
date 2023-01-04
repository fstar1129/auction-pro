import React from "react";
import SummaryButton from "./Partials/SummaryButton";
import InventoryButton from "./Partials/InventoryButton";
import MarketplaceButton from "./Partials/MarketplaceButton";
import ClaimButton from "./Partials/ClaimButton";
import DownloadGameButton from "./Partials/DownloadGameButton";
import ArrlandMapButton from "./Partials/ArrlandMapButton";

const Menu: React.FC = (): JSX.Element => {
  return (
    <div className="flex items-center justify-center w-full flex-wrap gap-3 mx-auto">
      <SummaryButton />
      <InventoryButton />
      <MarketplaceButton />
      <ClaimButton />
      <DownloadGameButton />
      <ArrlandMapButton />
    </div>
  );
};

export default Menu;
