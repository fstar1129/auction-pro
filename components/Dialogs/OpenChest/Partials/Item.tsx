import React from "react";
import { zoomIn } from "react-animations";
import Radium, { StyleRoot } from "radium";
import { getOnlyId, parseName } from "../../../../helpers";

const styles = {
  zoomIn: {
    animation: "x 1s",
    animationName: Radium.keyframes(zoomIn, "zoomIn"),
  },
};

export type TItem = {
  name?: string;
  image_url?: string;
  rarity?: string;
};

interface IItemProps {
  item: TItem;
}

const Item: React.FC<IItemProps> = ({ item }): JSX.Element => {
  return (
    <StyleRoot
      className={
        "absolute top-0 left-0 rounded  w-full h-full flex items-center justify-center min-h-[456px]"
      }
    >
      <div
        className="relative rounded bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] bg-black w-[355px] h-[360px] min-h-[360px] flex flex-col items-center justify-center mt-6"
        style={styles.zoomIn}
      >
        <div className={"bg-black h-full w-full overflow-hidden"}>
          <div className="flex flex-row justify-between bg-black p-[1px] px-[5px] w-full text-xs font-display text-center text-elementor-text-3">
            <h6 className="text-elementor-text-3 font-display text-lg font-bold truncate overflow-hidden whitespace-nowrap">
              {parseName(item?.name, 30)}
            </h6>
            <h6 className="text-elementor-text-3 font-display text-lg font-bold">
              #{getOnlyId(item?.name)}
            </h6>
          </div>

          <img src={item?.image_url} className="h-auto w-full" />
          <img
            src={`rarity/${item?.rarity}_long.png`}
            className={"absolute w-[150px] h-auto -bottom-[12px] right-[4px]"}
          />
        </div>
      </div>
    </StyleRoot>
  );
};

export default Item;
