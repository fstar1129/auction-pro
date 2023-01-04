import React from "react";
import Empty from "../Common/Empty";
import { useAppSelector } from "../../app/store-hooks";
import { selectUser } from "../../state/user/userSlice";
import SingleItem from "./Partials/SingleItem";
import GlobalStats from "../GlobalStats/GlobalStats";

type TItem = {
  name?: string;
  metadata?: string;
};

interface IItemsProps {
  items: any;
  itemsStats?: any;
}

const Items: React.FC<IItemsProps> = ({ items, itemsStats }): JSX.Element => {
  const user = useAppSelector(selectUser);

  if (items?.length === 0) {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={itemsStats} />
        </div>
        <Empty name={"items"} />
      </>
    );
  }

  if (items?.length === 0 && user.status === "idle") {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={itemsStats} />
        </div>
        <Empty name={"items"} />
      </>
    );
  }

  if (user.searchItemsQuery.length !== 0) {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={itemsStats} />
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start min-h-full">
          {user.inventory.filteredItems.map((item) => (
            <>
              <SingleItem item={item} key={item?.name} />
            </>
          ))}
        </div>
      </>
    );
  }
  return (
    <div className="mt-3">
      <GlobalStats stats={itemsStats} />
      <div className="flex flex-wrap justify-center sm:justify-start min-h-full mxlg:justify-center mxlg:mb-8">
        {items?.map((item) => {
          return <SingleItem item={item} key={item?.name} />;
        })}
      </div>
    </div>
  );
};

export default Items;
