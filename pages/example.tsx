import { useEffect, useState } from "react";
import { getEthersProvider } from "@/config";
import { formatEther } from "ethers";

import { TokenAbi__factory as Token, TokenAbi } from "@/types/ethers-contracts";

const TOKEN_ADDR = "0xfA50Dd8d51768585406A345395a0c97e8E20AA06";

const Example = () => {
  const [address, setAddress] = useState<string>("");
  const [provider, setProvider] = useState<any>();
  const [signer, setSigner] = useState<any>();
  const [balance, setBalance] = useState<string>();
  const [connected, setConnected] = useState(false);
  const [tokenInstance, setTokenInstance] = useState<TokenAbi>();
  const [tokenBalance, setTokenBalance] = useState<any>();

  const getTokenBalance = async () => {
    setTokenBalance(await tokenInstance?.balanceOf(address));
  };

  const connect = () => {
    setTokenInstance(Token.connect(TOKEN_ADDR, provider));

    setConnected(true);
    getTokenBalance();
  };

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
      connect();
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
      {connected && tokenBalance && <span>{String(tokenBalance)}</span>}
    </div>
  );
};

export default Example;
