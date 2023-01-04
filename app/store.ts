import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import globalReducer from "../state/global/globalsSlice";
import userReducer from "../state/user/userSlice";
import dialogReducer from "../state/dialog/dialogSlice";
import marketplaceReducer from "../state/marketplace/marketplaceSlice";

export const store = configureStore({
  reducer: {
    global: globalReducer,
    user: userReducer,
    dialog: dialogReducer,
    marketplace: marketplaceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
