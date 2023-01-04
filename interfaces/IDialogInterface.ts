export type TDialog =
  | "SETTINGS"
  | "OPEN_CHEST"
  | "BUY_CHEST"
  | "SELL_RUM"
  | "SEED_RUM_INFO"
  | "PIRATE_DETAILS"
  | "PIRATE_SELL_DIALOG"
  | "PIRATE_TRANSFER_DIALOG"
  | "PIRATE_BUY_DIALOG"
  | "ITEM_DETAILS"
  | "ITEM_SELL_DIALOG"
  | "ITEM_TRANSFER_DIALOG"
  | "ITEM_BUY_DIALOG"
  | "ASSET_DETAILS"
  | "ASSET_SELL_DIALOG"
  | "ASSET_TRANSFER_DIALOG"
  | "ASSET_BUY_DIALOG"
  | "DISCLAIMER_DIALOG"
  | "CLAIM_REWARD_DIALOG"
  | "PRE_ALPHA_DIALOG"
  | "MERRY_XMAS_DIALOG"
  | "NONE";

export default interface IDialogInterface {
  status: "idle" | "loading" | "failed";
  dialog: {
    isOpen: boolean;
    currentDialog: TDialog;
    currentDialogAdditionalData: any;
  };
}
