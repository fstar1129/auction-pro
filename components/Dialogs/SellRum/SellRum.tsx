import React, { useEffect, useState } from "react";
import { showError, showSuccess } from "../../../api/toasts";
import { Dialog } from "@headlessui/react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { selectUser, setTokens } from "../../../state/user/userSlice";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import SellRumRange from "./Partials/SellRumRange";
import ArrcCoinsLabel from "./Partials/ArrcCoinsLabel";
import RumAmountLabel from "./Partials/RumAmountLabel";
import Confirmation from "../Partials/Confirm";
import honeybadger from "../../../helpers/honeybadger";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const SellRum: React.FC = (): JSX.Element => {
  const { isUserUpdating } = useMoralis();
  const dispatch = useAppDispatch();
  const version = useMainnetVersion();
  const user = useAppSelector(selectUser);
  const dialog = useAppSelector(selectDialog);

  const [value, setValue] = useState<number>(1);
  const [ask, setAsk] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const buy: any = useMoralisCloudFunction(
    "BuyArrcForRUM",
    { quantity: value },
    { autoFetch: false }
  );

  const buyArrcCoin = async () => {
    setAsk(false);

    if (user.tokens.totalRum < 500) {
      setError(true);
      return;
    }

    setError(false);

    try {
      const result = await buy.fetch();
      dispatch(
        setTokens({
          dailyRum: user.tokens.dailyRum,
          arrcCoins: result.arrc,
          totalRum: result.rum,
          seedBalance: user.tokens.seedBalance,
        })
      );

      dispatch(closeDialog());
      showSuccess(`Successfully swapped ${value * 500} $RUM to ${value} $ARRC`);
    } catch (error) {
      if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
        honeybadger.notify(error);
      }
      setError(true);
      showError(
        "An error occured while swapping $RUM to $ARRC. Please try again later."
      );
    }
  };

  useEffect(() => {
    if (user.tokens.totalRum < 500) {
      return setError(true);
    } else {
      return setError(false);
    }
  }, [user.tokens.totalRum, dialog.isOpen]);

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

          <div className="bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] min-w-[500px] inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-elementor-1 shadow-xl rounded">
            <div className="bg-elementor-1 w-full p-[20px] min-h-[150px] flex items-center justify-center flex-col">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium font-display leading-6 text-elementor-text-3 flex flex-row justify-between items-center"
              >
                <CloseDialogButton />
              </Dialog.Title>

              <label
                htmlFor="default-range"
                className="block mb-2 text-md text-center text-elementor-text-3 font-display w-full"
              >
                {error ? (
                  <div className="text-red-700 w-full font-display">
                    No sufficient RUM amount
                  </div>
                ) : ask ? (
                  <p>Are you sure?</p>
                ) : (
                  <div
                    className={`flex flex-row items-center justify-center font-display text-elementor-text-3`}
                  >
                    <p className={"mx-[5px] font-display"}>Swap </p>

                    <RumAmountLabel value={value} />

                    <p className={"mx-[5px] font-display"}> for </p>

                    <ArrcCoinsLabel value={value} />
                  </div>
                )}
              </label>

              {!ask && !error && !version && (
                <SellRumRange setValue={setValue} value={value} />
              )}

              <Confirmation
                showConfirmation={ask}
                handleCancel={() => setAsk(false)}
                handleConfirm={buyArrcCoin}
              />

              {!ask && !error && !version && (
                <button
                  type="button"
                  className="min-w-[200px] flex mx-auto justify-center my-2 mt-[20px] px-4 py-2 text-lg font-medium font-display hover:bg-[#69bae9] transition duration-300 ease-in-out hover:text-black text-elementor-text-3 border border-elementor-text-1 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500 disabled:opacity-25 disabled:hover:bg-[transparent] disabled:hover:text-elementor-text-3"
                  onClick={() => (version ? null : setAsk(true))}
                  disabled={version || buy.isFetching}
                >
                  {isUserUpdating ? (
                    <span>🙄</span>
                  ) : buy.isFetching ? (
                    "Buying..."
                  ) : (
                    <>
                      Get {value}{" "}
                      <span className={"font-display text-[#fdea5a] mx-2"}>
                        $ARRC
                      </span>{" "}
                      coin{value > 1 ? "s" : ""}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default SellRum;
