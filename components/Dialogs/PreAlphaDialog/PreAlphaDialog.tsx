import React from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import { setSelected } from "../../../state/user/userSlice";

const PreAlphaDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const handleClaim = () => {
    dispatch(setSelected("claim"));
    dispatch(closeDialog());
  };

  const handleDownloadGame = () => {
    dispatch(setSelected("download"));
    dispatch(closeDialog());
  };

  const handleDisclaimerAcceptance = () => {
    localStorage.setItem("claim_access_accepted", "true");
    dispatch(closeDialog());
  };

  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(closeDialog())}
        open={dialog.isOpen}
      >
        <div className="min-h-screen px-4 text-center">
          <Dialog.Overlay
            className="fixed inset-0 bg-black-400 w-full h-full"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(2px)",
            }}
          />
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 inline-block w-full max-w-[700px] my-8 overflow-hidden text-left align-middle transition-all transform shadow-xl rounded">
            <div className="bg-elementor-text-2 p-8 min-h-[150px] flex items-center justify-center flex-col mxsm:p-4">
              <CloseDialogButton />
              <Dialog.Title
                as="h3"
                className="text-4xl font-medium font-display leading-10 text-elementor-text-1 flex flex-row justify-between items-center mb-6 mt-1 text-center mxsm:mt-4"
              >
                PRE-ALPHA ACCESS
              </Dialog.Title>

              <p className="text-elementor-text-3 max-w-[650px] text-center font-display mb-5">
                Join the battle with the pre-alpha access made available. You
                can see for yourself how much fun our game brings, despite such
                an early stage of development.
              </p>
              <p className="text-[#979590] mb-7 max-w-[600px] text-center font-display">
                (access available to every Genesis Pirate owner, Tenset Pirate
                owner, pre-island token owner and $RUM owner)
              </p>
              <img
                src="https://media.discordapp.net/attachments/895262716875374612/1054306673453449238/join_pre_alpha_now.png?width=930&height=523"
                className="bg-elementor-text-3 text-center text-white justify-center mb-1 object-scale-down"
                alt="Image"
              ></img>
              <div className="flex flex-row gap-5">
                <button
                  className="duration-300 tracking-wider bg-[#3E6A86] text-elementor-text-2 rounded-sm text-xl font-display font-bold text-center w-[225px] hover:bg-elementor-text-3 min-h-[48px] justify-center mxsm:w-full mt-5"
                  onClick={() => {
                    handleClaim();
                    handleDisclaimerAcceptance();
                  }}
                >
                  CLAIM ACCESS
                </button>
                <button
                  className="duration-300 tracking-wider bg-[#3E6A86] text-elementor-text-2 rounded-sm text-xl font-display font-bold text-center w-[225px] hover:bg-elementor-text-3 min-h-[48px] justify-center mxsm:w-full mt-5"
                  onClick={handleDownloadGame}
                >
                  DOWNLOAD GAME
                </button>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default PreAlphaDialog;
