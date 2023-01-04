import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "@headlessui/react";
import { useMoralisCloudFunction } from "react-moralis";
import { showError } from "../../../api/toasts";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  selectUser,
  setAssetsSummary,
  setChests,
  setTokens,
} from "../../../state/user/userSlice";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";
import CloseDialogButton from "../Partials/CloseDialogButton";
import { TError } from "../../../types/index";
import Checkmark from "../../Common/Checkmark";
import Spinner from "../../Common/Spinner";
import BuyChestInfo from "./Partials/BuyChestInfo";
import BuyChestButton from "./Partials/BuyChestButton";
import Confirmation from "../Partials/Confirm";
import honeybadger from "../../../helpers/honeybadger";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const API_CALL_REPEAT_TIME = 5000;
const NO_AMOUNT_TXT = "No sufficient ARRC coins amount";

export default function BuyChest() {
  const user = useAppSelector(selectUser);
  const dialog = useAppSelector(selectDialog);
  const version = useMainnetVersion();
  const dispatch = useAppDispatch();
  const { loading } = useCheckImxConnection();
  const [ask, setAsk] = useState<boolean>(false);
  const [minted, updateMintStatus] = useState<boolean>(false);
  const [error, setError] = useState<TError>({
    isError: false,
    description: "",
  });
  const [isChestMintLoading, setIsChestMintLoading] = useState<boolean>(false);

  const buyChestCloudFunction = useMoralisCloudFunction(
    "BuyChestForArrc",
    {},
    { autoFetch: false }
  );

  const check = () => {
    if (user.tokens.arrcCoins < 2) {
      return setError({
        isError: true,
        description: NO_AMOUNT_TXT,
      });
    } else {
      setAsk(true);
    }
  };

  const fetchMintStatus = async (id: number) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reservation/${id}/`
      );
      console.log(data);
      if (data?.status == "tokens_minted") {
        const summary = await axios.get(
          `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets?user=${user.keys.walletAddress}&collection=${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}`
        );
        setIsChestMintLoading(false);
        updateMintStatus(true);
        setTimeout(() => {
          dispatch(
            setChests(
              summary?.data?.result?.filter(
                (chest) =>
                  chest?.image_url === null || chest?.metadata?.type === "Chest"
              )
            )
          );
          dispatch(setAssetsSummary(summary?.data?.result));
        }, API_CALL_REPEAT_TIME / 5);
      } else {
        setTimeout(() => fetchMintStatus(id), API_CALL_REPEAT_TIME);
      }
    } catch (error) {
      if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
        honeybadger.notify(error);
      }
      console.log(error);
      showError("Something went wrong...");
      setIsChestMintLoading(false);
    }
  };

  const handleBuyChest = async () => {
    setAsk(false);

    if (user.tokens.arrcCoins < 2) {
      return setError({
        isError: true,
        description: NO_AMOUNT_TXT,
      });
    }

    setError({ isError: false, description: "" });
    setIsChestMintLoading(true);

    try {
      const {
        arrc,
        data: { reservation_id, success },
      }: any = await buyChestCloudFunction.fetch();

      if (success !== true || !reservation_id) {
        showError("Something went wrong. Please try again later.");
        setIsChestMintLoading(false);
        return;
      }

      dispatch(setTokens({ ...user.tokens, arrcCoins: arrc }));
      await fetchMintStatus(reservation_id);
    } catch (error) {
      if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
        honeybadger.notify(error);
      }
      showError("Something went wrong. Please try again later.");
      return setIsChestMintLoading(false);
    }
  };

  useEffect(() => {
    if (user.tokens.arrcCoins < 2) {
      return setError({
        isError: true,
        description: NO_AMOUNT_TXT,
      });
    } else {
      setError({ isError: false, description: "" });
    }
  }, [dialog.isOpen]);

  useEffect(() => {
    return () => updateMintStatus(false);
  }, []);

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

          <div className="bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] inline-block w-full overflow-hidden text-left align-middle transition-all transform bg-elementor-1 shadow-xl rounded max-w-[450px]">
            <div className="bg-elementor-1 p-[20px] pb-3">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium font-display leading-6 text-elementor-text-3 flex flex-row justify-between items-center dsm:flex-wrap"
              >
                <CloseDialogButton />
              </Dialog.Title>

              <div className="text-md text-center text-elementor-text-3 font-display m-4 mt-[30px] flex items-center justify-center flex-col">
                {error.isError ? (
                  <div className="text-red-700 font-display">
                    {error.description}
                  </div>
                ) : ask ? (
                  <p className="text-xl font-display">Are you sure?</p>
                ) : isChestMintLoading || loading ? (
                  <p className="text-xl font-display">Loading...</p>
                ) : minted ? (
                  <div className="text-[#33d351] font-display text-lg">
                    Successfully minted new chest!
                  </div>
                ) : (
                  <BuyChestInfo />
                )}
              </div>

              {!error.isError && !minted && !ask && !isChestMintLoading && (
                <img
                  src={"chest_no_shadow.png"}
                  className="mx-auto w-[200px] h-auto mt-[10px]"
                  alt="Chest with no shadow"
                />
              )}

              {isChestMintLoading && <Spinner />}
              {minted && <Checkmark />}

              <Confirmation
                showConfirmation={ask}
                handleCancel={() => setAsk(false)}
                handleConfirm={handleBuyChest}
              />

              {!ask && !error.isError && (
                <BuyChestButton
                  minted={minted}
                  check={check}
                  isChestMintLoading={isChestMintLoading}
                  updateMintStatus={updateMintStatus}
                  version={version}
                />
              )}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
