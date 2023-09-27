import { BrowserProvider } from "ethers";

export const getEthersProvider = (ethProvider: any) =>
  new BrowserProvider(ethProvider);
