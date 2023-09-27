import type { AppProps } from "next/app";
import { WagmiConfig } from "wagmi";
import { wagmiConfig as config } from "@/config";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={config}>
      <Component {...pageProps} />
    </WagmiConfig>
  );
}

export default MyApp;
