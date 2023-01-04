import { Dialog } from "@headlessui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import {
  closeDialog,
  openDialog,
  selectDialog,
} from "../../../state/dialog/dialogSlice";
import ItemVisuals from "./Pratials/ItemVisuals";
import CloseDialogButton from "../Partials/CloseDialogButton";
import DesktopMetadata from "./Pratials/DesktopMetadata";
import MobileMetadata from "./Pratials/MobileMetadata";
import ItemDetailsButtons from "./Pratials/ItemDetailsButtons";
import { selectUser } from "../../../state/user/userSlice";
import DialogLeftArrow from "../Partials/DialogLeftArrow";
import DialogRightArrow from "../Partials/DialogRightArrow";
import useMainnetVersion from "../../../hooks/useMainnetVersion";
import Spinner from "../../Common/Spinner";

const ItemDialog: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const [inventory, setInventory] = useState<any>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeIndex, setActiveIndex] = useState<any>(null);
  const overallItems = user.inventory.items.length;
  const dialog = useAppSelector(selectDialog);
  const item = dialog.currentDialogAdditionalData;
  const version = useMainnetVersion();

  const calculateIndex = () => {
    if (!user.inventory.items) return;

    return user.inventory.items.findIndex((object) => {
      return item.id == object.id;
    });
  };

  const handlePreviousItem = () => {
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

  const handleNextItem = () => {
    const handleNextIndex = () => setActiveIndex(activeIndex + 1);

    if (activeIndex >= overallItems) {
      setActiveIndex(overallItems);
    } else {
      handleNextIndex();
    }
  };

  useEffect(() => {
    dispatch(
      openDialog({
        currentDialog: "ITEM_DETAILS",
        currentDialogAdditionalData: user.inventory.items[activeIndex],
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

  if (!item) return;

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={() => dispatch(closeDialog())}
      open={dialog.isOpen}
    >
      <div className="min-h-screen text-center duration-300">
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

        <div className="inline-block w-full text-white max-w-[960px] text-left align-middle rounded-sm transition-all transform bg-elementor-1 bg-gradient-to-b p-[2px] from-elementor-text-3 to-elementor-text-1 shadow-xl">
          <div className="absolute top-[50%] -left-[40px] mxxl:top-[110%] mxxl:left-[42%] mxsm:hidden">
            <DialogLeftArrow
              activeIndex={activeIndex}
              handlePrevious={handlePreviousItem}
            />
          </div>
          <div className="flex flex-col sm:flex-row bg-elementor-text-2">
            <ItemVisuals
              item={item}
              activeIndex={activeIndex}
              handlePreviousItem={handlePreviousItem}
              trackingItem={user.inventory.items}
              handleNextItem={handleNextItem}
              overall={overallItems}
              version={version}
            />
            <div className="w-full">
              <h1 className="font-display text-4xl font-bold my-6 text-elementor-text-3 px-2">
                {!item?.name && !item?.metadata?.name
                  ? (
                      <>
                        <div className="mt-[1px]">
                          <Spinner />
                        </div>
                      </>
                    ) +
                    "#" +
                    item?.token_id
                  : item?.metadata?.name}
              </h1>

              <DesktopMetadata item={item} />
              <MobileMetadata item={item} />
            </div>
            <CloseDialogButton />
          </div>
          <div className="absolute top-[50%] -right-[70px] mxxl:top-[110%] mxxl:right-[38%] mxsm:hidden">
            <DialogRightArrow
              trackingItem={user.inventory.pirates}
              activeIndex={activeIndex}
              handleNext={handleNextItem}
              overall={overallItems}
            />
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default ItemDialog;
