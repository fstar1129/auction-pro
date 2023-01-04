import { useEffect, useState } from "react";
import axios from "axios";

const URL = `https://api.coingecko.com/api/v3/simple/price?ids=immutable-x%2Cethereum%2Cusd-coin&vs_currencies=usd`;

const useFetchCurrencies = () => {
  const [currency, setCurrency] = useState(0);
  useEffect(() => {
    async function fetchCurrency() {
      try {
        const { data } = await axios.get(URL);
        setCurrency(data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchCurrency();
  }, []);
  return currency;
};

export default useFetchCurrencies;
