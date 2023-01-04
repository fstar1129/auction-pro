import { useEffect } from "react";
import { useMoralis, useMoralisCloudFunction } from "react-moralis";
import {
  fetchClaims,
  fetchUserImxCollections,
  fetchUserTokensData,
  selectUser,
  setKeys,
  setPiratesReverseCardAmount,
} from "../state/user/userSlice";
import { useAppDispatch, useAppSelector } from "../app/store-hooks";

const MORALIS_CLOUD_GLOBAL = "accountStats";
const MORALIS_CLOUD_USER_TOKENS = "accountTotals";
const GET_CLAIMS = "getClaims";

const useIsAuthenticated = () => {
  const { isAuthenticated, user } = useMoralis();
  const dispatch = useAppDispatch();
  const userAppData = useAppSelector(selectUser);
  const piratesMetaCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_GLOBAL,
    {},
    { autoFetch: false }
  );
  const userTokensCloudFunction = useMoralisCloudFunction(
    MORALIS_CLOUD_USER_TOKENS,
    {},
    { autoFetch: false }
  );
  const handleClaimCloudFunction = useMoralisCloudFunction(
    GET_CLAIMS,
    {},
    { autoFetch: false }
  );

  useEffect(() => {
    async function fetchUserData() {
      if (isAuthenticated) {
        try {
          const walletAddress = user?.attributes?.ethAddress;
          await dispatch(setKeys({ ...userAppData.keys, walletAddress }));
          const { reverseCardsAmount } = await dispatch(
            fetchUserImxCollections({ walletAddress, piratesMetaCloudFunction })
          ).unwrap();
          await dispatch(setPiratesReverseCardAmount(reverseCardsAmount));
          await dispatch(
            fetchUserTokensData({ walletAddress, userTokensCloudFunction })
          );
          await dispatch(fetchClaims({ handleClaimCloudFunction }));
        } catch (error) {
          console.log("We will handle errors here later");
        }
      }
    }

    fetchUserData().then(null);
  }, [isAuthenticated]);

  return { isAuthenticated };
};

export default useIsAuthenticated;
