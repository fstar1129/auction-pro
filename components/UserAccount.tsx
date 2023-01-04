import React, { useEffect, useState } from "react";
import UserInventory from "./UserInventory";
import useSubscribeToNetworkListener from "../hooks/useSubscribeToNetworkListener";
import { useRouter } from "next/router";
import { IProfile } from "../pages";
import UserTokens from "./UserTokens/UserTokens";
import UserBalance from "./UserTokens/Partials/UserBalance";
import { useAppDispatch, useAppSelector } from "../app/store-hooks";
import { selectUser, setSelected } from "../state/user/userSlice";
import ChangeNetworkCard from "./ChangeNetworkCard";
import { useChain, useMoralis } from "react-moralis";
import { closeDialog, selectDialog } from "../state/dialog/dialogSlice";

const UserAccount: React.FC<IProfile> = ({ lastBuildSHA }): JSX.Element => {
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [chain, setChain] = useState(false);
  const dialog = useAppSelector(selectDialog);
  const { chainId } = useChain();
  const _ = useSubscribeToNetworkListener();
  const router = useRouter();
  const { isWeb3Enabled, enableWeb3 } = useMoralis();
  useEffect(() => {
    async function enable() {
      await enableWeb3({ provider: "walletconnect" });
    }
    if (!isWeb3Enabled) {
      enable();
    }
  }, [isWeb3Enabled]);

  useEffect(() => {
    const checkBuild = async () => {
      const sha = process.env.NEXT_PUBLIC_BUILD_SHA;
      let localBuild = await localStorage.getItem("localBuild");
      if (!localBuild || localBuild !== sha) {
        await localStorage.setItem("localBuild", sha);
        return router.reload();
      }
      return;
    };
    void checkBuild();
  }, []);

  useEffect(() => {
    if (
      chainId !== "0x1" &&
      chainId !== null &&
      process.env.NEXT_PUBLIC_DEV_MODE === "false" &&
      dialog?.currentDialog !== "DISCLAIMER_DIALOG"
    ) {
      setChain(true);
      dispatch(closeDialog());
      dispatch(setSelected("summary"));
    } else {
      setChain(false);
    }
  }, [chainId, dialog?.currentDialog]);

  return (
    <>
      <div
        className={`flex w-full mxlg:justify-center mxlg:items-center pl-10 min-h-[75px] mxlg:pl-0 ${
          user.inventory.selected === "summary" && "hidden"
        }`}
      >
        {user.inventory.selected === "marketplace" ? (
          <UserBalance />
        ) : (
          <UserTokens />
        )}
        {chain && <ChangeNetworkCard />}
      </div>
      <UserInventory />
    </>
  );
};

export default UserAccount;
