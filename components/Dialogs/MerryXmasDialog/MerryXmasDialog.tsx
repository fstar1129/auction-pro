import React from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import { setSelected } from "../../../state/user/userSlice";

const MarryXmasDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);

  const handleXmasClaim = () => {
    localStorage.setItem("merry_xmas_accepted", "true");
    dispatch(setSelected("claim"));
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
                className="text-4xl font-bold font-display leading-10 text-elementor-text-1 flex flex-row justify-between items-center mb-6 mt-1 text-center mxsm:mt-4"
              >
                MERRY CHRISTMAS!
              </Dialog.Title>

              <p className="text-elementor-text-3 max-w-[650px] text-center font-display mb-3 font-bold">
                Dear Pirates of the Arrland community member!
              </p>
              <p className="text-elementor-text-3 max-w-[620px] text-center font-display mb-7">
                Claim a limited edition NFT 2022 Christmas reward. In the
                future, they will serve as decorations on your private islands.
              </p>
              <img
                src="banners/Merry_christmas.png"
                className="bg-elementor-text-3 text-center text-white justify-center mb-1 object-scale-down shadow-md"
                alt="Image"
              ></img>

              <button
                className="duration-300 tracking-wider bg-[#3E6A86] text-elementor-text-2 rounded-sm text-xl font-display font-bold text-center hover:bg-elementor-text-3 min-h-[48px] justify-center mt-5 w-[200px] mxsm:w-full"
                onClick={() => {
                  handleXmasClaim();
                }}
              >
                CLAIM
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default MarryXmasDialog;
