import { Address } from "viem";

// Pool Factory Contract Addresses
export const POOL_FACTORY_ADDRESSES: Record<number, Address> = {
  // Mainnet
  1: "0x1F98431c8aD98523631AE4a59f267346ea31F984", // Example: Uniswap V3 Factory

  // Arbitrum Sepolia Testnet
  421614: "0xD3894a8d6974Dad797372939B86CB8d077a8090b", // Replace with your testnet factory address

  // Add more chains as needed
};

// Liquidity Router Contract Addresses
export const LIQUIDITY_ROUTER_ADDRESSES: Record<number, Address> = {
  // Mainnet
  1: "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D", // Example: Uniswap V2 Router

  // Arbitrum Sepolia Testnet
  421614: "0x0000000000000000000000000000000000000000", // Replace with your router address

  // Add more chains as needed
};

// Pool Factory Contract Configuration
export const getPoolFactoryAddress = (chainId: number): Address => {
  const address = POOL_FACTORY_ADDRESSES[chainId];
  if (!address) {
    throw new Error(`Pool factory not deployed on chain ${chainId}`);
  }
  return address;
};

// Liquidity Router Contract Configuration
export const getLiquidityRouterAddress = (chainId: number): Address => {
  const address = LIQUIDITY_ROUTER_ADDRESSES[chainId];
  if (!address) {
    throw new Error(`Liquidity router not deployed on chain ${chainId}`);
  }
  return address;
};
