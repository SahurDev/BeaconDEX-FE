"use client";

import { useState } from "react";

interface Pool {
  id: string;
  token0: {
    symbol: string;
    name: string;
    address: string;
  };
  token1: {
    symbol: string;
    name: string;
    address: string;
  };
  tvl: number;
  volume24h: number;
  volume7d: number;
  fees24h: number;
  fees7d: number;
  apr: number;
  liquidity: number;
  poolShare: number;
  createdAt: string;
  status: "Active" | "Inactive" | "New";
  feeRate: number;
}

const mockPools: Pool[] = [
  {
    id: "1",
    token0: { symbol: "ETH", name: "Ethereum", address: "0x..." },
    token1: { symbol: "USDC", name: "USD Coin", address: "0x..." },
    tvl: 12500000,
    volume24h: 2800000,
    volume7d: 18600000,
    fees24h: 8400,
    fees7d: 55800,
    apr: 24.5,
    liquidity: 8900000,
    poolShare: 0.325,
    createdAt: "2024-01-15",
    status: "Active",
    feeRate: 0.3
  },
  {
    id: "2",
    token0: { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x..." },
    token1: { symbol: "ETH", name: "Ethereum", address: "0x..." },
    tvl: 8900000,
    volume24h: 1900000,
    volume7d: 12300000,
    fees24h: 5700,
    fees7d: 36900,
    apr: 18.2,
    liquidity: 6200000,
    poolShare: 0.245,
    createdAt: "2024-01-10",
    status: "Active",
    feeRate: 0.3
  },
  {
    id: "3",
    token0: { symbol: "USDC", name: "USD Coin", address: "0x..." },
    token1: { symbol: "USDT", name: "Tether USD", address: "0x..." },
    tvl: 15600000,
    volume24h: 4200000,
    volume7d: 28400000,
    fees24h: 4200,
    fees7d: 28400,
    apr: 29.5,
    liquidity: 14200000,
    poolShare: 0.428,
    createdAt: "2024-01-20",
    status: "Active",
    feeRate: 0.01
  },
  {
    id: "4",
    token0: { symbol: "ETH", name: "Ethereum", address: "0x..." },
    token1: { symbol: "WBTC", name: "Wrapped Bitcoin", address: "0x..." },
    tvl: 6700000,
    volume24h: 1200000,
    volume7d: 7800000,
    fees24h: 3600,
    fees7d: 23400,
    apr: 19.6,
    liquidity: 4500000,
    poolShare: 0.184,
    createdAt: "2024-02-01",
    status: "Active",
    feeRate: 0.3
  },
  {
    id: "5",
    token0: { symbol: "LINK", name: "Chainlink", address: "0x..." },
    token1: { symbol: "ETH", name: "Ethereum", address: "0x..." },
    tvl: 3400000,
    volume24h: 680000,
    volume7d: 4200000,
    fees24h: 2040,
    fees7d: 12600,
    apr: 15.8,
    liquidity: 2800000,
    poolShare: 0.094,
    createdAt: "2024-02-10",
    status: "New",
    feeRate: 0.3
  },
  {
    id: "6",
    token0: { symbol: "UNI", name: "Uniswap", address: "0x..." },
    token1: { symbol: "USDC", name: "USD Coin", address: "0x..." },
    tvl: 2100000,
    volume24h: 420000,
    volume7d: 2800000,
    fees24h: 1260,
    fees7d: 8400,
    apr: 12.4,
    liquidity: 1800000,
    poolShare: 0.058,
    createdAt: "2024-02-15",
    status: "Active",
    feeRate: 0.3
  }
];

export default function PoolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"tvl" | "volume24h" | "apr" | "fees24h">("tvl");
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Inactive" | "New">("All");
  const [showCreatePool, setShowCreatePool] = useState(false);

  const formatNumber = (num: number) => {
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  const formatPercent = (num: number) => {
    return `${num.toFixed(2)}%`;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "text-green-400";
      case "Inactive": return "text-red-400";
      case "New": return "text-blue-400";
      default: return "text-gray-400";
    }
  };

  const filteredPools = mockPools
    .filter(pool => {
      const matchesSearch = 
        pool.token0.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.token1.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.token0.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        pool.token1.name.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = filterStatus === "All" || pool.status === filterStatus;
      
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "tvl": return b.tvl - a.tvl;
        case "volume24h": return b.volume24h - a.volume24h;
        case "apr": return b.apr - a.apr;
        case "fees24h": return b.fees24h - a.fees24h;
        default: return 0;
      }
    });

  const totalTVL = mockPools.reduce((sum, pool) => sum + pool.tvl, 0);
  const totalVolume24h = mockPools.reduce((sum, pool) => sum + pool.volume24h, 0);
  const totalFees24h = mockPools.reduce((sum, pool) => sum + pool.fees24h, 0);
  const avgAPR = mockPools.reduce((sum, pool) => sum + pool.apr, 0) / mockPools.length;

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Liquidity Pools</h1>
          <p className="text-gray-400 text-lg">Explore and manage all available liquidity pools</p>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Total Pools</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{mockPools.length}</div>
            <div className="text-green-400 text-sm">+2 this week</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Total TVL</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatNumber(totalTVL)}</div>
            <div className="text-green-400 text-sm">+8.2% (7d)</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">24h Volume</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatNumber(totalVolume24h)}</div>
            <div className="text-green-400 text-sm">+12.5% (24h)</div>
          </div>

          <div className="feature-card">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-gray-400 text-sm font-medium">Avg APR</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatPercent(avgAPR)}</div>
            <div className="text-green-400 text-sm">+1.8% (7d)</div>
          </div>
        </div>

        {/* Controls Section */}
        <div className="feature-card mb-8">
          <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              {/* Search */}
              <div className="relative flex-1 max-w-md">
                <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search pools..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>

              {/* Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="All">All Status</option>
                <option value="Active">Active</option>
                <option value="New">New</option>
                <option value="Inactive">Inactive</option>
              </select>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary transition-colors"
              >
                <option value="tvl">Sort by TVL</option>
                <option value="volume24h">Sort by Volume</option>
                <option value="apr">Sort by APR</option>
                <option value="fees24h">Sort by Fees</option>
              </select>
            </div>

            <button
              onClick={() => setShowCreatePool(!showCreatePool)}
              className="btn-primary whitespace-nowrap"
            >
              + Create Pool
            </button>
          </div>
        </div>

        {/* Create Pool Section */}
        {showCreatePool && (
          <div className="feature-card mb-8">
            <h2 className="text-xl font-bold text-white mb-6">Create New Pool</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Select First Token</label>
                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">E</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Select Token</div>
                      <div className="text-gray-400 text-xs">Choose first token</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Select Second Token</label>
                <div className="glass p-4 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold">U</span>
                    </div>
                    <div>
                      <div className="text-white font-medium">Select Token</div>
                      <div className="text-gray-400 text-xs">Choose second token</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 block mb-2">Fee Tier</label>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { rate: "0.01%", description: "Best for stable pairs" },
                    { rate: "0.05%", description: "Best for most pairs" },
                    { rate: "0.30%", description: "Best for exotic pairs" }
                  ].map((tier) => (
                    <div key={tier.rate} className="glass p-4 rounded-lg hover:bg-primary/10 transition-colors cursor-pointer border border-transparent hover:border-primary/30">
                      <div className="text-white font-medium">{tier.rate}</div>
                      <div className="text-gray-400 text-xs">{tier.description}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  onClick={() => setShowCreatePool(false)}
                  className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                >
                  Cancel
                </button>
                <button className="btn-primary px-6 py-2">
                  Create Pool
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Pools Table */}
        <div className="feature-card mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">All Pools ({filteredPools.length})</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 text-sm font-medium py-4">Pool</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">TVL</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">24h Volume</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">7d Volume</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">24h Fees</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">APR</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredPools.map((pool) => (
                  <tr key={pool.id} className="border-b border-gray-800 hover:bg-white/5 transition-colors">
                    <td className="py-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex -space-x-1">
                          <div className="w-8 h-8 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-bold">{pool.token0.symbol[0]}</span>
                          </div>
                          <div className="w-8 h-8 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center border-2 border-background">
                            <span className="text-xs font-bold">{pool.token1.symbol[0]}</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-white font-medium">{pool.token0.symbol}/{pool.token1.symbol}</div>
                          <div className="text-gray-400 text-xs">{pool.feeRate}% Fee</div>
                        </div>
                      </div>
                    </td>
                    <td className="text-right text-white py-4">{formatNumber(pool.tvl)}</td>
                    <td className="text-right text-white py-4">{formatNumber(pool.volume24h)}</td>
                    <td className="text-right text-white py-4">{formatNumber(pool.volume7d)}</td>
                    <td className="text-right text-white py-4">{formatNumber(pool.fees24h)}</td>
                    <td className="text-right py-4">
                      <span className="text-green-400 font-medium">{formatPercent(pool.apr)}</span>
                    </td>
                    <td className="text-center py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pool.status)} bg-white/10`}>
                        {pool.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredPools.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 opacity-50">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <p className="text-gray-400">No pools found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Pool Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="feature-card">
            <h2 className="text-xl font-bold text-white mb-6">Pool Performance</h2>
            <div className="space-y-4">
              {mockPools.slice(0, 3).map((pool) => (
                <div key={pool.id} className="glass p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <div className="flex -space-x-1">
                        <div className="w-6 h-6 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{pool.token0.symbol[0]}</span>
                        </div>
                        <div className="w-6 h-6 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold">{pool.token1.symbol[0]}</span>
                        </div>
                      </div>
                      <span className="text-white font-medium">{pool.token0.symbol}/{pool.token1.symbol}</span>
                    </div>
                    <span className="text-green-400 font-medium">{formatPercent(pool.apr)}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full" 
                      style={{width: `${Math.min((pool.tvl / 20000000) * 100, 100)}%`}}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-400">
                    <span>TVL: {formatNumber(pool.tvl)}</span>
                    <span>Vol: {formatNumber(pool.volume24h)}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="feature-card">
            <h2 className="text-xl font-bold text-white mb-6">Pool Distribution</h2>
            <div className="space-y-4">
              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Stable Pairs</div>
                    <div className="text-white font-medium text-lg">32%</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">S</span>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">ETH Pairs</div>
                    <div className="text-white font-medium text-lg">45%</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-accent to-secondary rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">E</span>
                  </div>
                </div>
              </div>

              <div className="glass p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-gray-400 text-sm">Other Pairs</div>
                    <div className="text-white font-medium text-lg">23%</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">O</span>
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