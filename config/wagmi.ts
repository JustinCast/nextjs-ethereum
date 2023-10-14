import { createConfig, configureChains } from "wagmi";
import { goerli } from "wagmi/chains";
import { InjectedConnector } from "wagmi/connectors/injected";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [goerli],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  connectors: [new InjectedConnector({ chains })],
  publicClient,
  webSocketPublicClient,
});
