export default interface IMarketplaceReducerInterface {
  marketplaceSelected: string;
  marketplaceFilters: {
    orderFilters: any | null;
    filtersAmount: number;
  };
  marketplaceOrdersAmounts: {
    orderItemsAmount: number;
    orderPiratesAmount: number;
    orderAssetsAmount: number;
  };
  buyToken: {
    buyTokenType: string;
    buyTokenAddress: string;
  };
  sort: any | null;
  sortDirection: any | null;
  orderSearch: string;
  activeIndex: number;
  buyStatus: boolean;
  nullSearchResult: boolean;
}
