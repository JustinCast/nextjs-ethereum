import { useEffect, useState } from "react";
import { getEthersProvider } from "../config/ethers";
import { ethers } from "ethers";

import { HiIQAbi__factory } from "../types/ethers-contracts/factories/HiIQAbi__factory";

const EthersPage = () => {
  const [address, setAddress] = useState<string>("");
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [balance, setBalance] = useState<string>();

  const handleSign = async () => {
    if (signer)
      signer.sendTransaction({
        to: "0xAe65930180ef4d86dbD1844275433E9e1d6311ED",
        value: ethers.utils.parseEther("1"),
      });
  };

  useEffect(() => {
    if (provider) {
      const initialize = async () => {
        const _signer = provider.getSigner();
        setSigner(_signer);
        setAddress(await _signer.getAddress());

        const hiiq = HiIQAbi__factory.connect(
          "0xc03bcacc5377b7cc6634537650a7a1d14711c1a3",
          provider
        );

        console.log(
          await hiiq.get_last_user_slope(
            "0xAe65930180ef4d86dbD1844275433E9e1d6311ED",
            { gasLimit: 300000 }
          )
        );
      };

      initialize();
    }
  }, [provider]);

  useEffect(() => {
    if (address) {
      const getBalance = async () => {
        const balance = await provider.getBalance(address);
        setBalance(ethers.utils.formatEther(balance));
      };
      getBalance();
    }
  }, [address]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setProvider(getEthersProvider((window as any).ethereum));
    }
  }, []);

  return (
    <div>
      <span>{address}</span>
      <br />
      <span>Balance: {balance}</span>
      <br />
      <button onClick={handleSign}>Send 1 eth</button>
    </div>
  );
};

export default EthersPage;
