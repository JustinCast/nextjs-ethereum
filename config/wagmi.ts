import { createPublicClient, http } from "viem";
import { createConfig } from "wagmi";
import { goerli } from "wagmi/chains";

export const wagmiConfig = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http(),
  }),
});
