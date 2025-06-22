'use client';

import { useState } from 'react';
import { useAccount, useChainId } from 'wagmi';
import { Address } from 'viem';
import { usePoolFactory, useCreatePool } from '../hooks/usePoolFactory';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export default function PoolFactoryConnection() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { factoryAddress, poolsLength, isLoadingPoolsLength } = usePoolFactory();
  const { createNewPool, isCreating, isConfirming, isSuccess } = useCreatePool();

  const [tokenA, setTokenA] = useState<string>('');
  const [tokenB, setTokenB] = useState<string>('');
  const [fee, setFee] = useState<number>(3000); // 0.3%

  const handleCreatePool = async () => {
    if (!tokenA || !tokenB) return;
    
    try {
      await createNewPool(tokenA as Address, tokenB as Address, fee);
    } catch (error) {
      console.error('Error creating pool:', error);
    }
  };

  if (!isConnected) {
    return (
      <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
        <CardContent className="p-6 text-center">
          <p className="text-gray-400">Connect your wallet to interact with the Pool Factory</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Pool Factory Info */}
      <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
        <CardHeader>
          <CardTitle className="text-white">Pool Factory Connection</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm text-gray-400">Factory Address:</label>
            <p className="text-white font-mono text-sm break-all">{factoryAddress}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Chain ID:</label>
            <p className="text-white">{chainId}</p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Total Pools:</label>
            <p className="text-white">
              {isLoadingPoolsLength ? 'Loading...' : poolsLength?.toString() || '0'}
            </p>
          </div>
          
          <div>
            <label className="text-sm text-gray-400">Connected Wallet:</label>
            <p className="text-white font-mono text-sm break-all">{address}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}