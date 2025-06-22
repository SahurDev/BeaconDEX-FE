import { useWriteContract, useWaitForTransactionReceipt, useChainId } from 'wagmi';
import { Address, parseUnits } from 'viem';
import { liquidityPoolAbi } from '../abi/liquidity-pool-abi';
import { getLiquidityRouterAddress } from '../config/contracts';

export interface Token {
  symbol: string;
  name: string;
  address: Address;
  decimals: number;
}

// Hook to add liquidity
export function useAddLiquidity() {
  const chainId = useChainId();
  const routerAddress = getLiquidityRouterAddress(chainId);

  const { 
    writeContract: addLiquidity, 
    data: hash,
    isPending: isAdding 
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const addLiquidityToPool = async (
    tokenA: Token,
    tokenB: Token,
    amountA: string,
    amountB: string,
    slippageTolerance: number = 0.5, // 0.5%
    userAddress: Address
  ) => {
    const amountADesired = parseUnits(amountA, tokenA.decimals);
    const amountBDesired = parseUnits(amountB, tokenB.decimals);
    
    // Calculate minimum amounts with slippage tolerance
    const amountAMin = (amountADesired * BigInt(Math.floor((100 - slippageTolerance) * 100))) / BigInt(10000);
    const amountBMin = (amountBDesired * BigInt(Math.floor((100 - slippageTolerance) * 100))) / BigInt(10000);
    
    // Deadline: 20 minutes from now
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);

    addLiquidity({
      address: routerAddress,
      abi: liquidityPoolAbi,
      functionName: 'addLiquidity',
      args: [
        tokenA.address,
        tokenB.address,
        amountADesired,
        amountBDesired,
        amountAMin,
        amountBMin,
        userAddress,
        deadline
      ],
    });
  };

  return {
    addLiquidityToPool,
    hash,
    isAdding,
    isConfirming,
    isSuccess,
  };
}

// Hook to remove liquidity
export function useRemoveLiquidity() {
  const chainId = useChainId();
  const routerAddress = getLiquidityRouterAddress(chainId);

  const { 
    writeContract: removeLiquidity, 
    data: hash,
    isPending: isRemoving 
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const removeLiquidityFromPool = async (
    tokenA: Token,
    tokenB: Token,
    liquidityAmount: string,
    slippageTolerance: number = 0.5,
    userAddress: Address
  ) => {
    const liquidity = parseUnits(liquidityAmount, 18); // LP tokens are usually 18 decimals
    
    // For simplicity, setting minimum amounts to 0 (in production, calculate based on reserves)
    const amountAMin = BigInt(0);
    const amountBMin = BigInt(0);
    
    // Deadline: 20 minutes from now
    const deadline = BigInt(Math.floor(Date.now() / 1000) + 1200);

    removeLiquidity({
      address: routerAddress,
      abi: liquidityPoolAbi,
      functionName: 'removeLiquidity',
      args: [
        tokenA.address,
        tokenB.address,
        liquidity,
        amountAMin,
        amountBMin,
        userAddress,
        deadline
      ],
    });
  };

  return {
    removeLiquidityFromPool,
    hash,
    isRemoving,
    isConfirming,
    isSuccess,
  };
}