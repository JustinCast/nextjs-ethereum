import { useEffect, useState } from "react";
import { getEthersProvider } from "@/config";
import { formatEther } from "ethers";

// import { HiIQAbi__factory } from "../types/ethers-contracts/factories/HiIQAbi__factory";

const Example = () => {
  const [address, setAddress] = useState<string>("");
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [balance, setBalance] = useState<string>();

  useEffect(() => {
    if (address) {
      const getBalance = async () => {
        const balance = await provider.getBalance(address);
        setBalance(formatEther(balance));
      };
      getBalance();
    }
  }, [address]);

  useEffect(() => {
    if (provider) {
      const initialize = async () => {
        const _signer = await provider.getSigner();
        setSigner(_signer);
        setAddress(await _signer.getAddress());
      };

      initialize();
    }
  }, [provider]);

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
    </div>
  );
};

export default Example;
