import { Dialog } from "@headlessui/react";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";

const SeedRumInfo: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center flex justify-center items-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        />

        <div className="inline-block w-full text-white max-w-[600px] overflow-hidden text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] shadow-xl">
          <div className="bg-elementor-text-2 h-[150px] inline-flex ">
            <p className="flex justify-center items-center text-center font-display p-7">
              Putting up for sale or transferring an NFT pirate to another
              wallet resets the RUM it has accrued to date.
            </p>
            <CloseDialogButton />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default SeedRumInfo;
