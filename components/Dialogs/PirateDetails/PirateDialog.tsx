import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import ReactTooltip from "react-tooltip";
import { useMoralisCloudFunction } from "react-moralis";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { selectUser } from "../../../state/user/userSlice";
import {
  closeDialog,
  openDialog,
  selectDialog,
} from "../../../state/dialog/dialogSlice";
import CloseDialogButton from "../Partials/CloseDialogButton";
import Spinner from "../../Common/Spinner";
import EmptyInventorySquare from "./Partials/EmptyInventorySquare";
import InventoryItem from "./Partials/InventoryItem";
import PirateMainStats from "./Partials/PirateMainStats";
import ItemDescription from "./Partials/ItemDescription";
import PirateVisuals from "./Partials/PirateVisuals";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import DialogRightArrow from "../Partials/DialogRightArrow";
import useMainnetVersion from "../../../hooks/useMainnetVersion";

const MORALIS_GET_TOKEN_ITEMS_CLOUD = "GetTokenItem";

const PirateDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const dialog = useAppSelector(selectDialog);
  const pirate = dialog.currentDialogAdditionalData;
  const [inventory, setInventory] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);
  const overallPirates = user.inventory.pirates.length;
  const version = useMainnetVersion();

  const getTokenItemsCloudFunction = useMoralisCloudFunction(
    MORALIS_GET_TOKEN_ITEMS_CLOUD,
    { token_id: parseInt(pirate?.token_id) },
    { autoFetch: true }
  );

  useEffect(() => {
    async function fetchItems() {
      try {
        const result = await getTokenItemsCloudFunction.fetch();
        setInventory(result);
      } catch (error) {}
    }

    if (dialog.isOpen === true) {
      fetchItems().then(null);
    }
  }, [dialog.isOpen, pirate]);

  const displayInventory = () => {
    if (inventory === null) {
      return <Spinner />;
    }

    if (inventory?.length > 8) {
      inventory.map((item, index) => {
        return (
          <InventoryItem
            activeItem={activeItem}
            description={item?.description}
            image={item?.image}
            name={item?.name}
            key={item?.name + index}
            setActiveItem={setActiveItem}
          />
        );
      });
    }

    return [...Array(8)].map((_, index) => {
      if (index < inventory?.length) {
        return (
          <InventoryItem
            activeItem={activeItem}
            description={inventory[index]?.description}
            image={inventory[index]?.image}
            name={inventory[index]?.name}
            key={inventory[index]?.name + index}
            setActiveItem={setActiveItem}
          />
        );
      }

      return (
        <EmptyInventorySquare
          key={`no_item_${index}`}
          setActiveItem={setActiveItem}
        />
      );
    });
  };

  const calculateIndex = () => {
    if (!user.inventory.pirates) return;

    return user.inventory.pirates.findIndex((object) => {
      return pirate?.id == object?.id;
    });
  };

  const handlePreviousPirate = () => {
    const index = calculateIndex();
    const handlePrevIndex = () => setActiveIndex(activeIndex - 1);

    if (index === 0) {
      return;
    }

    if (activeIndex === 0) {
      setActiveIndex(0);
    } else {
      handlePrevIndex();
    }
  };

  const handleNextPirate = () => {
    const handleNextIndex = () => setActiveIndex(activeIndex + 1);

    if (activeIndex >= overallPirates) {
      setActiveIndex(overallPirates);
    } else {
      handleNextIndex();
    }
  };

  useEffect(() => {
    dispatch(
      openDialog({
        currentDialog: "PIRATE_DETAILS",
        currentDialogAdditionalData: user.inventory.pirates[activeIndex],
      })
    );
  }, [activeIndex]);

  useEffect(() => {
    let index = calculateIndex();
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    if (inventory === null) {
      return;
    }

    setActiveItem(inventory[0]);
  }, [inventory]);

  if (!pirate) return;

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

        <div className="inline-block w-full text-white max-w-[980px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxxl:top-[110%] mxxl:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePreviousPirate}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2">
            <PirateVisuals
              pirate={pirate}
              activeIndex={activeIndex}
              handlePreviousPirate={handlePreviousPirate}
              trackingItem={user.inventory.pirates}
              handleNextPirate={handleNextPirate}
              overall={overallPirates}
              version={version}
            />

            <div className="w-full">
              <div className="text-lg flex flex-col h-full w-full">
                <div className="font-display flex justify-between items-center flex-row text-elementor-text-3 text-lg uppercase border-b-2 border-l-2 border-[#2a2826] w-full text-center relative">
                  <span className="ml-2 text-elementor-text-3 font-display">
                    {pirate?.name}
                  </span>
                  <div className="mxsm:fixed mxsm:top-[5px] mxsm:right-[5px] z-20 w-10">
                    <CloseDialogButton />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row border-b-2 border-l-2 border-r-2 border-[#2a2826]">
                  <div className="grid grid-cols-4 border-r-2 border-[#2a2826] min-w-[380px] sm:min-w-[420px]">
                    {displayInventory()}
                  </div>
                  <ItemDescription activeItem={activeItem} />
                </div>

                <PirateMainStats pirate={pirate} />
              </div>
            </div>
          </div>
          <div className="absolute top-[50%] -right-[70px] mxxl:top-[110%] mxxl:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={user.inventory.pirates}
              activeIndex={activeIndex}
              handleNext={handleNextPirate}
              overall={overallPirates}
            />
          </div>
        </div>
        <ReactTooltip delayHide={100} delayShow={100} isCapture={true} />
      </div>
    </Dialog>
  );
};

export default PirateDialog;
