import { ethers } from "ethers";

export const getEthersProvider = (ethProvider: any) =>
  new ethers.providers.Web3Provider(ethProvider);
