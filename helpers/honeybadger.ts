import { Honeybadger } from "@honeybadger-io/react";

const _config = {
  apiKey: process.env.NEXT_PUBLIC_HONEY_BADGER_API_KEY,
};

const honeybadger = Honeybadger.configure(_config);

export default honeybadger;
