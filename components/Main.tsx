import React, { useEffect } from "react";
import Notifier from "./Common/Notifier";
import "react-toastify/dist/ReactToastify.css";
import useCheckMaintenanceMode from "../hooks/useCheckMaintenanceMode";
import useIsAuthenticated from "../hooks/useIsAuthenticated";
import Maintenance from "./Maintenance";
import Authentication from "./Authentication/Authentication";
import UserAccount from "./UserAccount";
import Navbar from "./Navbar";
import DialogProvider from "./Dialogs/DialogProvider";
import { IProfile } from "../pages";
import { useAppDispatch } from "../app/store-hooks";
import { openDialog } from "../state/dialog/dialogSlice";

const Main: React.FC<IProfile> = ({ lastBuildSHA }): JSX.Element => {
  const maintenance = useCheckMaintenanceMode();
  const { isAuthenticated } = useIsAuthenticated();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (
      !localStorage.getItem("disclaimer_accepted") &&
      !localStorage.getItem("is_logged")
    ) {
      dispatch(openDialog({ currentDialog: "DISCLAIMER_DIALOG" }));
    }
  }, []);

  if (maintenance) {
    return <Maintenance />;
  }

  return (
    <div className="min-h-full w-full">
      {isAuthenticated && <Navbar />}

      <div className="flex align-center justify-center flex-col min-w-screen md:px-5 mx-auto text-center text-display3 text-white mr-4">
        {isAuthenticated ? (
          <UserAccount lastBuildSHA={lastBuildSHA} />
        ) : (
          <Authentication />
        )}
      </div>
      <Notifier />
      <DialogProvider />
    </div>
  );
};

export default Main;
