export default interface IUserReducerInterface {
  status: "idle" | "loading" | "failed";
  searchItemsQuery: string;
  searchPiratesQuery: string;
  piratesReverseCardsAmount: number;
  keys: {
    walletAddress: string;
  };
  inventory: {
    selected: string;
    assetsSelected: string;
    assets: {
      summary: any[] | null;
      chests: any[] | null;
      reservations: any[] | null;
    };
    items: any[] | null;
    pirates: any[] | null;
    filteredPirates: any[] | null;
    filteredItems: any[] | null;
  };
  tokens: {
    totalRum: number | null;
    dailyRum: number | null;
    arrcCoins: number | null;
    seedBalance: number | null;
    ethereum: number | null;
    imx: number | null;
    usdc: number | null;
    toClaim: number | null;
    claimResults: any[] | null;
    wood: number | null;
    stone: number | null;
  };
}
