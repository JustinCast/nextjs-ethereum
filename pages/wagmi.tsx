import React, { useEffect } from "react";
import { useAccount, useBalance } from "wagmi";

const Wagmi = () => {
  const [{ data: accountData }] = useAccount();
  const [{ data: balanceData }] = useBalance({
    addressOrName:
      accountData && accountData.address ? accountData.address : undefined,
  });

  // useEffect(() => {
  //   console.log(accountData);
  // }, [accountData]);

  // useEffect(() => {
  //   console.log(balanceData);
  // }, [balanceData]);

  return (
    <div>
      {accountData ? accountData.address : "Loading"}
      <br />
      {balanceData?.formatted && balanceData.symbol ? (
        <span>
          {balanceData.formatted}: {balanceData.symbol}
        </span>
      ) : null}
    </div>
  );
};

export default Wagmi;
