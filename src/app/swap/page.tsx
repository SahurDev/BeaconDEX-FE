"use client";

import { useState } from "react";
import { useAccount, useBalance } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

interface Token {
  symbol: string;
  name: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

const commonTokens: Token[] = [
  { symbol: "ETH", name: "Ethereum", address: "0x0000000000000000000000000000000000000000", decimals: 18 },
  { symbol: "USDC", name: "USD Coin", address: "0xa0b86991c431e69f7a3d3ae37d8b3c8d1c5a6d0c0", decimals: 6 },
  { symbol: "USDT", name: "Tether USD", address: "0xdac17f958d2ee523a2206206994597c13d831ec7", decimals: 6 },
  { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", decimals: 8 },
];

export default function SwapPage() {
  const [fromToken, setFromToken] = useState<Token>(commonTokens[0]);
  const [toToken, setToToken] = useState<Token>(commonTokens[1]);
  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");
  const [isFromTokenOpen, setIsFromTokenOpen] = useState(false);
  const [isToTokenOpen, setIsToTokenOpen] = useState(false);
  const [slippage, setSlippage] = useState("0.5");
  
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({
    address,
    token: fromToken.address === "0x0000000000000000000000000000000000000000" ? undefined : fromToken.address as `0x${string}`,
  });

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(fromAmount);
  };


  const estimatedOutput = fromAmount ? (parseFloat(fromAmount) * 0.998).toFixed(6) : "";

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-md mx-auto pt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-text mb-2">Swap Tokens</h1>
          <p className="text-gray-400">Trade tokens in an instant</p>
        </div>

        <div className="feature-card">
          {/* From Token Section */}
          <div className="mb-4">
            <label className="text-sm text-gray-400 block mb-2">From</label>
            <div className="glass p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="relative">
                  <button
                    onClick={() => setIsFromTokenOpen(!isFromTokenOpen)}
                    className="flex items-center space-x-2 text-white hover:text-primary transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{fromToken.symbol[0]}</span>
                    </div>
                    <span className="font-medium">{fromToken.symbol}</span>
                    <div className={`transition-transform duration-200 ${isFromTokenOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">
                    Balance: {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0'}
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={fromAmount}
                onChange={(e) => {
                  setFromAmount(e.target.value);
                  setToAmount(e.target.value ? (parseFloat(e.target.value) * 0.998).toFixed(6) : "");
                }}
                placeholder="0.0"
                className="w-full bg-transparent text-2xl font-medium text-white placeholder-gray-500 border-none outline-none"
              />
            </div>
          </div>

          {/* Swap Button */}
          <div className="flex justify-center my-4">
            <button
              onClick={handleSwapTokens}
              className="p-3 bg-gradient-to-r from-primary to-secondary hover:from-secondary hover:to-primary rounded-full transition-all duration-300 hover:scale-110 hover:rotate-180 shadow-lg"
              style={{boxShadow: 'var(--glow)'}}
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
              </svg>
            </button>
          </div>

          {/* To Token Section */}
          <div className="mb-6">
            <label className="text-sm text-gray-400 block mb-2">To</label>
            <div className="glass p-4 rounded-lg">
              <div className="flex justify-between items-center mb-3">
                <div className="relative">
                  <button
                    onClick={() => setIsToTokenOpen(!isToTokenOpen)}
                    className="flex items-center space-x-2 text-white hover:text-primary transition-colors bg-white/5 hover:bg-white/10 px-3 py-2 rounded-lg border border-white/10 hover:border-primary/50"
                  >
                    <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                      <span className="text-xs font-bold">{toToken.symbol[0]}</span>
                    </div>
                    <span className="font-medium">{toToken.symbol}</span>
                    <div className={`transition-transform duration-200 ${isToTokenOpen ? 'rotate-180' : ''}`}>
                      <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                </div>
                <div className="text-right">
                  <div className="text-xs text-gray-400">
                    Balance: {balance ? `${parseFloat(balance.formatted).toFixed(4)} ${balance.symbol}` : '0.0'}
                  </div>
                </div>
              </div>
              <input
                type="number"
                value={toAmount}
                readOnly
                placeholder="0.0"
                className="w-full bg-transparent text-2xl font-medium text-gray-400 placeholder-gray-500 border-none outline-none"
              />
            </div>
          </div>

          {/* Swap Details */}
          {fromAmount && (
            <div className="glass p-4 rounded-lg mb-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Exchange Rate</span>
                <span className="text-white">1 {fromToken.symbol} = 0.998 {toToken.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Price Impact</span>
                <span className="text-green-400">&lt; 0.01%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Minimum Received</span>
                <span className="text-white">{estimatedOutput} {toToken.symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Network Fee</span>
                <span className="text-white">~$5.20</span>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-white/10">
                <span className="text-gray-400">Slippage Tolerance</span>
                <div className="flex space-x-2">
                  {["0.1", "0.5", "1.0"].map((value) => (
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

          {/* Connect Wallet / Swap Button */}
          {!isConnected ? (
            <ConnectButton.Custom>
              {({ openConnectModal }) => (
                <button
                  onClick={openConnectModal}
                  className="w-full btn-primary text-center"
                >
                  Connect Wallet
                </button>
              )}
            </ConnectButton.Custom>
          ) : (
            <button
              disabled={!fromAmount || parseFloat(fromAmount) <= 0}
              className={`w-full py-4 rounded-lg font-medium transition-all ${
                fromAmount && parseFloat(fromAmount) > 0
                  ? "btn-primary"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              }`}
            >
              {fromAmount && parseFloat(fromAmount) > 0 ? "Swap" : "Enter an amount"}
            </button>
          )}
        </div>
      </div>

      {/* From Token Dropdown - Fixed positioned to appear above everything */}
      {isFromTokenOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]" 
          onClick={() => setIsFromTokenOpen(false)}
        >
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900 border border-primary/30 p-4 rounded-lg shadow-2xl" 
            style={{boxShadow: 'var(--glow), 0 25px 50px -12px rgba(0, 0, 0, 0.8)'}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg text-white font-medium mb-4 border-b border-gray-700 pb-3">Select Token</div>
            <div className="max-h-64 overflow-y-auto">
              {commonTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => {
                    setFromToken(token);
                    setIsFromTokenOpen(false);
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
                  <div className="text-right">
                    <div className="text-sm text-gray-400">0.0</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* To Token Dropdown - Fixed positioned to appear above everything */}
      {isToTokenOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9999]" 
          onClick={() => setIsToTokenOpen(false)}
        >
          <div 
            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 bg-gray-900 border border-primary/30 p-4 rounded-lg shadow-2xl" 
            style={{boxShadow: 'var(--glow), 0 25px 50px -12px rgba(0, 0, 0, 0.8)'}}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-lg text-white font-medium mb-4 border-b border-gray-700 pb-3">Select Token</div>
            <div className="max-h-64 overflow-y-auto">
              {commonTokens.map((token) => (
                <button
                  key={token.address}
                  onClick={() => {
                    setToToken(token);
                    setIsToTokenOpen(false);
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
                  <div className="text-right">
                    <div className="text-sm text-gray-400">0.0</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}