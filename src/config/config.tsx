import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { arbitrumSepolia, mainnet } from "viem/chains";

export const config = getDefaultConfig({
  appName: 'BeaconDEX',
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "8a5b9f8c9e3a4c7d1b2e5f8a9c3e6d1b",
  chains: [arbitrumSepolia, mainnet],
  ssr: false, // Disable SSR to fix wallet connection issues
});
