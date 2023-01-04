import { useEffect, useState } from "react";
import instance from "../app/request";
import { useAppSelector } from "../app/store-hooks";
import { Link } from "@imtbl/imx-sdk";
import { showError } from "../api/toasts";
import { selectUser } from "../state/user/userSlice";

const useCheckImxConnection = () => {
  const user = useAppSelector(selectUser);
  const [isConnectedToImx, setIsConnectedToImx] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const connectWalletToImx = async () => {
    const link = new Link(process.env.NEXT_PUBLIC_IMMUTABLE_X_LINK_URL);

    try {
      // Using none as option (list all available options including Magic):

      const { starkPublicKey } = await link.setup({});
      await localStorage.setItem("STARK_PUBLIC_KEY", starkPublicKey);
      setIsConnectedToImx(true);
    } catch (error) {
      console.log(error);
      showError("Something went wrong. Please try again later. Sorry.");
    }
  };

  useEffect(() => {
    async function checkImxWalletConnection() {
      try {
        setLoading(true);

        const result = await instance.get(
          `${process.env.NEXT_PUBLIC_IMMUTABLE_X_URL}/v1/users/${user.keys.walletAddress}`
        );
        const strkKey = localStorage.getItem("STARK_PUBLIC_KEY");

        if (strkKey === null || strkKey !== result?.data?.accounts[0]) {
          setIsConnectedToImx(false);
          setLoading(false);
          return;
        }

        setLoading(false);
        setIsConnectedToImx(true);
      } catch (error) {
        console.log(error);
        setIsConnectedToImx(false);
        setLoading(false);
      }
    }

    void checkImxWalletConnection();
  }, []);

  return { loading, isConnectedToImx, connectWalletToImx };
};

export default useCheckImxConnection;
