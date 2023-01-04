import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IMarketplaceReducerInterface } from "../../interfaces";

const initialState: IMarketplaceReducerInterface = {
  marketplaceSelected: "pirates",
  marketplaceFilters: {
    orderFilters: {},
    filtersAmount: 0,
  },
  marketplaceOrdersAmounts: {
    orderItemsAmount: 0,
    orderPiratesAmount: 0,
    orderAssetsAmount: 0,
  },
  buyToken: {
    buyTokenType: "ETH",
    buyTokenAddress: null,
  },
  sort: "sell_token_name",
  sortDirection: "asc",
  orderSearch: "",
  activeIndex: 0,
  buyStatus: false,
  nullSearchResult: false,
};

export const marketplaceSlice = createSlice({
  name: "marketplace",
  initialState,
  reducers: {
    setMarketplaceSelected: (state, action: PayloadAction<any>) => {
      state.marketplaceSelected = action.payload;
    },
    setOrderFilters: (state, action: PayloadAction<any>) => {
      state.marketplaceFilters.orderFilters = action.payload;
    },
    setFiltersAmount: (state, action: PayloadAction<any>) => {
      state.marketplaceFilters.filtersAmount = action.payload;
    },
    setOrderItemsAmount: (state, action: PayloadAction<any>) => {
      state.marketplaceOrdersAmounts.orderItemsAmount = action.payload;
    },
    setOrderPiratesAmount: (state, action: PayloadAction<any>) => {
      state.marketplaceOrdersAmounts.orderPiratesAmount = action.payload;
    },
    setOrderAssetsAmount: (state, action: PayloadAction<any>) => {
      state.marketplaceOrdersAmounts.orderAssetsAmount = action.payload;
    },
    setBuyToken: (state, action: PayloadAction<any>) => {
      state.buyToken = action.payload;
    },
    setSorting: (state, action: PayloadAction<any>) => {
      state.sort = action.payload;
    },
    setSortDirection: (state, action: PayloadAction<any>) => {
      state.sortDirection = action.payload;
    },
    setOrderSearch: (state, action: PayloadAction<any>) => {
      state.orderSearch = action.payload;
    },
    setActiveIndex: (state, action: PayloadAction<any>) => {
      state.activeIndex = action.payload;
    },
    setBuyStatus: (state, action: PayloadAction<any>) => {
      state.buyStatus = action.payload;
    },
    setNullSearchResult: (state, action: PayloadAction<any>) => {
      state.nullSearchResult = action.payload;
    },
  },
});

export const selectMarketplace = (state: RootState) => state.marketplace;
export const {
  setMarketplaceSelected,
  setFiltersAmount,
  setActiveIndex,
  setSorting,
  setSortDirection,
  setBuyStatus,
  setOrderSearch,
  setBuyToken,
  setOrderFilters,
  setOrderAssetsAmount,
  setOrderItemsAmount,
  setOrderPiratesAmount,
  setNullSearchResult,
} = marketplaceSlice.actions;
export default marketplaceSlice.reducer;
