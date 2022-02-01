import React, { useEffect, useState } from "react";
import { getGoerliSdk } from "@dethcrypto/eth-sdk-client";
import { ethers } from "ethers";

const EthSdk = () => {
  const [balance, setBalance] = useState<string>();
  const [defaultSigner, setDefaultSigner] = useState<any>();
  const sdk = getGoerliSdk(defaultSigner);

  useEffect(() => {
    setDefaultSigner(
      new ethers.providers.Web3Provider((window as any).ethereum).getSigner()
    );
  }, []);

  useEffect(() => {
    if (!defaultSigner) return;

    const getBalance = async () => {
      setBalance(
        ethers.utils.formatEther(
          await sdk.hiiq["balanceOf(address)"](defaultSigner.getAddress())
        )
      );
    };

    getBalance();
  }, [defaultSigner]);

  return <p>balance {balance}</p>;
};

export default EthSdk;
