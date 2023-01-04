import React, { useState } from "react";
import { Dialog } from "@headlessui/react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import Confirmation from "../Partials/Confirm";
import {useRouter} from "next/router";

const REDIRECT_URL = 'www.google.com';

const DisclaimerDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const [ask, setAsk] = useState<boolean>(true);
  const router = useRouter();

  const handleDisclaimerDecline = (): void => {
    router.push('/redirect');
  }

  const handleDisclaimerAcceptance = () => {
    localStorage.setItem('disclaimer_accepted', 'true');
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

          <div className="bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-elementor-1 shadow-xl rounded">
            <div className="bg-elementor-1 w-full p-[20px] min-h-[150px] flex items-center justify-center flex-col">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium font-display leading-6 text-elementor-text-3 flex flex-row justify-between items-center"
              >
                Please read carefully
              </Dialog.Title>

              <label
                htmlFor="default-range"
                className="block mb-2 mt-10 text-md text-center text-white font-display w-full"
              >
                I hereby accept the <a href="https://arrland-media.s3-eu-central-1.amazonaws.com/docs/T&S_Arrlabs_2022.pdf" className="text-blue-300 hover:text-blue-100" target="_blank" rel="noreferrer noopener">Terms and Conditions, the Privacy Policy</a> and the <a href="https://arrland-media.s3-eu-central-1.amazonaws.com/docs/disclaimer_Arrlabs_2022.pdf" className="text-blue-300 hover:text-blue-100" target="_blank" rel="noreferrer noopener">Disclaimer</a> and declare that I have read them and do not raise any objections.
                I hereby agree to forfeit my right of withdrawal due to the providing of digital content service which is simultaneously linked to a financial market over which Arrlabs FZ-LLC does not perform any direct control, resulting in high price volatility in those markets.
              </label>


              <Confirmation
                showConfirmation={ask}
                handleCancel={handleDisclaimerDecline}
                handleConfirm={handleDisclaimerAcceptance}
                cancelButtonText="Decline"
                confirmButtonText="Accept"
              />
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default DisclaimerDialog;
