import { useEffect, useState } from "react";
import { useMoralisCloudFunction } from "react-moralis";

const MORALIS_CLOUD_MAINTENANCE = "GetMaintenanceMode";

const useCheckMaintenanceMode = () => {
  const _moralisMaintenance = useMoralisCloudFunction(
    MORALIS_CLOUD_MAINTENANCE,
    {},
    { autoFetch: false }
  );
  const [isMaintenanceMode, setIsMaintenanceMode] = useState<boolean | unknown>(
    false
  );

  useEffect(() => {
    async function checkMode() {
      try {
        const moralisResult = await _moralisMaintenance.fetch();
        setIsMaintenanceMode(moralisResult);
      } catch (error) {
        console.log("error", error);
      }
    }

    void checkMode();
  }, []);

  return isMaintenanceMode;
};

export default useCheckMaintenanceMode;
