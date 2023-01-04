import { useEffect, useState } from "react";
import { useAppSelector } from "../app/store-hooks";
import { selectUser } from "../state/user/userSlice";

const useCheckCurrency = (token_address) => {
  const user = useAppSelector(selectUser);

  const [currency, setCurrency] = useState("");
  const [decimals, setDecimals] = useState(0);
  const [tokens, setTokens] = useState(0);
  const [currencyPrice, setCurrencyPrice] = useState("");
  useEffect(() => {
    if (token_address === process.env.NEXT_PUBLIC_IMX_TOKEN_ADDRESS) {
      setCurrency("IMX");
      setDecimals(18);
      setTokens(user.tokens.imx);
      setCurrencyPrice("immutable-x");
    } else if (token_address === process.env.NEXT_PUBLIC_USDC_ADDRESS) {
      setCurrency("USD-C");
      setDecimals(6);
      setTokens(user.tokens.usdc);
      setCurrencyPrice("usd-coin");
    } else if (token_address === "") {
      setCurrency("ETH");
      setDecimals(18);
      setTokens(user.tokens.ethereum);
      setCurrencyPrice("ethereum");
    } else {
      setCurrency("");
      setDecimals(0);
      setTokens(0);
    }
  }, [token_address]);
  return { currency, decimals, tokens, currencyPrice };
};

export default useCheckCurrency;
