'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

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

export default function UserPoolOverview() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"tvl" | "volume24h" | "apr" | "fees24h">("tvl");

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
      
      return matchesSearch;
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

  return (
    <div className="space-y-6">
      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{mockPools.length}</div>
            <div className="text-gray-400 text-sm">Available Pools</div>
          </CardContent>
        </Card>

        <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatNumber(totalTVL)}</div>
            <div className="text-gray-400 text-sm">Total TVL</div>
          </CardContent>
        </Card>

        <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
          <CardContent className="p-6 text-center">
            <div className="text-2xl font-bold text-white mb-1">{formatPercent(avgAPR)}</div>
            <div className="text-gray-400 text-sm">Average APR</div>
          </CardContent>
        </Card>
      </div>

      {/* Pool Search and Filter */}
      <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
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
        </CardContent>
      </Card>

      {/* Available Pools Table */}
      <Card className={cn("bg-black/30 border-primary/20 backdrop-blur-xl")}>
        <CardHeader>
          <CardTitle className="text-white">Available Pools ({filteredPools.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left text-gray-400 text-sm font-medium py-4">Pool</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">TVL</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">24h Volume</th>
                  <th className="text-right text-gray-400 text-sm font-medium py-4">APR</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4">Status</th>
                  <th className="text-center text-gray-400 text-sm font-medium py-4">Action</th>
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
                    <td className="text-right py-4">
                      <span className="text-green-400 font-medium">{formatPercent(pool.apr)}</span>
                    </td>
                    <td className="text-center py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(pool.status)} bg-white/10`}>
                        {pool.status}
                      </span>
                    </td>
                    <td className="text-center py-4">
                      <Button
                        variant="gradient"
                        size="sm"
                        className="text-xs"
                      >
                        Add Liquidity
                      </Button>
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
        </CardContent>
      </Card>
    </div>
  );
}