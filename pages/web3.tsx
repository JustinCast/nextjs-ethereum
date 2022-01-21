import React, { useEffect, useState } from "react";
import { web3 } from "../config/web3";

const Web3Page = () => {
  const [address, setAddress] = useState<string>();

  const handleSign = async (address: string | undefined) => {
    console.log(address);

    console.log(web3);
    await web3.eth
      .sendTransaction({
        from: address,
        to: "0xEC305C60FD423535411b225Df713601ae39a76B9",
        value: "1000000000000000000",
      })
      .then(console.log);
  };

  useEffect(() => {
    setAddress((window as any).ethereum.selectedAddress);
  }, []);

  return (
    <div>
      <span>{address}</span>
      <br />
      <button onClick={() => handleSign(address)}>Send 1 eth</button>
    </div>
  );
};

export default Web3Page;
