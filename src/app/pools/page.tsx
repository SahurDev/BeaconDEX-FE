"use client";

import { useState } from "react";
import PoolFactoryConnection from "@/components/PoolFactoryConnection";
import AddLiquiditySection from "@/components/AddLiquiditySection";
import { useCreatePool } from "@/hooks/usePoolFactory";
import { useAccount } from "wagmi";
import { Address } from "viem";

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
  }
];

export default function PoolsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"tvl" | "volume24h" | "apr" | "fees24h">("tvl");
  const [filterStatus, setFilterStatus] = useState<"All" | "Active" | "Inactive" | "New">("All");
  const [showCreatePool, setShowCreatePool] = useState(false);
  
  // Create pool form state
  const [token0Address, setToken0Address] = useState("");
  const [token1Address, setToken1Address] = useState("");
  const [oracle0Address, setOracle0Address] = useState("");
  const [oracle1Address, setOracle1Address] = useState("");
  
  // Wagmi hooks
  const { isConnected } = useAccount();
  const { createNewPool, isCreating, isConfirming, isSuccess } = useCreatePool();

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
  const avgAPR = mockPools.reduce((sum, pool) => sum + pool.apr, 0) / mockPools.length;

  // Handle create pool form submission
  const handleCreatePool = async () => {
    if (!token0Address || !token1Address || !oracle0Address || !oracle1Address) {
      alert("Please fill in all fields");
      return;
    }
    
    if (!isConnected) {
      alert("Please connect your wallet first");
      return;
    }
    
    try {
      await createNewPool(
        token0Address as Address,
        token1Address as Address,
        oracle0Address as Address,
        oracle1Address as Address
      );
    } catch (error) {
      console.error("Error creating pool:", error);
    }
  };

  // Reset form when pool is successfully created
  if (isSuccess) {
    setTimeout(() => {
      setToken0Address("");
      setToken1Address("");
      setOracle0Address("");
      setOracle1Address("");
      setShowCreatePool(false);
    }, 2000);
  }

  return (
    <div className="min-h-screen pt-20 px-6 sm:px-10 lg:px-12">
      <div className="max-w-7xl mx-auto pt-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Liquidity Pools</h1>
          <p className="text-gray-400 text-lg">Create and manage liquidity pools</p>
        </div>

        {/* Overview Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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
              <h3 className="text-gray-400 text-sm font-medium">Avg APR</h3>
              <div className="w-8 h-8 bg-gradient-to-r from-secondary to-primary rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">%</span>
              </div>
            </div>
            <div className="text-2xl font-bold text-white mb-1">{formatPercent(avgAPR)}</div>
            <div className="text-green-400 text-sm">+1.8% (7d)</div>
          </div>
        </div>

        {/* Pool Factory Connection */}
        <div className="mb-8">
          <PoolFactoryConnection />
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
                <label className="text-sm text-gray-400 block mb-2">Token 0 Address</label>
                <input
                  type="text"
                  value={token0Address}
                  onChange={(e) => setToken0Address(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Token 1 Address</label>
                <input
                  type="text"
                  value={token1Address}
                  onChange={(e) => setToken1Address(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Oracle 0 Address</label>
                <input
                  type="text"
                  value={oracle0Address}
                  onChange={(e) => setOracle0Address(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Oracle 1 Address</label>
                <input
                  type="text"
                  value={oracle1Address}
                  onChange={(e) => setOracle1Address(e.target.value)}
                  placeholder="0x..."
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              
              {/* Success/Error Messages */}
              {isSuccess && (
                <div className="md:col-span-2">
                  <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 text-center">
                    <p className="text-green-400 font-medium">Pool created successfully!</p>
                  </div>
                </div>
              )}
              
              <div className="md:col-span-2 flex justify-end space-x-4">
                <button
                  onClick={() => setShowCreatePool(false)}
                  className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
                  disabled={isCreating || isConfirming}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleCreatePool}
                  disabled={!isConnected || isCreating || isConfirming || !token0Address || !token1Address || !oracle0Address || !oracle1Address}
                  className="btn-primary px-6 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCreating ? 'Creating...' : 
                   isConfirming ? 'Confirming...' : 
                   isSuccess ? 'Pool Created!' :
                   !isConnected ? 'Connect Wallet' :
                   'Create Pool'}
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
      </div>
    </div>
  );
}