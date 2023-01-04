import React, { useEffect, useRef, useState } from "react";
import SortingControls from "./SortingControls";
import { useAppDispatch, useAppSelector } from "../../app/store-hooks";
import { selectUser, setPirates, setItems } from "../../state/user/userSlice";

type TActiveFilter = {
  name: string;
  ascending: boolean;
  default: boolean;
};

const SortPanel: React.FC = (): JSX.Element => {
  const sortingPanelRef = useRef();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const [rarityOrder, setRarityOrder] = useState(true);
  const [alphabeticallyOrder, setAlphabeticallyOrder] = useState(false);
  const [activeFilter, setActiveFilter] = useState<TActiveFilter>({
    name: "",
    ascending: false,
    default: true,
  });
  const handleRarity = () => setRarityOrder(!rarityOrder);
  const handleAlphabetically = () =>
    setAlphabeticallyOrder(!alphabeticallyOrder);
  const sort = (key: string): void => {
    const toSort =
      user.inventory.selected === "pirates"
        ? [...user?.inventory?.pirates]
        : [...user?.inventory?.items];

    if (!toSort && toSort.length === 0) return;

    const sortedPirates = toSort.sort((a, b) => {
      if (activeFilter.ascending) {
        return parseInt(a[key]) < parseInt(b[key]) ? 1 : -1;
      }

      return parseInt(a[key]) > parseInt(b[key]) ? 1 : -1;
    });

    const sortedItems = toSort.sort((a, b) => {
      if (activeFilter.ascending) {
        return parseInt(a[key]) < parseInt(b[key]) ? 1 : -1;
      }

      return parseInt(a[key]) > parseInt(b[key]) ? 1 : -1;
    });
    dispatch(
      user.inventory.selected === "pirates"
        ? setPirates(sortedPirates)
        : setItems(sortedItems)
    );
  };

  const filterRarity = () => {
    let common = user.inventory.items.filter(
      (item) => item.metadata.rarity === "Common"
    );
    let uncommon = user.inventory.items.filter(
      (item) => item.metadata.rarity === "Uncommon"
    );
    let rare = user.inventory.items.filter(
      (item) => item.metadata.rarity === "Rare"
    );
    let legendary = user.inventory.items.filter(
      (item) => item.metadata.rarity === "Legendary"
    );
    if (!rarityOrder) {
      let rarity = common.concat(uncommon, rare, legendary);
      dispatch(setItems(rarity));
    } else {
      let rarity = common.concat(uncommon, rare, legendary).reverse();
      dispatch(setItems(rarity));
    }
  };

  const filterName = () => {
    if (!alphabeticallyOrder) {
      let alphabetically = [...user.inventory.items].sort(
        (a, b) =>
          a.name?.localeCompare(b.name) ||
          a.metadata.name?.localeCompare(b.metadata.name)
      );
      dispatch(setItems(alphabetically));
    } else {
      let alphabetically = [...user.inventory.items]
        .sort(
          (a, b) =>
            a.name?.localeCompare(b.name) ||
            a.metadata.name?.localeCompare(b.metadata.name)
        )
        .reverse();
      dispatch(setItems(alphabetically));
    }
  };

  const switchFilter = (key: string): void => {
    let ascending;

    if (activeFilter.name !== "rarity" && key === "rarity") {
      ascending = false;
    } else if (activeFilter.name === key) {
      ascending = !activeFilter.ascending;
    } else {
      ascending = true;
    }
    window.scrollTo(0, 0);
    setActiveFilter({ name: key, ascending, default: false });
  };

  const resetDefaults = (): void => {
    setActiveFilter({ name: "id", ascending: false, default: true });
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    if (!activeFilter?.name) {
      return;
    }
    sort(activeFilter.name);
  }, [activeFilter]);

  return (
    <div
      className="flex flex-row items-center mxlg:justify-center justify-end mxsm:justify-center py-2 mxsm:mb-3"
      ref={sortingPanelRef}
    >
      <div
        className="text-sm mx-[10px] mt-[4px] cursor-pointer text-elementor-text-3 font-display uppercase tracking-wide mxxl:ml-0 mxsm:pl-3 mxsm:pl-0"
        onClick={() => resetDefaults()}
      >
        Clear
      </div>
      {user.inventory.selected === "pirates" ? (
        <>
          <div
            onClick={() => switchFilter("token_id")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img src={"filter_icons/id.png"} alt="Id" data-tip="Sort by ID" />
            {activeFilter.name === "token_id" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("bonus_percent")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/rum.png"}
              alt="Rum"
              data-tip="Sort by $RUM bonus percentage"
            />
            {activeFilter.name === "bonus_percent" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("rarity")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/rarity.png"}
              alt="Rarity"
              data-tip="Sort by Rarity"
            />
            {activeFilter.name === "rarity" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("dao_votes")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/dao.png"}
              alt="Dao Votes"
              data-tip="Sort by DAO"
            />
            {activeFilter.name === "dao_votes" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("respect")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/respect.png"}
              alt="Respect"
              data-tip="Sort by Respect"
            />
            {activeFilter.name === "respect" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("voodo_magic")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/voodoo.png"}
              alt="Voodoo Magic"
              data-tip="Sort by Voodoo Magic"
            />
            {activeFilter.name === "voodo_magic" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => switchFilter("elemental_magic")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/elemental.png"}
              alt="Elemental Magic"
              data-tip="Sort by Elemental Magic"
            />
            {activeFilter.name === "elemental_magic" &&
            !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>
        </>
      ) : (
        <>
          <div
            onClick={() => switchFilter("token_id")}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img src={"filter_icons/id.png"} alt="Id" data-tip="Sort by ID" />
            {activeFilter.name === "token_id" && !activeFilter.default ? (
              <SortingControls activeFilter={activeFilter.ascending} />
            ) : null}
          </div>

          <div
            onClick={() => {
              filterRarity();
              handleRarity();
              switchFilter("rarity");
            }}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/rarity.png"}
              alt="Rarity"
              data-tip="Sort by Rarity"
            />
            {activeFilter.name === "rarity" && !activeFilter.default ? (
              <SortingControls activeFilter={rarityOrder} />
            ) : null}
          </div>
          <div
            onClick={() => {
              filterName();
              handleAlphabetically();
              switchFilter("name");
            }}
            className="h-[25px] w-[25px] mx-[4px] cursor-pointer duration-150 hover:brightness-200"
          >
            <img
              src={"filter_icons/by_name.png"}
              alt="ID"
              data-tip="Sort by Name"
            />
            {activeFilter.name === "name" && !activeFilter.default ? (
              <SortingControls activeFilter={alphabeticallyOrder} />
            ) : null}
          </div>
        </>
      )}
    </div>
  );
};

export default SortPanel;
