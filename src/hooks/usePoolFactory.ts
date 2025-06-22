import {
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Address } from "viem";
import { PoolFactoryAbi } from "../abi/pool-factory-abi";
import { getPoolFactoryAddress } from "../config/contracts";
import { useChainId } from "wagmi";

// Hook to read pool factory data
export function usePoolFactory() {
  const chainId = useChainId();
  const factoryAddress = getPoolFactoryAddress(chainId);

  // Get total number of pools
  const { data: poolsLength, isLoading: isLoadingPoolsLength } =
    useReadContract({
      address: factoryAddress,
      abi: PoolFactoryAbi,
      functionName: "allPoolsLength",
    });

  // Get specific pool address
  const getPool = (tokenA: Address, tokenB: Address, fee: number) => {
    return useReadContract({
      address: factoryAddress,
      abi: PoolFactoryAbi,
      functionName: "getPool",
      args: [tokenA, tokenB],
    });
  };

  // Get pool by index
  const getPoolByIndex = (index: number) => {
    return useReadContract({
      address: factoryAddress,
      abi: PoolFactoryAbi,
      functionName: "allPools",
      args: [BigInt(index)],
    });
  };

  return {
    factoryAddress,
    poolsLength,
    isLoadingPoolsLength,
    getPool,
    getPoolByIndex,
  };
}

// Hook to create new pools
export function useCreatePool() {
  const chainId = useChainId();
  const factoryAddress = getPoolFactoryAddress(chainId);

  const {
    writeContract: createPool,
    data: hash,
    isPending: isCreating,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const createNewPool = async (
    token0: Address,
    token1: Address,
    oracle0: Address,
    oracle1: Address
  ) => {
    createPool({
      address: factoryAddress,
      abi: PoolFactoryAbi,
      functionName: "createPool",
      args: [token0, token1, oracle0, oracle1],
    });
  };

  return {
    createNewPool,
    hash,
    isCreating,
    isConfirming,
    isSuccess,
  };
}
