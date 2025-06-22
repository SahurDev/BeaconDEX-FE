"use client";

import { useState } from "react";
import AddLiquiditySection from "@/components/AddLiquiditySection";

interface Pool {
  id: string;
  token0: string;
  token1: string;
  tvl: number;
  volume24h: number;
  fees24h: number;
  apr: number;
}

interface TokenPrice {
  symbol: string;
  price: number;
  change24h: number;
  volume24h: number;
  marketCap: number;
}

const mockPools: Pool[] = [
  { id: "1", token0: "ETH", token1: "USDC", tvl: 12500000, volume24h: 2800000, fees24h: 8400, apr: 24.5 },
  { id: "2", token0: "WBTC", token1: "ETH", tvl: 8900000, volume24h: 1900000, fees24h: 5700, apr: 18.2 },
  { id: "3", token0: "USDC", token1: "USDT", tvl: 15600000, volume24h: 4200000, fees24h: 12600, apr: 29.5 },
  { id: "4", token0: "ETH", token1: "WBTC", tvl: 6700000, volume24h: 1200000, fees24h: 3600, apr: 19.6 },
];

const mockTokens: TokenPrice[] = [
  { symbol: "ETH", price: 2456.78, change24h: 2.45, volume24h: 15600000000, marketCap: 295400000000 },
  { symbol: "BTC", price: 43287.92, change24h: -1.23, volume24h: 8900000000, marketCap: 847200000000 },
  { symbol: "USDC", price: 1.00, change24h: 0.01, volume24h: 3200000000, marketCap: 25800000000 },
  { symbol: "USDT", price: 0.999, change24h: -0.02, volume24h: 2800000000, marketCap: 91300000000 },
];

export default function LiquidityPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("24H");
  const [selectedPool, setSelectedPool] = useState<Pool | null>(null);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercent = (num: number) => {
    const sign = num >= 0 ? "+" : "";
    return `${sign}${num.toFixed(2)}%`;
  };

  const timeframes = ["1H", "24H", "7D", "30D"];

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Liquidity Analytics</h1>
          <p className="text-gray-400 text-lg">Track real-time market data and liquidity pools</p>
        </div>

        {/* Add Liquidity Section */}
        <div className="mb-8">
          <AddLiquiditySection />
        </div>

        {/* Market Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Total Value Locked</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$43.7M</div>
            <div className="text-green-400 text-sm">+12.45% (24h)</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">24h Volume</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$9.1M</div>
            <div className="text-green-400 text-sm">+8.32% (24h)</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">24h Fees</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 8h6m-5 0a3 3 0 110 6H9l3 3m-3-6h6m6 1a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">$30.3K</div>
            <div className="text-green-400 text-sm">+15.67% (24h)</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Active Pools</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">124</div>
            <div className="text-green-400 text-sm">+3 (24h)</div>
          </div>
        </div>

        {/* Chart and Token Prices Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Price Chart */}
          <div className="lg:col-span-2 feature-card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">Price Chart</h2>
              <div className="flex space-x-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe}
                    onClick={() => setSelectedTimeframe(timeframe)}
                    className={`px-3 py-1 rounded text-sm transition-colors ${
                      selectedTimeframe === timeframe
                        ? "bg-primary text-white"
                        : "bg-white/10 text-gray-400 hover:text-white"
                    }`}
                  >
                    {timeframe}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Mock Chart */}
            <div className="relative h-64 glass rounded-lg p-4">
              <div className="absolute inset-4 flex items-end justify-between">
                {[...Array(20)].map((_, i) => (
                  <div
                    key={i}
                    className="bg-gradient-to-t from-primary to-secondary opacity-70 rounded-t"
                    style={{
                      height: `${Math.random() * 80 + 20}%`,
                      width: `${100 / 20 - 1}%`,
                    }}
                  />
                ))}
              </div>
              <div className="absolute top-4 left-4">
                <div className="text-2xl font-bold text-white">$2,456.78</div>
                <div className="text-green-400 text-sm">+2.45% (24h)</div>
              </div>
            </div>
          </div>

          {/* Token Prices */}
          <div className="feature-card">
            <h2 className="text-xl font-bold text-white mb-6">Token Prices</h2>
            <div className="space-y-4">
              {mockTokens.map((token) => (
                <div key={token.symbol} className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold">{token.symbol[0]}</span>
                      </div>
                      <span className="font-medium text-white">{token.symbol}</span>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-medium">{formatNumber(token.price)}</div>
                      <div className={`text-sm ${token.change24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatPercent(token.change24h)}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400">
                    Vol: {formatNumber(token.volume24h)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Liquidity Pools Table */}
        <div className="feature-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Top Liquidity Pools</h2>
            <button className="btn-primary text-sm px-4 py-2">
              + Add Liquidity
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 text-sm font-medium py-3">Pool</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">TVL</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">24h Volume</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">24h Fees</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">APR</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {mockPools.map((pool) => (
                  <tr key={pool.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <div className="flex -space-x-1">
                          <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">{pool.token0[0]}</span>
                          </div>
                          <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold">{pool.token1[0]}</span>
                          </div>
                        </div>
                        <span className="text-white font-medium">{pool.token0}/{pool.token1}</span>
                      </div>
                    </td>
                    <td className="text-right text-white">{formatNumber(pool.tvl)}</td>
                    <td className="text-right text-white">{formatNumber(pool.volume24h)}</td>
                    <td className="text-right text-white">{formatNumber(pool.fees24h)}</td>
                    <td className="text-right">
                      <span className="text-green-400 font-medium">{pool.apr}%</span>
                    </td>
                    <td className="text-right">
                      <button
                        onClick={() => setSelectedPool(pool)}
                        className="text-primary hover:text-secondary transition-colors text-sm font-medium"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Volume Analytics */}
          <div className="feature-card">
            <h2 className="text-xl font-bold text-white mb-6">Volume Analytics</h2>
            <div className="space-y-4">
              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">7-day Volume</span>
                  <span className="text-white font-medium">$63.2M</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" style={{width: '78%'}}></div>
                </div>
              </div>
              
              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">30-day Volume</span>
                  <span className="text-white font-medium">$278.5M</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-accent to-secondary h-2 rounded-full" style={{width: '92%'}}></div>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-400">All-time Volume</span>
                  <span className="text-white font-medium">$1.2B</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="bg-gradient-to-r from-primary to-accent h-2 rounded-full" style={{width: '100%'}}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Liquidity Analytics */}
          <div className="feature-card">
            <h2 className="text-xl font-bold text-white mb-6">Liquidity Analytics</h2>
            <div className="space-y-4">
              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Average APR</div>
                    <div className="text-white font-medium text-lg">22.8%</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">%</span>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Total Liquidity Providers</div>
                    <div className="text-white font-medium text-lg">2,847</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Protocol Revenue (24h)</div>
                    <div className="text-white font-medium text-lg">$15.2K</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}