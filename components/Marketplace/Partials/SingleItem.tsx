import React from "react";
import { getUrlFilename, parseName } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { openDialog } from "../../../state/dialog/dialogSlice";
import { selectUser } from "../../../state/user/userSlice";
import Moralis from "moralis-v1";
import useCheckCurrency from "../../../hooks/useCheckCurrency";
import Spinner from "../../Common/Spinner";

interface TOrderProps {
  order: any;
  price: number;
  tokenType: any;
}
const SingleItem: React.FC<TOrderProps> = ({ order, price }): JSX.Element => {
  console.log(order);
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const token = order?.buy?.data?.token_address;
  const { currency, decimals } = useCheckCurrency(token);

  const tokenAmount = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, decimals)
  );

  const priceUSD = (tokenAmount * price).toFixed(2);

  return (
    <>
      <div
        className="flex flex-col justify-center items-center cursor-pointer mb-5"
        onClick={() =>
          dispatch(
            openDialog({
              currentDialog: "ASSET_BUY_DIALOG",
              currentDialogAdditionalData: order,
            })
          )
        }
      >
        <div
          className="relative rounded bg-gradient-to-b p-[2px] from-[#D7CDBB] to-[#64a2bc] m-[10px] w-[260px] flex flex-col items-center justify-center duration-150 ease hover:drop-shadow-[0_10px_10px_#a7a7a73d] hover:to-[#fff] hover:translate-y-[-5px] hover:saturate-[1.25]"
          key={order?.sell.data?.token_id}
        >
          <div className="flex flex-row justify-between p-[5px] rounded-t-md bg-black w-full text-sm font-display text-center text-elementor-text-3">
            <h6 className="text-elementor-text-3 font-display text-md truncate overflow-hidden whitespace-nowrap">
              {parseName(order?.sell.data.properties?.name, 20) || (
                <div className="mt-[1px]">
                  <Spinner />
                </div>
              )}
            </h6>
            <h6 className="text-elementor-text-3 font-display text-md">
              #
              {(order?.sell?.data?.token_id).length >= 10
                ? order?.sell?.data?.properties?.name.split("#")[1]
                : order?.sell?.data?.token_id}
            </h6>
          </div>
          <img
            src={
              order?.sell?.data?.properties?.image_url || ""
                ? getUrlFilename(
                    order?.sell?.data?.properties?.image_url || "",
                    "400x400",
                    ".jpg"
                  )
                : `summaryAssets/items.png` ||
                  order?.sell?.data?.properties?.image_url
            }
            alt={order?.sell.data.properties?.name}
            className="h-full w-full bg-[rgba(0,0,0,0.8)] hover:saturate-[1.25]"
          />

          <div className="absolute bottom-[5%] left-[1px]">
            {order?.user === user.keys.walletAddress ? (
              <div className="">
                <img
                  alt="Listed for sale"
                  src={"card_assets/yourlisting.png"}
                  className="w-full h-[30px]"
                />
              </div>
            ) : (
              ""
            )}
            {order?.orders}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <img
            src={`./${currency}.svg`}
            alt="token icon"
            className="h-[16px] mb-1"
          />
          <h6 className="text-elementor-text-1 font-display text-sm">
            {tokenAmount + " " + currency}
          </h6>
        </div>
        <h6 className="text-elementor-text-3 font-display text-sm opacity-80">
          ($
          {priceUSD})
        </h6>
      </div>
    </>
  );
};

export default SingleItem;
