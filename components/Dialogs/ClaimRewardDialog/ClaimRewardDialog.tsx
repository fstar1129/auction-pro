import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import ClaimRewardVisuals from "./Partials/ClaimRewardVisuals";
import { showError } from "../../../api/toasts";
import {
  selectUser,
  setSelected,
  setClaims,
  fetchClaims,
  setAssetsSummary,
  setChests,
  setToClaim,
} from "../../../state/user/userSlice";
import { useMoralisCloudFunction } from "react-moralis";
import useCheckImxConnection from "../../../hooks/useCheckImxConnection";
import useMainnetVersion from "../../../hooks/useMainnetVersion";
import axios from "axios";
import honeybadger from "../../../helpers/honeybadger";
import Spinner from "../../Common/Spinner";
import ClaimProgressBar from "./Partials/ClaimProgressBar";

const API_CALL_REPEAT_TIME = 5000;
const GET_CLAIMS = "getClaims";

const ClaimRewardDialog: React.FC = (): JSX.Element => {
  const { isConnectedToImx, connectWalletToImx } = useCheckImxConnection();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const reward = dialog.currentDialogAdditionalData;
  const [minted, updateMintStatus] = useState<boolean>(false);
  const [isClaimMintLoading, setIsClaimMintLoading] = useState<boolean>(false);
  const [isClaimLoading, setIsClaimLoading] = useState<boolean>(false);
  const version = useMainnetVersion();
  const [processProgress, setProcessProgress] = useState<number>(0);

  const claimRewardCloudFunction = useMoralisCloudFunction(
    "ClaimNFT",
    { sku: reward?.name },
    { autoFetch: false }
  );
  const handleClaimCloudFunction = useMoralisCloudFunction(
    GET_CLAIMS,
    {},
    { autoFetch: false }
  );

  const fetchMintStatus = async (id: number) => {
    setIsClaimLoading(true);
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reservation/${id}/`
      );
      if (data?.status === "tokens_minted") {
        setProcessProgress((prev) => (prev < 25 ? 25 : prev));
        const mintStatus = await axios.get(
          `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/mints?token_id=${data?.token_id}&token_address=${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}`
        );
        if (mintStatus?.data?.result?.length > 0) {
          setProcessProgress((prev) => (prev < 50 ? 50 : prev));
          const asset = await axios.get(
            `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets/${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}/${data?.token_id}`
          );
          if (asset?.data?.metadata === null) {
            setTimeout(() => fetchMintStatus(id), API_CALL_REPEAT_TIME);
          } else {
            setProcessProgress((prev) => (prev < 75 ? 75 : prev));
            setTimeout(async () => {
              const assets = await axios.get(
                `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/assets?user=${user.keys.walletAddress}&collection=${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}`
              );
              dispatch(
                setChests(
                  assets?.data?.result?.filter(
                    (chest) =>
                      chest?.image_url === null ||
                      chest?.metadata?.type === "Chest"
                  )
                )
              );
              const claimsRefresh = await handleClaimCloudFunction.fetch();
              setProcessProgress((prev) => (prev < 100 ? 100 : prev));
              dispatch(setClaims(claimsRefresh?.["results"]));
              dispatch(setToClaim(claimsRefresh?.["toClaim"]));
              dispatch(setAssetsSummary(assets?.data?.result));
              setIsClaimMintLoading(false);
              setIsClaimLoading(false);
              updateMintStatus(true);
            }, API_CALL_REPEAT_TIME);
          }
        } else {
          setTimeout(() => fetchMintStatus(id), API_CALL_REPEAT_TIME);
        }
      } else {
        console.log("tokens not minted");
        setTimeout(() => fetchMintStatus(id), API_CALL_REPEAT_TIME);
      }
    } catch (error) {
      showError("Something went wrong...");
      setIsClaimMintLoading(false);
      setIsClaimLoading(false);
      console.log(error);
      console.log(error);
    }
  };

  const handleClaimNFT = async () => {
    setIsClaimMintLoading(true);
    try {
      const {
        data: { reservation_id, success },
      }: any = await claimRewardCloudFunction.fetch();

      if (success !== true || !reservation_id) {
        showError("Something went wrong. Please try again later.");
        setIsClaimMintLoading(false);
        return;
      }
      await fetchMintStatus(reservation_id);
    } catch (error) {
      if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
        honeybadger.notify(error);
      }
      showError("Something went wrong. Please try again later.");
      console.log(error);
      return setIsClaimMintLoading(false);
    }
  };

  useEffect(() => {
    return () => updateMintStatus(false);
  }, []);

  if (!reward) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center">
        <Dialog.Overlay
          className="fixed inset-0 bg-black-400 w-full h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            backdropFilter: "blur(2px)",
          }}
        ></Dialog.Overlay>
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>

        <div className="inline-block w-full text-white max-w-[700px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="flex flex-col sm:flex-row bg-elementor-text-2 justify-between">
            <ClaimRewardVisuals reward={reward} />

            <div className="w-full flex flex-col justify-between mb-2">
              <h1 className="font-display text-4xl font-bold mt-6 text-elementor-text-3 mx-2 mxsm:mt-0 mxsm:mb-1 min-h-[80px]">
                {reward?.name}
              </h1>
              {minted && (
                <div className="flex text-[#33d351] font-display justify-center mt-10 mxsm:mb-2 mxsm:flex-col-reverse items-center">
                  <p className="font-display text-xl">
                    Item claimed successfully!
                  </p>
                  <img
                    src={"check_mark.png"}
                    className={"w-[30px] h-auto ml-2 mxsm:ml-0 mxsm:mb-2"}
                  />
                </div>
              )}

              {reward?.isClaimed === false ? (
                <div className="flex flex-col justify-center mx-1 gap-3">
                  {isClaimLoading ? (
                    <ClaimProgressBar processProgress={processProgress} />
                  ) : (
                    <button
                      className={`duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 h-[64px] mx-1 ${
                        isClaimMintLoading
                          ? "cursor-not-allowed bg-[#3E6A8640] hover:bg-[#3E6A8640] text-gray-400"
                          : ""
                      } ${minted && "hidden"}`}
                      onClick={() =>
                        version
                          ? null
                          : !isConnectedToImx
                          ? connectWalletToImx()
                          : minted
                          ? updateMintStatus(false)
                          : handleClaimNFT()
                      }
                      disabled={version || isClaimMintLoading}
                    >
                      {isClaimMintLoading ? (
                        <span className="flex flex-row justify-center font-display">
                          Claiming item{" "}
                          <span className="mt-1 ml-2">
                            <Spinner />
                          </span>
                        </span>
                      ) : minted ? (
                        "Show my Assets"
                      ) : !isConnectedToImx ? (
                        "Connect to IMX"
                      ) : (
                        "CLAIM"
                      )}
                    </button>
                  )}
                  {minted && (
                    <button
                      className="duration-300 z-10 text-xl tracking-widest bg-[#3E6A86] rounded-sm font-display font-bold text-elementor-text-2 text-center hover:bg-elementor-text-3 h-[64px] mx-1"
                      onClick={() => {
                        dispatch(setSelected("assets"));
                        dispatch(closeDialog());
                      }}
                    >
                      Show my Assets
                    </button>
                  )}
                </div>
              ) : (
                <></>
              )}
            </div>
            <CloseDialogButton />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ClaimRewardDialog;
