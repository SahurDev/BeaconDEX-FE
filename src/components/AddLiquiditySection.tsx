'use client';

import { useState } from 'react';
import { useAccount, useBalance } from 'wagmi';
import { Address } from 'viem';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';
import { useAddLiquidity, Token } from '../hooks/useLiquidity';

const commonTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", address: "0x0000000000000000000000000000000000000000" as Address, decimals: 18 },
  { symbol: "USDC", name: "USD Coin", address: "0xa0b86991c431e69f7a3d3ae37d8b3c8d1c5a6d0c0" as Address, decimals: 6 },
  { symbol: "USDT", name: "Tether USD", address: "0xdac17f958d2ee523a2206206994597c13d831ec7" as Address, decimals: 6 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599" as Address, decimals: 8 },
];

export default function AddLiquiditySection() {
  const { address, isConnected } = useAccount();
  const { addLiquidityToPool, isAdding, isConfirming, isSuccess, hash } = useAddLiquidity();

  const [tokenA, setTokenA] = useState<Token>(commonTokens[0]);
  const [tokenB, setTokenB] = useState<Token>(commonTokens[1]);
  const [amountA, setAmountA] = useState<string>('');
  const [amountB, setAmountB] = useState<string>('');
  const [slippage, setSlippage] = useState<number>(0.5);
  const [isTokenAOpen, setIsTokenAOpen] = useState(false);
  const [isTokenBOpen, setIsTokenBOpen] = useState(false);

  // Get balances
  const { data: balanceA } = useBalance({
    address,
    token: tokenA.address === "0x0000000000000000000000000000000000000000" ? undefined : tokenA.address,
  });

  const { data: balanceB } = useBalance({
    address,
    token: tokenB.address === "0x0000000000000000000000000000000000000000" ? undefined : tokenB.address,
  });

  const handleAddLiquidity = async () => {
    if (!address || !amountA || !amountB) return;
    
    try {
      await addLiquidityToPool(tokenA, tokenB, amountA, amountB, slippage, address);
    } catch (error) {
      console.error('Error adding liquidity:', error);
    }
  };

  const handleTokenSwap = () => {
    const tempToken = tokenA;
    const tempAmount = amountA;
    setTokenA(tokenB);
    setTokenB(tempToken);
    setAmountA(amountB);
    setAmountB(tempAmount);
  };

  const isFormValid = amountA && amountB && parseFloat(amountA) > 0 && parseFloat(amountB) > 0;

  return (
    <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
      <CardHeader>
        <CardTitle className={cn("text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent")}>
          Add Liquidity
        </CardTitle>
        <p className="text-gray-400">Provide liquidity to earn trading fees</p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {!isConnected ? (
          <div className="text-center py-8">
            <p className="text-gray-400 mb-4">Connect your wallet to add liquidity</p>
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <Button onClick={openConnectModal} variant="gradient">
                  Connect Wallet
                </Button>
              )}
            </ConnectButton.Custom>
          </div>
        ) : (
          <>
            {/* Token A Input */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">First Token</label>
              <div className={cn("bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-lg")}>
                <div className="flex justify-between items-center mb-3">
                  <div className="relative">
                    <Button
                      onClick={() => setIsTokenAOpen(!isTokenAOpen)}
                      variant="outline"
                      className={cn("flex items-center space-x-2 text-white hover:text-primary transition-colors bg-white/5 hover:bg-white/10 border-white/10 hover:border-primary/50")}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{tokenA.symbol[0]}</span>
                      </div>
                      <span className="font-medium">{tokenA.symbol}</span>
                      <div className={`transition-transform duration-200 ${isTokenAOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      Balance: {balanceA ? `${parseFloat(balanceA.formatted).toFixed(4)} ${balanceA.symbol}` : '0.0'}
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  value={amountA}
                  onChange={(e) => setAmountA(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-2xl font-medium text-white placeholder-gray-500 border-none outline-none"
                />
              </div>
            </div>

            {/* Plus Icon */}
            <div className="flex justify-center">
              <div className="p-3 bg-gradient-to-r from-primary to-secondary rounded-full">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
            </div>

            {/* Token B Input */}
            <div>
              <label className="text-sm text-gray-400 block mb-2">Second Token</label>
              <div className={cn("bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-lg")}>
                <div className="flex justify-between items-center mb-3">
                  <div className="relative">
                    <Button
                      onClick={() => setIsTokenBOpen(!isTokenBOpen)}
                      variant="outline"
                      className={cn("flex items-center space-x-2 text-white hover:text-primary transition-colors bg-white/5 hover:bg-white/10 border-white/10 hover:border-primary/50")}
                    >
                      <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{tokenB.symbol[0]}</span>
                      </div>
                      <span className="font-medium">{tokenB.symbol}</span>
                      <div className={`transition-transform duration-200 ${isTokenBOpen ? 'rotate-180' : ''}`}>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </Button>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-400">
                      Balance: {balanceB ? `${parseFloat(balanceB.formatted).toFixed(4)} ${balanceB.symbol}` : '0.0'}
                    </div>
                  </div>
                </div>
                <input
                  type="number"
                  value={amountB}
                  onChange={(e) => setAmountB(e.target.value)}
                  placeholder="0.0"
                  className="w-full bg-transparent text-2xl font-medium text-white placeholder-gray-500 border-none outline-none"
                />
              </div>
            </div>

            {/* Liquidity Details */}
            {isFormValid && (
              <div className={cn("bg-black/20 backdrop-blur-xl border border-white/10 p-4 rounded-lg space-y-2")}>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Pool Share</span>
                  <span className="text-white">~0.1%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{tokenA.symbol} per {tokenB.symbol}</span>
                  <span className="text-white">{amountB && amountA ? (parseFloat(amountA) / parseFloat(amountB)).toFixed(6) : '0'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">{tokenB.symbol} per {tokenA.symbol}</span>
                  <span className="text-white">{amountA && amountB ? (parseFloat(amountB) / parseFloat(amountA)).toFixed(6) : '0'}</span>
                </div>
                <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
                  <span className="text-gray-400">Slippage Tolerance</span>
                  <div className="flex space-x-2">
                    {[0.1, 0.5, 1.0].map((value) => (
                      <button
                        key={value}
                        onClick={() => setSlippage(value)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          slippage === value
                            ? "bg-primary text-white"
                            : "bg-white/10 text-gray-400 hover:text-white"
                        }`}
                      >
                        {value}%
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Add Liquidity Button */}
            <Button
              onClick={handleAddLiquidity}
              disabled={!isFormValid || isAdding || isConfirming}
              variant="gradient"
              className="w-full py-4 text-lg"
            >
              {isAdding ? 'Adding Liquidity...' : 
               isConfirming ? 'Confirming...' : 
               isSuccess ? 'Liquidity Added!' : 
               !isFormValid ? 'Enter amounts' : 
               'Add Liquidity'}
            </Button>

            {/* Success Message */}
            {isSuccess && hash && (
              <div className="text-center">
                <p className="text-green-400 text-sm mb-2">
                  Liquidity added successfully!
                </p>
                <a
                  href={`https://arbiscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary text-xs hover:underline"
                >
                  View transaction →
                </a>
              </div>
            )}
          </>
        )}

        {/* Token Selection Modals */}
        {isTokenAOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]" 
            onClick={() => setIsTokenAOpen(false)}
          >
            <div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900 border border-primary/30 p-4 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg text-white font-medium mb-4 border-b border-gray-700 pb-3">Select First Token</div>
              <div className="max-h-64 overflow-y-auto">
                {commonTokens.filter(token => token.address !== tokenB.address).map((token) => (
                  <button
                    key={token.address}
                    onClick={() => {
                      setTokenA(token);
                      setIsTokenAOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-primary/10 rounded-lg transition-all hover:border-primary/30 border border-transparent mb-1"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">{token.symbol[0]}</span>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-base font-medium text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {isTokenBOpen && (
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]" 
            onClick={() => setIsTokenBOpen(false)}
          >
            <div 
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900 border border-primary/30 p-4 rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-lg text-white font-medium mb-4 border-b border-gray-700 pb-3">Select Second Token</div>
              <div className="max-h-64 overflow-y-auto">
                {commonTokens.filter(token => token.address !== tokenA.address).map((token) => (
                  <button
                    key={token.address}
                    onClick={() => {
                      setTokenB(token);
                      setIsTokenBOpen(false);
                    }}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-primary/10 rounded-lg transition-all hover:border-primary/30 border border-transparent mb-1"
                  >
                    <div className="w-10 h-10 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold">{token.symbol[0]}</span>
                    </div>
                    <div className="text-left flex-1">
                      <div className="text-base font-medium text-white">{token.symbol}</div>
                      <div className="text-sm text-gray-400">{token.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}