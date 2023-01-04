import React, { useEffect, useState } from "react";
import axios from "axios";
import { ERC721TokenType, Link } from "@imtbl/imx-sdk";
import { Dialog } from "@headlessui/react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import { showError } from "../../../api/toasts";
import ReactPlayer from "react-player";
import {
  fetchUserImxCollections,
  selectUser,
} from "../../../state/user/userSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { closeDialog, selectDialog } from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import CloseButton from "./Partials/CloseButton";
import OpenChestButton from "./Partials/OpenChestButton";
import Item, { TItem } from "./Partials/Item";
import honeybadger from "../../../helpers/honeybadger";
import useMainnetVersion from "../../../hooks/useMainnetVersion";
import Moralis from "moralis-v1";

const WAITING_VIDEO_URL =
  "https://arrland-media.s3.eu-central-1.amazonaws.com/chests/waiting.mp4";
const OPENING_VIDEO_URL =
  "https://arrland-media.s3.eu-central-1.amazonaws.com/chests/opening.mp4";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const MORALIS_CLOUD_BURN = "NftBurn";
const MORALIS_CLOUD_GET_ITEM_DATA = "getItemMetaData";

const API_CALL_REPEAT_TIME = 5000;
const DISPLAY_ITEM_DELAY = 1000;

type TInitialItem = {
  itemTokenId: null | string;
  item: null | TItem;
  display: boolean;
};

type TMoralisCloudData = {
  data?: {
    reservation_id?: number;
  };
};

const initialItem: TInitialItem = {
  itemTokenId: null,
  item: null,
  display: false,
};

const OpenChest: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const dialog = useAppSelector(selectDialog);
  const version = useMainnetVersion();
  const userSelector = useAppSelector(selectUser);
  let link = new Link(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);
  const { token_id, token_address, image_url } =
    dialog.currentDialogAdditionalData;
  const [playing, setPlaying] = useState<boolean>(false);
  const [videoUrl, setVideoUrl] = useState<string>(WAITING_VIDEO_URL);
  const [success, setSuccess] = useState<boolean>(false);
  const [item, setItem] = useState<TInitialItem>(initialItem);
  const [opening, setOpening] = useState<boolean>(false);
  const [disabled, setDisabled] = useState<boolean>(false);
  const [functionResult, setFunctionResult] = useState<any>({});

  const { user } = useMoralis();
  const installationId = localStorage.getItem(
    "Parse/u1kBBfSMtnjO3cvGFGpEJS3jngxnMRVflAMyo8Vs/installationId"
  );
  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );
  const burnNftCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_BURN,
    { burnId: token_id },
    { autoFetch: false }
  );
  const getItemDataCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GET_ITEM_DATA,
    { token_id: item.itemTokenId },
    { autoFetch: false }
  );

  useEffect(() => {
    if (dialog.isOpen === false && success && item.display) {
      setVideoUrl(WAITING_VIDEO_URL);
      setPlaying(false);
      setSuccess(false);
      setItem(initialItem);
    }
  }, [dialog.isOpen]);

  const resetToDefaults = (error): void => {
    if (process.env.NEXT_PUBLIC_DEV_MODE !== "true") {
      honeybadger.notify(error);
    }
    setVideoUrl(WAITING_VIDEO_URL);
    setPlaying(false);
    setSuccess(false);
    setItem(initialItem);
    setOpening(false);
    showError("Something went wrong, please come back later!");
    console.log(error);
  };

  const fetchMintStatus = async (id: number) => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/reservation/${id}/`
      );

      if (data?.status == "tokens_minted") {
        dispatch(
          fetchUserImxCollections({
            walletAddress: userSelector.keys.walletAddress,
            piratesMetaCloudFunction,
          })
        );
        setItem({ ...item, itemTokenId: data?.token_id });
        setDisabled(true);
      } else {
        setTimeout(() => fetchMintStatus(id), API_CALL_REPEAT_TIME);
      }
    } catch (error) {
      resetToDefaults(error);
    }
  };

  useEffect(() => {
    if (item.itemTokenId === null && item.item === null) return;

    const fetchNewItemData = async () => {
      if (item.item !== null) return;

      try {
        const newItemData = await getItemDataCloudFunction.fetch();
        setVideoUrl(OPENING_VIDEO_URL);
        setSuccess(true);
        setTimeout(() => {
          setItem({ ...item, item: newItemData, display: true });
        }, DISPLAY_ITEM_DELAY);
      } catch (error) {
        resetToDefaults(error);
        console.log(error);
      }
    };

    void fetchNewItemData();
  }, [item]);

  const handleChestOpen = async () => {
    try {
      setOpening(true);
      let res = await link.transfer([
        {
          type: ERC721TokenType.ERC721,
          tokenId: token_id,
          tokenAddress: token_address,
          toAddress: "0x0000000000000000000000000000000000000000",
        },
      ]);
      if (res?.result[0]?.status === "success") {
        const burnedNft: TMoralisCloudData = await burnNftCloudFunction.fetch();
        const { reservation_id } = burnedNft?.data;
        if (!reservation_id) {
          return resetToDefaults("No reservation id");
        }
        await fetchMintStatus(reservation_id);
      }
      setPlaying(true);
      setOpening(false);
    } catch (error) {
      resetToDefaults(error);
    }
  };

  return (
    <>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => dispatch(closeDialog())}
        open={dialog.isOpen}
      >
        <div className="min-h-screen text-center">
          <Dialog.Overlay
            className="fixed inset-0 w-full h-full"
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

          <div className="relative bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] w-auto inline-block max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-elementor-1 shadow-xl rounded">
            <CloseDialogButton />
            <div>
              <div className="w-[384px] min-h-[474px] bg-[#12151D] justify-between">
                {success && item.display && <Item item={item?.item} />}
                <div className="flex flex-row justify-between ">
                  <div className="text-elementor-text-3 font-display text-3xl fext-bold text-left ml-2 mt-1">
                    Chest
                  </div>
                  <div className="text-elementor-text-3 font-display text-3xl fext-bold text-right mr-2 mt-1">
                    #{token_id}
                  </div>
                </div>

                <ReactPlayer
                  width={"384px"}
                  height={"384px"}
                  url={videoUrl}
                  loop={success ? false : true}
                  playing={playing}
                  fallback={
                    <img
                      src={"chest_no_shadow.png"}
                      className="mx-auto w-[200px] h-auto"
                    />
                  }
                />
              </div>

              {!success && !playing && (
                <>
                  <OpenChestButton
                    isDisabled={version || parseInt(token_id) > 20000}
                    playing={playing}
                    handleChestOpen={handleChestOpen}
                    opening={opening || disabled}
                  />
                </>
              )}
              {success && !playing && <CloseButton />}
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default OpenChest;
