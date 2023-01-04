import React from "react";
import { useAppSelector } from "../../app/store-hooks";
import { selectDialog } from "../../state/dialog/dialogSlice";
import SellRum from "./SellRum/SellRum";
import BuyChest from "./BuyChest/BuyChest";
import OpenChest from "./OpenChest/OpenChest";
import SeedRumInfo from "./SeedRumInfo/SeedRumInfo";
import Settings from "./Settings/Settings";
import PirateDetails from "./PirateDetails/PirateDialog";
import PirateSellDialog from "./PirateSellDialog/PirateSellDialog";
import PirateTransferDialog from "./PirateTransferDialog/PirateTransferDialog";
import PirateBuyDialog from "./PirateBuyDialog/PirateBuyDialog";
import ItemDetails from "./ItemDetails/ItemDialog";
import ItemSellDialog from "./ItemSellDialog/ItemSellDialog";
import ItemTransferDialog from "./ItemTransferDialog/ItemTransferDialog";
import ItemBuyDialog from "./ItemBuyDialog/ItemBuyDialog";
import AssetDetails from "./AssetDetails/AssetDetails";
import AssetTransferDialog from "./AssetTransferDialog/AssetTransferDialog";
import AssetSellDialog from "./AssetSellDialog/AssetSellDialog";
import AssetBuyDialog from "./AssetBuyDialog/AssetBuyDialog";
import DisclaimerDialog from "./DisclaimerDialog/DisclaimerDialog";
import PreAlphaDialog from "./PreAlphaDialog/PreAlphaDialog";
import ClaimRewardDialog from "./ClaimRewardDialog/ClaimRewardDialog";
import MerryXmasDialog from "./MerryXmasDialog/MerryXmasDialog";

const DialogProvider: React.FC = (): JSX.Element => {
  const dialog = useAppSelector(selectDialog);

  const displayCurrentDialog = (): JSX.Element => {
    switch (dialog.currentDialog) {
      case "SETTINGS":
        return <Settings />;
      case "OPEN_CHEST":
        return <OpenChest />;
        break;
      case "BUY_CHEST":
        return <BuyChest />;
        break;
      case "SELL_RUM":
        return <SellRum />;
      case "SEED_RUM_INFO":
        return <SeedRumInfo />;
        break;
      case "PIRATE_DETAILS":
        return <PirateDetails />;
        break;
      case "PIRATE_SELL_DIALOG":
        return <PirateSellDialog />;
        break;
      case "PIRATE_TRANSFER_DIALOG":
        return <PirateTransferDialog />;
        break;
      case "PIRATE_BUY_DIALOG":
        return <PirateBuyDialog />;
        break;
      case "ITEM_DETAILS":
        return <ItemDetails />;
        break;
      case "ITEM_SELL_DIALOG":
        return <ItemSellDialog />;
        break;
      case "ITEM_TRANSFER_DIALOG":
        return <ItemTransferDialog />;
        break;
      case "ITEM_BUY_DIALOG":
        return <ItemBuyDialog />;
        break;
      case "ASSET_DETAILS":
        return <AssetDetails />;
        break;
      case "ASSET_SELL_DIALOG":
        return <AssetSellDialog />;
        break;
      case "ASSET_TRANSFER_DIALOG":
        return <AssetTransferDialog />;
        break;
      case "ASSET_BUY_DIALOG":
        return <AssetBuyDialog />;
        break;
      case "DISCLAIMER_DIALOG":
        return <DisclaimerDialog />;
        break;
      case "CLAIM_REWARD_DIALOG":
        return <ClaimRewardDialog />;
        break;
      case "PRE_ALPHA_DIALOG":
        return <PreAlphaDialog />;
        break;
      case "MERRY_XMAS_DIALOG":
        return <MerryXmasDialog />;
        break;
      default:
        return;
    }
  };

  return <div>{displayCurrentDialog()}</div>;
};

export default DialogProvider;
