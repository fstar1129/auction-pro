export default interface IGlobalReducerInterface {
  isDevMode: boolean;
  errors: {
    globalError: boolean;
  };
  network: {
    linkUrl: string;
    isMainnet: boolean;
    networkId: string;
  };
}
