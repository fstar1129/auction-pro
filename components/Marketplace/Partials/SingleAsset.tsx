import React from "react";
import { parseName } from "../../../helpers";
import { useAppDispatch, useAppSelector } from "../../../app/store-hooks";
import { openDialog } from "../../../state/dialog/dialogSlice";
import { selectUser } from "../../../state/user/userSlice";
import Moralis from "moralis-v1";

interface TOrderProps {
  order: any;
  price: number;
  tokenType: any;
}
const SingleItem: React.FC<TOrderProps> = ({
  order,
  price,
  tokenType,
}): JSX.Element => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);

  const ethereum = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, 18)
  );
  const immutableX = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, 18)
  );
  const usdc = parseFloat(
    Moralis.Units.FromWei(order?.buy.data?.quantity || 0, 6)
  );

  const ethereumUSD = (ethereum * price).toFixed(2);
  const usdcUSD = (usdc * price).toFixed(2);
  const immutableXUSD = (immutableX * price).toFixed(2);

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
              {parseName(order?.sell.data.properties?.name, 20)}
            </h6>
            <h6 className="text-elementor-text-3 font-display text-md">
              #{order?.sell?.data?.token_id}
            </h6>
          </div>
          <img
            src={
              (parseInt(order?.sell?.data?.token_id) <= 20000
                ? "chest_small.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 21234
                ? "islands/extralarge.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 21170
                ? "islands/large.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 20914
                ? "islands/medium.png"
                : order?.sell?.data?.properties?.image_url) ||
              (parseInt(order?.sell?.data?.token_id) > 20000
                ? "islands/small.jpeg"
                : order?.sell?.data?.properties?.image_url)
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
            src={
              tokenType?.type === "ETH"
                ? "./ETH.svg"
                : tokenType?.data?.token_address ===
                  process.env.NEXT_PUBLIC_USDC_ADDRESS
                ? "./USD-C.svg"
                : "IMX.svg"
            }
            alt="token icon"
            className="h-[16px] mb-1"
          />
          <h6 className="text-elementor-text-1 font-display text-sm">
            {tokenType?.type === "ETH"
              ? ethereum + " ETH"
              : tokenType?.data?.token_address ===
                process.env.NEXT_PUBLIC_USDC_ADDRESS
              ? usdc + " USD-C"
              : immutableX + " IMX"}
          </h6>
        </div>
        <h6 className="text-elementor-text-3 font-display text-sm opacity-80">
          ($
          {tokenType?.type === "ETH"
            ? ethereumUSD
            : tokenType?.data?.token_address ===
              process.env.NEXT_PUBLIC_USDC_ADDRESS
            ? usdcUSD
            : immutableXUSD}
          )
        </h6>
      </div>
    </>
  );
};

export default SingleItem;
