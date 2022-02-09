import React, { useEffect, useState } from "react";
import { hiiqAbi } from "../abi/hiiq.abi";
import { web3 } from "../config/web3";

const Web3Page = () => {
  const [address, setAddress] = useState<string>();
  const [contract, setContract] = useState<any>();

  const handleSign = async (address: string | undefined) => {
    await web3.eth
      .sendTransaction({
        from: address,
        to: "0xEC305C60FD423535411b225Df713601ae39a76B9",
        value: web3.utils.toWei("1", "ether"),
      })
      .then(console.log);
  };

  useEffect(() => {
    const getAccounts = async () =>
      setAddress((await web3.eth.getAccounts())[0]);
    getAccounts();

    // create a contract instance
    setContract(
      new web3.eth.Contract(
        hiiqAbi as any,
        "0xC03bCACC5377b7cc6634537650A7a1D14711c1A3"
      )
    );
  }, [web3]);

  useEffect(() => {
    if (contract && address) {
      const callContractFn = async () => {
        console.log(await contract.methods.locked__end(address).call());
      };
      callContractFn();
    }
  }, [contract, address]);

  return (
    <div>
      <span>{address}</span>
      <br />
      <button onClick={() => handleSign(address)}>Send 1 eth</button>
    </div>
  );
};

export default Web3Page;
