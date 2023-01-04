import React from "react";
import Spinner from "../../../Common/Spinner";

const SingleMetadataItem: React.FC<any> = ({
  attribute,
  value,
  dataReady,
}): JSX.Element => {
  return (
    <div className="text-center border p-2 m-1 rounded-sm w-[125px]">
      <p className="font-bold font-display text-elementor-text-1">
        {attribute}
      </p>
      <span className="font-display text-elementor-text-3">
        {dataReady === true ? (
          value
        ) : (
          <div className="my-1">
            <Spinner />
          </div>
        )}
      </span>
    </div>
  );
};

export default SingleMetadataItem;
