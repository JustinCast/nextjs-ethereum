import { useEffect, useState } from "react";
import { Provider } from "wagmi";

import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ethers } from "ethers";

function MyApp({ Component, pageProps }: AppProps) {
  const [provider, setProvider] = useState<any>();

  useEffect(() => {
    if (typeof window !== "undefined")
      setProvider(new ethers.providers.Web3Provider((window as any).ethereum));
  }, []);

  return (
    <Provider autoConnect provider={provider}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
