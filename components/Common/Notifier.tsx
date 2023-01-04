import React from "react";
import { ToastContainer } from "react-toastify";

const Notifier: React.FC = (): JSX.Element => (
  <ToastContainer
    position="bottom-right"
    autoClose={2000}
    hideProgressBar={true}
    newestOnTop={true}
    closeOnClick
    rtl={false}
    pauseOnHover
    toastStyle={{ backgroundColor: "rgb(17, 19, 28)", color: "#fff" }}
  />
);

export default Notifier;
