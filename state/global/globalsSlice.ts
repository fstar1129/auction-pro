import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { IGlobalReducerInterface } from "../../interfaces";

const initialState: IGlobalReducerInterface = {
  isDevMode: process.env.NEXT_PUBLIC_DEV_MODE === "true" ? true : false,
  errors: {
    globalError: false,
  },
  network: {
    linkUrl:
      process.env.NEXT_PUBLIC_DEV_MODE === "true"
        ? "https://link.sandbox.x.immutable.com"
        : "https://link.x.immutable.com",
    isMainnet: false,
    networkId: "",
  },
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setGlobalError: (state, action: PayloadAction<any>) => {
      state.errors.globalError = action.payload;
    },
    setNetwork: (state, action: PayloadAction<any>) => {
      state.network = action.payload;
    },
  },
});

export const selectGlobal = (state: RootState) => state.global;
export const { setGlobalError, setNetwork } = globalSlice.actions;
export default globalSlice.reducer;
