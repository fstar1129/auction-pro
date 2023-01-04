import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../app/store';
import { IDialogInterface } from '../../interfaces';
import {TDialog} from "../../interfaces/IDialogInterface";

export type TDialogPayload = {
  currentDialog: TDialog;
  currentDialogAdditionalData?: any;
}

const initialState: IDialogInterface = {
  status: 'idle',
  dialog: {
    isOpen: false,
    currentDialog: 'NONE',
    currentDialogAdditionalData: null
  }
};

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<TDialogPayload>) => {
      state.dialog.currentDialog = action.payload.currentDialog;
      state.dialog.isOpen = true;
      state.dialog.currentDialogAdditionalData = action.payload.currentDialogAdditionalData;
    },
    closeDialog: (state) => {
      state.dialog.currentDialog = 'NONE';
      state.dialog.isOpen = false;
      state.dialog.currentDialogAdditionalData = null;
    },
  },
});

export const selectDialog = (state: RootState) => state.dialog.dialog;
export const { openDialog, closeDialog } = dialogSlice.actions;
export default dialogSlice.reducer;
