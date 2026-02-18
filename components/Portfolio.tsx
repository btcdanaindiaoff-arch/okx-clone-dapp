'use client';

import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';
import { TrendingUp, TrendingDown, Wallet, PieChart } from 'lucide-react';

export function Portfolio() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <div className="bg-[#1a1d24] rounded-lg p-6 text-center">
        <Wallet className="w-12 h-12 mx-auto mb-3 text-gray-600" />
        <p className="text-gray-400">Connect wallet to view portfolio</p>
      </div>
    );
  }

  const portfolioValue = balance 
    ? parseFloat(formatEther(balance.value)) * 2500 
    : 0;

  const assets = [
    { name: 'ETH', amount: balance ? formatEther(balance.value) : '0', value: portfolioValue, change: 5.2, color: 'from-purple-500 to-blue-500' },
    { name: 'USDT', amount: '1,250.00', value: 1250, change: 0.1, color: 'from-green-500 to-teal-500' },
    { name: 'BTC', amount: '0.0125', value: 562.5, change: -2.3, color: 'from-orange-500 to-yellow-500' },
  ];

  const totalValue = assets.reduce((sum, asset) => sum + asset.value, 0);

  return (
    <div className="bg-[#1a1d24] rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Portfolio</h3>
        <PieChart className="w-5 h-5 text-gray-400" />
      </div>

      {/* Total Value */}
      <div className="mb-6">
        <p className="text-sm text-gray-400 mb-1">Total Value</p>
        <h2 className="text-3xl font-bold mb-2">${totalValue.toFixed(2)}</h2>
        <div className="flex items-center text-green-500">
          <TrendingUp className="w-4 h-4 mr-1" />
          <span className="text-sm">+8.5% (24h)</span>
        </div>
      </div>

      {/* Assets Breakdown */}
      <div className="space-y-3">
        {assets.map((asset) => (
          <div key={asset.name} className="p-3 bg-[#0b0e11] rounded-lg hover:bg-[#1f2329] transition-colors cursor-pointer">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-3">
                <div className={`w-8 h-8 bg-gradient-to-br ${asset.color} rounded-full flex items-center justify-center`}>
                  <span className="text-white text-xs font-bold">{asset.name}</span>
                </div>
                <div>
                  <p className="font-medium">{asset.name}</p>
                  <p className="text-xs text-gray-400">{asset.amount}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">${asset.value.toFixed(2)}</p>
                <div className={`flex items-center text-xs ${asset.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {asset.change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  <span className="ml-1">{asset.change >= 0 ? '+' : ''}{asset.change}%</span>
                </div>
              </div>
            </div>
            {/* Progress Bar */}
            <div className="w-full bg-[#1f2329] rounded-full h-1">
              <div
                className={`bg-gradient-to-r ${asset.color} h-1 rounded-full`}
                style={{ width: `${(asset.value / totalValue) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Portfolio Actions */}
      <div className="mt-6 grid grid-cols-2 gap-2">
        <button className="py-2 bg-[#00a6ff] hover:bg-[#0090e0] rounded-lg text-sm font-medium transition-colors">
          Deposit
        </button>
        <button className="py-2 bg-[#0b0e11] hover:bg-[#1f2329] rounded-lg text-sm font-medium transition-colors">
          Withdraw
        </button>
      </div>
    </div>
  );
}
