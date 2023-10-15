// TODO:
// Contracts ready
// Connection
// Read metadata
// Write contract
// Read contract
import { useEffect, useState } from "react";
import { variables } from "../../config";
import {
  useContractRead,
  useContractWrite,
  useAccount,
  useConnect,
} from "wagmi";

const tokenSwapConfig = {
  address: variables.tokenSwapAddress as any,
  abi: variables.tokenSwapAbi,
};

const token1Config = {
  address: variables.token1Address as any,
  abi: variables.tokenAbi,
};

const token2Config = {
  address: variables.token2Address as any,
  abi: variables.tokenAbi,
};

const TokenSwap = () => {
  const { connector: activeConnector, isConnected } = useAccount();
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const [allowances, setAllowances] = useState<any>({
    owner1Allowance: 0,
    owner2Allowance: 0,
  });
  const [input1Value, setInput1Value] = useState<number>(0);
  const [input2Value, setInput2Value] = useState<number>(0);
  const { data: owner1 } = useContractRead({
    ...tokenSwapConfig,
    functionName: "owner1",
  });
  const { data: owner2 } = useContractRead({
    ...tokenSwapConfig,
    functionName: "owner2",
  });
  const { data: token1 } = useContractRead({
    ...tokenSwapConfig,
    functionName: "token1",
  });
  const { data: token2 } = useContractRead({
    ...tokenSwapConfig,
    functionName: "token2",
  });
  const { data: owner1Balance } = useContractRead({
    ...token1Config,
    functionName: "balanceOf",

    args: [owner1],
  });
  const { data: owner2Balance } = useContractRead({
    ...token2Config,
    functionName: "balanceOf",
    args: [owner2],
  });
  const { data: _owner1Allowance } = useContractRead({
    ...token1Config,
    functionName: "allowance",

    args: [owner1, variables.tokenSwapAddress],
  });
  const { data: _owner2Allowance } = useContractRead({
    ...token2Config,
    functionName: "allowance",
    args: [owner2, variables.tokenSwapAddress],
  });
  const { data: owner1BalanceToken2 } = useContractRead({
    ...token2Config,
    functionName: "balanceOf",

    args: [owner1],
  });
  const { data: owner2BalanceToken1 } = useContractRead({
    ...token1Config,
    functionName: "balanceOf",
    args: [owner2],
  });
  const { data: symbol1 } = useContractRead({
    ...token1Config,
    functionName: "symbol",
  });
  const { data: symbol2 } = useContractRead({
    ...token2Config,
    functionName: "symbol",
  });

  const { isLoading: isSwapping, write } = useContractWrite({
    ...tokenSwapConfig,
    functionName: "swap",
  });

  useEffect(() => {
    if (_owner1Allowance && _owner2Allowance)
      setAllowances({
        owner1Allowance: Number(_owner1Allowance) / 1e18,
        owner2Allowance: Number(_owner2Allowance) / 1e18,
      });
  }, [_owner1Allowance, _owner2Allowance]);

  const performSwap = () => {
    write({ args: [input1Value * 1e18, input2Value * 1e18] });
  };

  if (!isConnected) {
    return (
      <>
        {connectors.map((connector) => (
          <button key={connector.id} onClick={() => connect({ connector })}>
            Connect
            {isLoading &&
              pendingConnector?.id === connector.id &&
              " (connecting)"}
          </button>
        ))}
      </>
    );
  }

  console.log(allowances);

  return (
    <div className="flex flex-col justify-center items-center h-100vh">
      <h1 className="text-center text-4xl">Token swap</h1>
      <div className="mt-5 flex flex-row">
        <div className="p-3 rounded border-2 border-black">
          <span>
            <strong>Owner1</strong>
          </span>
          <br />
          {owner1}
        </div>
        <div className="p-3 ,t ml-3 rounded border-2 border-black">
          <span>
            <strong>Owner2</strong>
          </span>
          <br />
          {owner2}
        </div>
      </div>
      <div className="mt-5 flex flex-row">
        <div className="p-3 rounded border-2 border-black">
          <span>
            <strong>Token1</strong>
          </span>
          <br />
          {token1}
        </div>
        <div className="p-3 ,t ml-3 rounded border-2 border-black">
          <span>
            <strong>Token2</strong>
          </span>
          <br />
          {token2}
        </div>
      </div>

      <div className="mt-5 rounded border-2 border-blue-500 flex flex-row flex-wrap justify-around w-1/2 h-52">
        <div className="flex flex-col">
          <p>Balance owner1</p>
          <p>
            <strong>{symbol1}</strong>
            <span>{Number(owner1Balance) / 1e18}</span>
          </p>
          <p>
            <strong>{symbol2}</strong>
            <span>{Number(owner1BalanceToken2) / 1e18}</span>
          </p>
        </div>
        <div className="flex flex-col">
          <p>Balance owner2</p>
          <p>
            <strong>{symbol2}</strong>
            <span>{Number(owner2Balance) / 1e18}</span>
          </p>
          <p>
            <strong>{symbol1}</strong>
            <span>{Number(owner2BalanceToken1) / 1e18}</span>
          </p>
        </div>
        <div className="flex flex-row w-full justify-center">
          <div className="flex flex-col justify-center">
            <span>Max allowed {allowances.owner1Allowance || 0}</span>
            <input
              onChange={(event) => setInput1Value(Number(event.target.value))}
              type="number"
              className="border-2 border-green-500"
            />
          </div>
          <div className="flex flex-col justify-center ml-5">
            <span>Max allowed: {allowances.owner2Allowance || 0}</span>
            <input
              onChange={(event) => setInput2Value(Number(event.target.value))}
              type="number"
              className="border-2 border-green-500"
            />
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
          {isSwapping ? (
            <button type="button" className="bg-indigo-500 ..." disabled>
              <svg
                className="animate-spin h-5 w-5 mr-3"
                viewBox="0 0 24 24"
              ></svg>
              Processing...
            </button>
          ) : (
            <button
              onClick={performSwap}
              className="shadow-md px-3 py-2 rounded"
            >
              Swap
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TokenSwap;
