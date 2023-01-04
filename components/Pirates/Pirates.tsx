import React from "react";
import CardPlaceholder from "../Common/CardPlaceholder";
import SinglePirate from "./Partials/SinglePirate";
import Empty from "../Common/Empty";
import { useAppSelector } from "../../app/store-hooks";
import { selectUser } from "../../state/user/userSlice";
import Spinner from "../Common/Spinner";
import GlobalStats from "../GlobalStats/GlobalStats";

type TPirate = {
  name?: string;
};

interface IPiratesProps {
  pirates: Array<TPirate>;
  piratesStats: any;
}

const Pirates: React.FC<IPiratesProps> = ({
  pirates,
  piratesStats,
}): JSX.Element => {
  const user = useAppSelector(selectUser);

  if (user.status === "loading") {
    if (user.piratesReverseCardsAmount > 0) {
      return (
        <>
          {pirates.map((item) => (
            <CardPlaceholder key={item?.name} />
          ))}
        </>
      );
    }

    return (
      <div className="flex items-center w-full justify-center min-h-full">
        <Spinner />
      </div>
    );
  }

  if (pirates?.length === 0 && user.status === "idle") {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={piratesStats} />
        </div>
        <Empty name={"pirates"} />
      </>
    );
  }

  if (user.searchPiratesQuery.length !== 0) {
    return (
      <>
        <div className="mt-3">
          <GlobalStats stats={piratesStats} />
        </div>
        <div className="flex flex-wrap justify-center sm:justify-start min-h-full mxlg:justify-center">
          {user.inventory.filteredPirates.map((item) => (
            <SinglePirate pirate={item} key={item?.name} />
          ))}
        </div>
      </>
    );
  }

  return (
    <div className="mt-3">
      <GlobalStats stats={piratesStats} />
      <div className="flex flex-wrap justify-center sm:justify-start min-h-full mxlg:justify-center mxlg:mb-8">
        {pirates?.map((item) => (
          <SinglePirate pirate={item} key={item?.name} />
        ))}
      </div>
    </div>
  );
};

export default Pirates;
