import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import instance from "../../app/request";
import { RootState } from "../../app/store";
import { IUserReducerInterface } from "../../interfaces";
import {
  mergeImxAndMetaPiratesData,
  filterPiratesBySearchQuery,
  filterItemsBySearchQuery,
  fillItemsMetadata,
} from "./userSliceApi";

const IMMUTABLE_URL = process.env.NEXT_PUBLIC_IMMUTABLE_X_URL || "";
const PIRATES_COLLECTION = process.env.NEXT_PUBLIC_IMX_PIRATES_COLLECTION || "";
const ITEMS_COLLECTION = process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION || "";
const ASSETS_COLLECTION = process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION || "";
const initialState: IUserReducerInterface = {
  status: "loading",
  searchItemsQuery: "",
  searchPiratesQuery: "",
  piratesReverseCardsAmount: 0,
  keys: {
    walletAddress: "",
  },
  inventory: {
    selected: "summary",
    assetsSelected: "summary",
    filteredPirates: [],
    filteredItems: [],
    pirates: [],
    items: [],
    assets: {
      summary: [],
      chests: [],
      reservations: [],
    },
  },
  tokens: {
    totalRum: 0,
    dailyRum: 0,
    arrcCoins: 0,
    seedBalance: 0,
    ethereum: 0,
    usdc: 0,
    imx: 0,
    toClaim: 0,
    claimResults: [],
    wood: 0,
    stone: 0,
  },
};

export const fetchUserImxCollections = createAsyncThunk(
  "user/fetchUserImxCollections",
  async <T>({ walletAddress, piratesMetaCloudFunction }) => {
    try {
      const piratesImxData = await instance.get(
        `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${PIRATES_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc`
      );
      while (piratesImxData?.data?.remaining > 0) {
        const nextPirates = await instance.get(
          `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${PIRATES_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc&cursor=${piratesImxData?.data?.cursor}`
        );
        piratesImxData.data.result = [
          ...piratesImxData.data.result,
          ...nextPirates.data.result,
        ];
      }
      const piratesMetaData = await piratesMetaCloudFunction.fetch();
      const pirates = mergeImxAndMetaPiratesData(
        piratesImxData?.data?.result,
        piratesMetaData?.data
      );

      const assets = await instance.get(
        `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${ASSETS_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc`
      );
      while (assets?.data?.remaining > 0) {
        const nextAssets = await instance.get(
          `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${ASSETS_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc&cursor=${assets?.data?.cursor}`
        );
        assets.data.result = [
          ...assets?.data?.result,
          ...nextAssets?.data?.result,
        ];
        assets.data.cursor = nextAssets?.data?.cursor;
        assets.data.remaining = nextAssets?.data?.remaining;
      }
      const imxItems = await instance.get(
        `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${ITEMS_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc`
      );
      while (imxItems?.data?.remaining > 0) {
        const nextItems = await instance.get(
          `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${ITEMS_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc&cursor=${imxItems?.data?.cursor}`
        );
        imxItems.data.result = [
          ...imxItems?.data?.result,
          ...nextItems?.data?.result,
        ];
        imxItems.data.cursor = nextItems?.data?.cursor;
        imxItems.data.remaining = nextItems?.data?.remaining;
      }
      const items = await fillItemsMetadata(imxItems?.data?.result);

      const reservations = await instance.get(
        `${IMMUTABLE_URL}/v1/assets?user=${walletAddress}&collection=${ASSETS_COLLECTION}&sell_orders=true&order_by=updated_at&direction=desc`,
        {
          params: {
            metadata: '{"type":["Island reservation"]}',
          },
        }
      );
      return {
        pirates,
        items,
        assets: {
          summary: assets?.data?.result,
          chests: assets?.data?.result.filter(
            (chest) =>
              chest?.image_url === null || chest?.metadata?.type === "Chest"
          ),
          reservations: reservations?.data?.result,
        },
        reverseCardsAmount: pirates.length,
      };
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fetchUserTokensData = createAsyncThunk(
  "user/fetchUserTokensData",
  async <T>({ walletAddress, userTokensCloudFunction }) => {
    try {
      const { totalRum, dailyRum, arrcCoins, seedBalance, stone, wood } =
        await userTokensCloudFunction.fetch();
      return {
        totalRum,
        dailyRum,
        arrcCoins,
        seedBalance,
        stone,
        wood,
      };
    } catch (error) {
      console.log("error", error);
    }
  }
);

export const fetchClaims = createAsyncThunk(
  "user/getClaims",
  async <T>({ handleClaimCloudFunction }) => {
    try {
      const { results, toClaim } = await handleClaimCloudFunction.fetch();
      return { results, toClaim };
    } catch (err) {
      console.log(err);
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setSelected: (state, action: PayloadAction<any>) => {
      state.inventory.selected = action.payload;
    },
    setAssetsSelected: (state, action: PayloadAction<any>) => {
      state.inventory.assetsSelected = action.payload;
    },
    setSearchPiratesQuery: (state, action: PayloadAction<any>) => {
      state.searchPiratesQuery = action.payload;
      state.inventory.filteredPirates = filterPiratesBySearchQuery(
        action.payload,
        state.inventory.pirates
      );
    },
    setSearchItemsQuery: (state, action: PayloadAction<any>) => {
      state.searchItemsQuery = action.payload;
      state.inventory.filteredItems = filterItemsBySearchQuery(
        action.payload,
        state.inventory.items
      );
    },
    setKeys: (state, action: PayloadAction<any>) => {
      state.keys = action.payload;
    },
    setChests: (state, action: PayloadAction<any>) => {
      state.inventory.assets.chests = action.payload;
    },
    setAssetsSummary: (state, action: PayloadAction<any>) => {
      state.inventory.assets.summary = action.payload;
    },
    setClaims: (state, action: PayloadAction<any>) => {
      state.tokens.claimResults = action.payload;
    },
    setToClaim: (state, action: PayloadAction<any>) => {
      state.tokens.toClaim = action.payload;
    },
    setItems: (state, action: PayloadAction<any>) => {
      state.inventory.items = action.payload;
    },
    setPirates: (state, action: PayloadAction<any>) => {
      state.inventory.pirates = action.payload;
    },
    setTokens: (state, action: PayloadAction<any>) => {
      state.tokens = action.payload;
    },
    setPiratesReverseCardAmount: (state, action: PayloadAction<any>) => {
      state.piratesReverseCardsAmount = action.payload;
    },
    setLogout: (state) => {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserImxCollections.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserImxCollections.fulfilled, (state, action) => {
        state.piratesReverseCardsAmount = action.payload?.pirates?.length;
        state.inventory.pirates = action.payload?.pirates;
        state.inventory.items = action.payload?.items;
        state.inventory.assets = action.payload?.assets;
        state.status = "idle";
      })
      .addCase(fetchUserImxCollections.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchUserTokensData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserTokensData.fulfilled, (state, action) => {
        state.tokens.totalRum = action.payload?.totalRum;
        state.tokens.dailyRum = action.payload?.dailyRum;
        state.tokens.arrcCoins = action.payload?.arrcCoins;
        state.tokens.seedBalance = action.payload?.seedBalance;
        state.tokens.stone = action.payload?.stone;
        state.tokens.wood = action.payload?.wood;
        state.status = "idle";
      })
      .addCase(fetchClaims.fulfilled, (state, action) => {
        state.tokens.toClaim = action.payload?.toClaim;
        state.tokens.claimResults = action.payload?.results;
        state.status = "idle";
      })
      .addCase(fetchUserTokensData.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUser = (state: RootState) => state.user;
export const {
  setKeys,
  setPirates,
  setSelected,
  setAssetsSelected,
  setItems,
  setLogout,
  setToClaim,
  setTokens,
  setChests,
  setAssetsSummary,
  setSearchPiratesQuery,
  setSearchItemsQuery,
  setPiratesReverseCardAmount,
  setClaims,
} = userSlice.actions;
export default userSlice.reducer;
