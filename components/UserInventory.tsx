import { useEffect, useState } from "react";
import InventorySwitcher from "./Common/InventorySwitcher";
import Items from "./Items/Items";
import InventoryFilterPanel from "./Common/InventoryFilterPanel";
import { useAppDispatch, useAppSelector } from "../app/store-hooks";
import { selectUser } from "../state/user/userSlice";
import Summary from "./Summary/Summary";
import Pirates from "./Pirates/Pirates";
import Assets from "./Assets/Assets";
import Marketplace from "./Marketplace/Marketplace";
import MarketplaceSwitchPanel from "./Marketplace/Partials/MarketplaceSwitchPanel";
import AssetsSwitcher from "./Assets/Partials/AssetsSwitcher";
import Claim from "./Claim/Claim";
import DownloadGame from "./DownloadGame/DownloadGame";
import Menu from "./Menu/Menu";
import axios from "axios";
import ArrlandMap from "./ArrlandMap/ArrlandMap";

const URL_PIRATES = `${process.env.NEXT_PUBLIC_IMX_MARKETPLACE_URL}/v1/collections/${process.env.NEXT_PUBLIC_IMX_PIRATES_COLLECTION}/stats`;
const URL_ITEMS = `${process.env.NEXT_PUBLIC_IMX_MARKETPLACE_URL}/v1/collections/${process.env.NEXT_PUBLIC_IMX_ITEMS_COLLECTION}/stats`;
const URL_ASSETS = `${process.env.NEXT_PUBLIC_IMX_MARKETPLACE_URL}/v1/collections/${process.env.NEXT_PUBLIC_IMX_ASSETS_COLLECTION}/stats`;

const UserInventory: React.FC = (): JSX.Element => {
  const [piratesStats, setPiratesStats] = useState([]);
  const [itemsStats, setItemsStats] = useState([]);
  const [assetsStats, setAssetsStats] = useState([]);
  const [hide, setHide] = useState<boolean>(true);
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      const fetchPiratesGlobalStats = async () => {
        const res = await axios.get(URL_PIRATES);
        setPiratesStats(res?.data);
        dispatch;
      };
      const fetchItemsGlobalStats = async () => {
        const res = await axios.get(URL_ITEMS);
        setItemsStats(res?.data);
      };
      const fetchAssetsGlobalStats = async () => {
        const res = await axios.get(URL_ASSETS);
        setAssetsStats(res?.data);
      };
      fetchItemsGlobalStats();
      fetchAssetsGlobalStats();
      fetchPiratesGlobalStats();
    } catch (err) {
      console.log(err);
    }
  }, []);

  const openMetadata = () => {
    setHide((current) => !current);
  };

  const displaySelectedInventory = () => {
    switch (user.inventory.selected) {
      case "summary":
        return <Summary />;
        break;
      case "marketplace":
        return <Marketplace />;
        break;
      case "pirates":
        return (
          <Pirates
            pirates={user.inventory.pirates}
            piratesStats={piratesStats}
          />
        );
        break;
      case "items":
        return <Items items={user.inventory.items} itemsStats={itemsStats} />;
        break;
      case "assets":
        return (
          <Assets
            assets={user.inventory.assets.summary}
            chests={user.inventory.assets.chests}
            reservations={user.inventory.assets.reservations}
            assetsStats={assetsStats}
          />
        );
        break;
      case "claim":
        return <Claim />;
        break;
      case "download":
        return <DownloadGame />;
        break;
      case "arrlandMap":
        return <ArrlandMap />;
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col justify-center items-start text-white text-2xl text-left lg:p-10 lg:pt-0 font-bold bg-elementor-1 rounded-md m-2 min-h-7xl w-full">
      <div className="flex pt-5 mxlg:justify-center mxlg:content-center">
        <Menu />
      </div>
      {(user.inventory.selected === "pirates" ||
        user.inventory.selected === "items" ||
        user.inventory.selected === "assets") && (
        <>
          <div
            className={`sticky -top-[2px] z-10 bg-elementor-text-2 border-b border-elementor-text-3 w-full
              ${hide ? "mxxl:h-full" : "mxsm:h-[125px] overflow-hidden"}`}
          >
            <div className="text-white text-2xl text-left lg:pt-0 font-bold rounded-md mx-2 my-2 min-h-7xl w-full flex justify-between mxxl:flex-wrap mxsm:justify-center mxlg:justify-center">
              {hide && <InventorySwitcher />}
              {(user.inventory.selected === "pirates" ||
                user.inventory.selected === "items") && (
                <InventoryFilterPanel />
              )}
              <div className="mxsm:flex flex-col absolute z-50 bottom-0 right-10 justify-center text-center duration-150 hover:brightness-200 sm:hidden">
                {hide ? (
                  <img
                    className="h-5 mb-[22px] duration-300 cursor-pointer hover:fill-elementor-text-3"
                    src={"filter_icons/arrowup.svg"}
                    alt="Arrow up"
                    onClick={openMetadata}
                  />
                ) : (
                  <img
                    className="h-5 mb-5 cursor-pointer"
                    src={"filter_icons/arrowdown.svg"}
                    alt="Arrow down"
                    onClick={openMetadata}
                  />
                )}
              </div>
            </div>
            <div className="flex flex-wrap flex-col justify-center sm:justify-start min-h-full">
              {user.inventory.selected === "assets" && <AssetsSwitcher />}
            </div>
          </div>
        </>
      )}
      {user.inventory.selected === "marketplace" && (
        <div className="flex flex-col gap-5 justify-start items-start w-full sticky -top-[2px] z-10 bg-elementor-text-2 border-b border-elementor-text-3 pb-3 rounded-t-md mxsm:pb-1">
          <MarketplaceSwitchPanel />
        </div>
      )}
      {displaySelectedInventory()}
    </div>
  );
};

export default UserInventory;
