import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia, mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: 'BeaconDEX',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "demo-id",
  chains: [arbitrumSepolia, mainnet],
  ssr: true, // If your dApp uses server side rendering (SSR)
});
