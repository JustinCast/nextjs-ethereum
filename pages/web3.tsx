import React, { useEffect, useState } from "react";
import { web3 } from "../config/web3";

const Web3Page = () => {
  const [address, setAddress] = useState<string>();

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
  }, [web3]);

  return (
    <div>
      <span>{address}</span>
      <br />
      <button onClick={() => handleSign(address)}>Send 1 eth</button>
    </div>
  );
};

export default Web3Page;
